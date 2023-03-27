import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DemoOne from "./DemoOne";
import DemoThree from "./DemoThree";

function ContentPane({ envData, setEnvData }) {
  return (
    <Tabs>
      <TabList aria-label="Content List" contained activation="automatic">
        <Tab disabled={false}>POD Info</Tab>
        <Tab disabled={false}>Code Engine Events</Tab>
        <Tab disabled={false}>Curl Loop</Tab>
        <Tab disabled={true}>More demo ...</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DemoOne envData={envData} setEnvData={setEnvData} />
        </TabPanel>
        <TabPanel>TODO</TabPanel>
        <TabPanel>
          <DemoThree envData={envData} setEnvData={setEnvData} />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ContentPane;
