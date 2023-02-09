import "./app.scss";
import { ContainerServices } from "@carbon/icons-react";
import InfoPane from "./InfoPane";
import ContentPane from "./ContentPane";
import React, { useEffect } from "react";
import { getEnvironment } from "./api-calls";

function App() {
  useEffect(function () {
    async function getEnv() {
      const data = await getEnvironment();
      console.log(data);
    }
    getEnv();
  }, []);

  return (
    <>
      <Header />
      <Page />
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

function Page() {
  return (
    <>
      <div className="my-infopane">
        <InfoPane />
        <ContentPane />
      </div>
    </>
  );
}

export default App;
