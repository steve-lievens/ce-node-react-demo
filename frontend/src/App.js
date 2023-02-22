import "./app.scss";
import { ContainerServices } from "@carbon/icons-react";
import InfoPane from "./InfoPane";
import ContentPane from "./ContentPane";
import React, { useEffect, useState } from "react";
import { getEnvironment } from "./api-calls";

function App() {
  const [curlStatus, setCurlStatus] = useState(false);

  useEffect(function () {
    async function getEnv() {
      const data = await getEnvironment();
      console.log(data);
      setCurlStatus(data.curlStatus);
      console.log("curlStatus is set to ", data.curlStatus);
    }
    console.log("Getting the environment variables.");
    getEnv();
  }, []);

  return (
    <>
      <Header />
      <Page curlStatus={curlStatus} />
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

function Page({ curlStatus }) {
  return (
    <>
      <div className="my-infopane">
        <InfoPane />
        <ContentPane curlStatus={curlStatus} />
      </div>
    </>
  );
}

export default App;
