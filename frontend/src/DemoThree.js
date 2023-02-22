import React, { useState, useEffect } from "react";
import { Button } from "@carbon/react";

function DemoThree({ curlStatus }) {
  console.log(curlStatus);
  const [curlStarted, setCurlStatus] = useState(curlStatus);

  useEffect(() => {
    fetch("/getEnvironment")
      .then((response) => response.json())
      .then((data) => setCurlStatus(data.curlStatus));
  }, []);

  function handleStartCurl() {
    fetch("/startcurl")
      .then((response) => response.json())
      .then((data) => {
        setCurlStatus(data.started);
        console.log("Curl started. Startstatus : ", data.started);
      })
      .catch((error) => console.error(error));
  }

  function handleStopCurl() {
    fetch("/stopcurl")
      .then((response) => response.json())
      .then((data) => {
        setCurlStatus(data.started);
        console.log("Curl stopped. Startstatus : ", data.started);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div>
        This will trigger a loop that will curl a REST api endpoint every 5
        seconds.
      </div>
      <div className="my-demo-buttons">
        <Button
          kind="danger"
          className="my-demo-buttonone"
          disabled={curlStarted}
          onClick={handleStartCurl}
        >
          Start the CURL
        </Button>
        <Button disabled={!curlStarted} onClick={handleStopCurl}>
          Stop the CURL
        </Button>
      </div>
      <div>The Curl loop is now {curlStarted ? "started." : "stopped."}</div>
    </>
  );
}

export default DemoThree;
