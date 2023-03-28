import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  ActionableNotification,
  Button,
  Grid,
  Column,
} from "@carbon/react";
import React, { useState } from "react";
import { getEnvironment } from "./api-calls";

function DemoOne({ envData, setEnvData }) {
  console.log("INFO : DemoOne.js incoming envData : ", envData);
  const [showCrashOK, setShowCrashOK] = useState(false);
  const [showCrashNOK, setShowCrashNOK] = useState(false);

  function handleRefresh() {
    async function getEnv() {
      const data = await getEnvironment();
      console.log("INFO : DemoOne.js data from get Environment : ", data);

      // Do we still have a backend ?
      if (typeof data.app_name != "undefined") {
        console.log("INFO : DemoOne.js - incoming backend data valid.");
        setShowCrashNOK(false);
      } else {
        console.log("INFO : DemoOne.js - incoming backend data not valid !");
        setShowCrashOK(false);
        setShowCrashNOK(true);
      }
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
        setShowCrashOK(true);
        handleRefresh();
      })
      .catch((error) => {
        console.error(error);
        handleRefresh();
      });
  }

  function handleCloseOK() {
    console.log("INFO : DemoOne.js - Closing info box.");
    setShowCrashOK(false);
  }

  return (
    <Grid>
      <Column md={6} lg={12} sm={4}>
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
              <StructuredListCell>Hostname (Pod name)</StructuredListCell>
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
      </Column>
      <Column md={2} lg={4} sm={4}>
        <MyToast
          showCrashNOK={showCrashNOK}
          showCrashOK={showCrashOK}
          handleRefresh={handleRefresh}
          handleCloseOK={handleCloseOK}
        />
      </Column>
    </Grid>
  );
}

function MyToast({ showCrashNOK, showCrashOK, handleRefresh, handleCloseOK }) {
  const currentTime = new Date();
  const currentTimeString =
    currentTime.getHours() +
    ":" +
    currentTime.getMinutes() +
    ":" +
    currentTime.getSeconds();

  if (showCrashNOK)
    return (
      <>
        <ActionableNotification
          hideCloseButton={true}
          actionButtonLabel="Refresh"
          caption={currentTimeString}
          onActionButtonClick={handleRefresh}
          statusIconDescription="Pod Crashed"
          subtitle="Currently no other pods available ..."
          title="Pod has crashed"
        />
      </>
    );

  if (showCrashOK)
    return (
      <>
        <ActionableNotification
          hideCloseButton={true}
          actionButtonLabel="Close"
          caption={currentTimeString}
          onActionButtonClick={handleCloseOK}
          statusIconDescription="Pod Crashed"
          subtitle="But we still have at least one pod available !"
          title="Pod has crashed"
          kind="success"
        />
      </>
    );

  return null;
}

export default DemoOne;
