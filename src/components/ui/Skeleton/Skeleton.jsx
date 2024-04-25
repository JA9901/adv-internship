import React from "react";
import "./Skeleton.css";

function Skeleton({ width, height }) {
  const skeletonStyle = {
    width: width,
    height: height,
  };
  return <div className="skeleton" style={skeletonStyle}></div>;
}

export default Skeleton;