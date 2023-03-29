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

function DemoTwo({ envData, setEnvData }) {
  console.log("INFO : DemoTwo.js incoming envData : ", envData);

  return (
    <Grid>
      <Column md={6} lg={12} sm={4}>
        TODO
      </Column>
    </Grid>
  );
}

export default DemoTwo;
