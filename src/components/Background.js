import React, { useState } from "react";
import "./Background.css";

const Background = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const character = [];

  const rendering = () => {
    return <div style={{ height: windowSize.height / 8, width: "100%" }}></div>;
  };

  return <div className="background">{rendering()}</div>;
};

export default Background;
