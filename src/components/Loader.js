import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default Loader;
