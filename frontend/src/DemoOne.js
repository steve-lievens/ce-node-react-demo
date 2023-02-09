import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "@carbon/react";
import { Button } from "@carbon/react";

function DemoOne() {
  return (
    <>
      <StructuredListWrapper ariaLabel="Info list">
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Head 1</StructuredListCell>
            <StructuredListCell head>Head 2</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell>Content one</StructuredListCell>
            <StructuredListCell>Content two</StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
      <div className="my-demoone-buttons">
        <Button className="my-demoone-buttonone">Refresh</Button>
        <Button kind="danger">Crash the Pod !</Button>
      </div>
    </>
  );
}

export default DemoOne;
