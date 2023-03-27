import "./app.scss";
import { ContainerServices } from "@carbon/icons-react";
import InfoPane from "./InfoPane";
import ContentPane from "./ContentPane";
import React, { useEffect, useState } from "react";
import { getEnvironment } from "./api-calls";

function App() {
  //const [curlStatus, setCurlStatus] = useState(false);
  const [envData, setEnvData] = useState({});

  useEffect(function () {
    async function getEnv() {
      const data = await getEnvironment();
      console.log("INFO : App.js data from get Environment : ", data);
      //setCurlStatus(data.curlStatus);
      setEnvData(data);
      //console.log("curlStatus is set to ", data.curlStatus);

      // Set the title in the browser bar
      document.title = data.client_title;
    }
    console.log("INFO : App.js - Getting the environment variables.");
    getEnv();
  }, []);

  return (
    <>
      <Header />
      <Page envData={envData} setEnvData={setEnvData} />
    </>
  );
}

function Header() {
  return (
    <div className="my-header">
      <h1>
        <ContainerServices className="my-icon" size="40" />
        Container Demo App
      </h1>
    </div>
  );
}

function Page({ envData, setEnvData }) {
  return (
    <>
      <div className="my-infopane">
        <InfoPane />
        <ContentPane envData={envData} setEnvData={setEnvData} />
      </div>
    </>
  );
}

export default App;
