import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DemoOne from "./DemoOne";

function ContentPane() {
  return (
    <Tabs>
      <TabList aria-label="Content List" contained activation="automatic">
        <Tab disabled={false}>POD Info</Tab>
        <Tab disabled={false}>Code Engine Events</Tab>
        <Tab disabled={true}>More demo ...</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DemoOne />
        </TabPanel>
        <TabPanel>TODO</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ContentPane;
