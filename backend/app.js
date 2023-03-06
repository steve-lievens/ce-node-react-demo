if (process.env.ENABLE_INSTANA == "true") {
  require("@instana/collector")({
    serviceName: "NodeJS Client",
  });
}

// --------------------------------------------------------------------------
// Require statements
// --------------------------------------------------------------------------
const http = require("http");
const proxiedHttp = require("findhit-proxywrap").proxy(http, { strict: false });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const os = require("os");
const { strict } = require("assert");

// --------------------------------------------------------------------------
// global vars
// --------------------------------------------------------------------------
const hostname = os.hostname();
let intervalId;
let curlStatus = false;

// --------------------------------------------------------------------------
// In memory object to hold Code Engine Events
// --------------------------------------------------------------------------
let codeEngineEvents = [];

// --------------------------------------------------------------------------
// Read environment variables
// --------------------------------------------------------------------------

// When not present in the system environment variables, dotenv will take them
// from the local file
require("dotenv-defaults").config({
  path: "my.env",
  encoding: "utf8",
  defaults: "my.env.defaults",
});

// App ENV
const APP_NAME = process.env.APP_NAME;
const CLIENT_VERSION = process.env.CLIENT_VERSION;
const CLIENT_TITLE = process.env.CLIENT_TITLE;
const WELCOME_MSG = process.env.WELCOME_MSG;
const WELCOME_IMG = process.env.WELCOME_IMG;
const REGION = process.env.REGION;
const FIBO_COUNT = process.env.FIBO_COUNT;
const MONGO_DEMO = process.env.MONGO_DEMO == "true";

// Mongo ENV
// Some defaults first
let MONGO_HOST = "localhost";
let MONGO_PORT = "27017";

// Check if we have ENV from the automatically generated secret of a MongoDb deployment on OCP
let MONGO_USER = process.env["database-user"];
let MONGO_PW = process.env["database-password"];

// Overrides
// If host and port are given via ENV, override the defaults
if (process.env.MONGO_HOST) {
  MONGO_HOST = process.env.MONGO_HOST;
}
if (process.env.MONGO_PORT) {
  MONGO_PORT = process.env.MONGO_PORT;
}
if (process.env.MONGO_USER) {
  MONGO_USER = process.env.MONGO_USER;
}
if (process.env.MONGO_PW) {
  MONGO_PW = process.env.MONGO_PW;
}

const CURL_HOSTS = process.env.CURL_HOSTS;
const CURL_AUTO_START = process.env.CURL_AUTO_START;

// --------------------------------------------------------------------------
// Initialization App Logging
// --------------------------------------------------------------------------
console.log("INFO: Here we go ! Starting up the app !!!", APP_NAME);

console.log("INFO: CLIENT_VERSION", CLIENT_VERSION);
console.log("INFO: CLIENT_TITLE", CLIENT_TITLE);
console.log("INFO: WELCOME_MSG", WELCOME_MSG);
console.log("INFO: WELCOME_IMG", WELCOME_IMG);
console.log("INFO: FIBO_COUNT", FIBO_COUNT);
console.log("INFO: MONGO_DEMO", MONGO_DEMO);
if (MONGO_DEMO) {
  console.log("INFO: MONGO_HOST", MONGO_HOST);
  console.log("INFO: MONGO_PORT", MONGO_PORT);
  console.log("INFO: MONGO_USER", MONGO_USER);
  console.log("INFO: MONGO_PW", "*********");
}
console.log("INFO: CURL_HOSTS", CURL_HOSTS);

// --------------------------------------------------------------------------
// Setup the express server
// --------------------------------------------------------------------------
const app = express();

// create application/json parser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Setup MongoDB URL
const url =
  "mongodb://" +
  MONGO_USER +
  ":" +
  MONGO_PW +
  "@" +
  MONGO_HOST +
  ":" +
  MONGO_PORT +
  "/";

// --------------------------------------------------------------------------
// Express Server runtime
// --------------------------------------------------------------------------
// Start our server !
//app.listen(process.env.PORT || 8080, function () {
//  console.log("INFO: app is listening on port %s", process.env.PORT || 8080);
//});
let expressPort = process.env.PORT || 8080;
const srv = proxiedHttp.createServer(app).listen(expressPort);
console.log("INFO: The application is now listening on port " + expressPort);
if (CURL_AUTO_START) {
  console.log("INFO: Autostarting curl ...");
  curlStatus = true;
  startCurl();
}

// --------------------------------------------------------------------------
// REST API : also map the root dir to the static folder
// --------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// --------------------------------------------------------------------------
// REST API : health
// --------------------------------------------------------------------------
app.get("/health", function (req, res) {
  var health = {
    health: "OK",
  };
  console.log("INFO: Service health returning " + JSON.stringify(health));
  res.json(health);
});

// --------------------------------------------------------------------------
// REST API : retrieve info about the host
// --------------------------------------------------------------------------
app.get("/getEnvironment", function (req, res) {
  var hostobj = {
    hostname: hostname,
    region: REGION,
    app_name: APP_NAME,
    client_title: CLIENT_TITLE,
    client_version: CLIENT_VERSION,
    welcome_msg: WELCOME_MSG,
    welcome_img: WELCOME_IMG,
    mongo_demo: MONGO_DEMO,
    client_ip: req.ip,
    curlStatus: curlStatus,
  };
  console.log(
    "INFO: Service getEnvironment returning : " + JSON.stringify(hostobj)
  );

  // get all request info from the client
  const echo = {
    path: req.path,
    headers: req.headers,
    method: req.method,
    body: req.body,
    cookies: req.cookies,
    fresh: req.fresh,
    hostname: req.hostname,
    ip: req.ip,
    ips: req.ips,
    protocol: req.protocol,
    query: req.query,
    subdomains: req.subdomains,
    xhr: req.xhr,
    os: {
      hostname: os.hostname(),
    },
    connection: {
      servername: req.servername,
    },
  };

  res.json(hostobj);
});

// --------------------------------------------------------------------------
// REST API : connect to Db
// --------------------------------------------------------------------------
app.get("/connectToDb", function (req, res) {
  console.log("INFO: connectToDb - Starting db connection.");
  mongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      console.log("INFO: connectToDb - Inside connect method.");
      if (err) {
        console.log("ERROR: connectToDb - connect failed.");
        res.status(500).send(err.message);
      } else {
        console.log("INFO: connectToDb - connect success");
        var dbo = db.db("demodb");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(myobj, function (err, result) {
          if (err) {
            console.log("ERROR: connectToDb - insertOne failed.");
            res.status(500).send(err.message);
          } else {
            console.log("INFO: connectToDb - 1 document inserted");
            db.close();
            console.log("INFO: connectToDb - Ended db connection.");
            var retObj = {
              dbconnect: true,
            };
            console.log(
              "INFO: Service connectToDb returning : " + JSON.stringify(retObj)
            );
            res.json(retObj);
          }
        });
      }
    }
  );
});

// --------------------------------------------------------------------------
// REST API : send error to log
// --------------------------------------------------------------------------
app.get("/senderror", function (req, res) {
  var notused = {
    zero: "zero",
  };
  console.log("ERROR: Test error message - No real error has occurred.");
  res.json(notused);
});

// --------------------------------------------------------------------------
// REST API : crash the server ... yeah ... really !
// --------------------------------------------------------------------------
app.get("/crashPod", function (req, res) {
  var hostobj = {
    hostname: hostname,
  };
  console.log("INFO: Crashing Pod " + hostname);
  res.json(hostobj);

  // This kills the server
  process.exit(1);
});

// --------------------------------------------------------------------------
// REST API : get a fibonacci number
// --------------------------------------------------------------------------
app.get("/fibo", function (req, res) {
  console.log("INFO: Generating Fibonacci number with value : " + FIBO_COUNT);
  const fibo_number = fibo(FIBO_COUNT);

  const fiboobj = {
    fibo: fibo_number,
  };

  res.json(fiboobj);
});

// --------------------------------------------------------------------------
// REST API : get the list of Code Engine Events
// --------------------------------------------------------------------------
app.get("/getevents", function (req, res) {
  res.json(codeEngineEvents);
});

// --------------------------------------------------------------------------
// REST API : Post info
// --------------------------------------------------------------------------
app.post("/", jsonParser, function (req, res) {
  var message = req.body;
  console.log("INFO: Receiving event from Code Engine");

  if (message.bucket) {
    console.log("INFO: It's an Event from Cloud Object Storage");
    console.log("INFO: COS bucket : " + message.bucket);
    codeEngineEvents.push(message);
    console.log(
      "INFO: Pushing it into the event list, we now have " +
        codeEngineEvents.length +
        " events"
    );
  }

  res.status(200).end();
});

// --------------------------------------------------------------------------
// REST API : start an interval timer
// --------------------------------------------------------------------------
app.get("/startcurl", (req, res) => {
  intervalId = setInterval(fetchData, 5000);
  curlStatus = true;
  const intervalStatus = {
    started: curlStatus,
  };
  console.log("INFO: Starting the curl loop ... ");

  res.json(intervalStatus);
});

// --------------------------------------------------------------------------
// REST API : stop an interval timer
// --------------------------------------------------------------------------
app.get("/stopcurl", (req, res) => {
  clearInterval(intervalId);
  curlStatus = false;
  const intervalStatus = {
    started: curlStatus,
  };
  console.log("INFO: Stopping the curl loop ... ");

  res.json(intervalStatus);
});

// --------------------------------------------------------------------------
// REST API : do the api calls to the endpoints
// --------------------------------------------------------------------------
app.get("/curlproxy", (req, res) => {
  const curlHosts = CURL_HOSTS.split(",");
  curlHosts.forEach(function (host) {
    console.log("INFO: Calling endpoint : ", host, " ...");

    fetch(host)
      .then((response) => response.json())
      .then((data) => {
        console.log("INFO: Call ok !");
      })
      .catch((error) => {
        console.error("ERROR: Error calling API:", error);
      });
  });

  const dummy = {
    curlfetch: "done",
  };

  res.json(dummy);
});

// --------------------------------------------------------------------------
// Helper : fibonacci : cpu intensive function to create some load
// --------------------------------------------------------------------------
function fibo(n) {
  if (n < 2) return 1;
  else return fibo(n - 2) + fibo(n - 1);
}

// --------------------------------------------------------------------------
// Helper : Calling an external API
// --------------------------------------------------------------------------
function fetchData() {
  fetch("http://localhost:" + expressPort + "/curlproxy")
    .then((response) => response.json())
    .then((data) => {
      console.log("INFO: Called curlproxy internally");
    })
    .catch((error) => {
      console.error("ERROR: Error calling curlproxy:", error);
    });
}

// --------------------------------------------------------------------------
// Helper : Start the curl at startup
// --------------------------------------------------------------------------
function startCurl() {
  fetch("http://localhost:" + expressPort + "/startcurl")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      console.log("INFO: Started the curl loop !");
    })
    .catch((error) => {
      console.error("ERROR: Error calling API:", error);
    });
}
