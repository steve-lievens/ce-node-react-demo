import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "@carbon/react";
import { Button } from "@carbon/react";
import { getEnvironment } from "./api-calls";

function DemoOne({ envData, setEnvData }) {
  console.log("INFO : DemoOne.js incoming envData : ", envData);

  function handleRefresh() {
    async function getEnv() {
      const data = await getEnvironment();
      console.log("INFO : DemoOne.js data from get Environment : ", data);
      setEnvData(data);
    }
    console.log("INFO : DemoOne.js - Getting the environment variables.");
    getEnv();
  }

  function handleCrash() {
    fetch("/crashPod")
      .then((response) => response.json())
      .then((data) => {
        console.log("INFO : Crashing the pod : ", data);
        handleRefresh();
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <StructuredListWrapper ariaLabel="Info list">
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Key</StructuredListCell>
            <StructuredListCell head>Value</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell>Application Name</StructuredListCell>
            <StructuredListCell>{envData.app_name}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Client Title</StructuredListCell>
            <StructuredListCell>{envData.client_title}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Client Version</StructuredListCell>
            <StructuredListCell>{envData.client_version}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Client IP</StructuredListCell>
            <StructuredListCell>{envData.client_ip}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Region</StructuredListCell>
            <StructuredListCell>{envData.region}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Hostname</StructuredListCell>
            <StructuredListCell>{envData.hostname}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Curl Status</StructuredListCell>
            <StructuredListCell>
              {envData.curlStatus ? "started" : "stopped"}
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
      <div className="my-demo-buttons">
        <Button className="my-demo-buttonone" onClick={handleRefresh}>
          Refresh
        </Button>
        <Button
          className="my-demo-buttonone"
          kind="danger"
          onClick={handleCrash}
        >
          Crash the Pod !
        </Button>
      </div>
    </>
  );
}

export default DemoOne;
