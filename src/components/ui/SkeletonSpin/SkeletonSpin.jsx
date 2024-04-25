import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./SkeletonSpin.css";

function SkeletonSpin() {
  return (
    <div className="skeleton__spinner">
      <FaSpinner className="skeleton__spinner--icon" />
    </div>
  );
}

export default SkeletonSpin;