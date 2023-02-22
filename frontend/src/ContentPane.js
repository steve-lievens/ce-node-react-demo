import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DemoOne from "./DemoOne";
import DemoThree from "./DemoThree";

function ContentPane({ curlStatus }) {
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
          <DemoOne />
        </TabPanel>
        <TabPanel>TODO</TabPanel>
        <TabPanel>
          <DemoThree curlStatus={curlStatus} />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ContentPane;
