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

function DemoX({ envData, setEnvData }) {
  console.log("INFO : DemoX.js incoming envData : ", envData);


  return (
    <Grid>
      <Column md={6} lg={12} sm={4}>
    </Grid>
  );
}



export default DemoX;
