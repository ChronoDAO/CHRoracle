import React, { useRef, useEffect } from "react";
import createGraph from "3d-force-graph";

const ThreeDForceGraph = ({ data }) => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);

  useEffect(() => {
    graphRef.current = createGraph()(containerRef.current);
    graphRef.current.graphData(data);
  }, [data]);

  return <div ref={containerRef} />;
};

export default ThreeDForceGraph;
