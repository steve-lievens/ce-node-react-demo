import { Button } from "@carbon/react";

function DemoThree({ envData, setEnvData }) {
  console.log("INFO : DemoThree.js incoming envData : ", envData);

  function handleStartCurl() {
    fetch("/startcurl")
      .then((response) => response.json())
      .then((data) => {
        console.log("INFO : Curl started. Startstatus : ", data.started);
        envData.curlStatus = data.started;
        setEnvData({ ...envData }); // destructuring the object, otherwise it does not trigger a re-render as it passes by reference
      })
      .catch((error) => console.error(error));
  }

  function handleStopCurl() {
    fetch("/stopcurl")
      .then((response) => response.json())
      .then((data) => {
        console.log("INFO : Curl stopped. Startstatus : ", data.started);
        envData.curlStatus = data.started;
        setEnvData({ ...envData }); // destructuring the object, otherwise it does not trigger a re-render as it passes by reference
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
          disabled={envData.curlStatus}
          onClick={handleStartCurl}
        >
          Start the CURL
        </Button>
        <Button
          className="my-demo-buttonone"
          disabled={!envData.curlStatus}
          onClick={handleStopCurl}
        >
          Stop the CURL
        </Button>
      </div>
      <div>
        The Curl loop is now {envData.curlStatus ? "started." : "stopped."}
      </div>
    </>
  );
}

export default DemoThree;
