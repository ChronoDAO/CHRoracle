import React from "react";

import dynamic from "next/dynamic";
import type {  InferGetStaticPropsType } from "next";
import getStaticProps from "./getgraphdata";

// Dynamically import the ThreeDForceGraph component
const DynamicThreeDForceGraph = dynamic(
  () => import("../../components/3dforcegraph"),
  { ssr: false } // Disable server-side rendering
);

const ForceGraph = ({
  nodes,
  links,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const graphData = {
    nodes,
    links,
  };

  return (
    <>
      {/* Render your user profile data */}
      {/* ... */}
      {/* Render the 3D Force-Directed Graph */}
      <DynamicThreeDForceGraph data={graphData} />
    </>
  );
};

export default ForceGraph;
