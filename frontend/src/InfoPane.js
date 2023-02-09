import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "@carbon/react";
import { LogoKubernetes } from "@carbon/icons-react";
import { LogoOpenshift } from "@carbon/icons-react";

function InfoPane() {
  return (
    <StructuredListWrapper ariaLabel="Info list">
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>Info</StructuredListCell>
          <StructuredListCell head></StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>
            <LogoKubernetes
              className="my-infologokube my-infologohidden"
              size="100"
            />
            <LogoOpenshift className="my-infologoocp" size="100" />
          </StructuredListCell>
          <StructuredListCell>
            This application is built in support of demonstrating Red Hat
            OpenShift capabilities and explaining the power of running
            containers in a Kubernetes environment.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
}

export default InfoPane;
