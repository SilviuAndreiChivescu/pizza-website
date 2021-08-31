import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularUnderLoad() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
}
