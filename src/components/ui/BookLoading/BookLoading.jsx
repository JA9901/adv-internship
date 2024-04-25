import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import "./BookLoading.css"

function BookLoading() {
  return (
    <div className="book__loading">
      <Skeleton width="172px" height="172px"/>
      <Skeleton width="160px" height="20px"/>
      <Skeleton width="100px" height="20px"/>
      <Skeleton width="100px" height="10px"/>
    </div>
  );
}

export default BookLoading;