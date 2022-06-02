import react, { useState, useEffect } from "react";
import "./OneLine.css";

const OneLine = ({ items, direction, speed, delay, divide8Height }) => {
  const rendering = () => {
    return (
      <div className="horizon-slide-box">
        <div className="horizon-item"></div>
        <div className="horizon-item"></div>
        <div className="horizon-item"></div>
      </div>
    );
  };

  return (
    <div
      style={{ width: "100%", height: divide8Height, backgroundColor: "red" }}
    >
      {rendering()}
    </div>
  );
};

export default OneLine;
