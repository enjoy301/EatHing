import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import OneLine from "./OneLine";
import "./Background.css";

const Background = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    divide8Height: window.innerHeight / 8,
  });

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      divide8Height: window.innerHeight / 8,
    });
  }, 500);

  const rendering = () => {
    return (
      <>
        <OneLine
          items={["a", "b"]}
          direction={1}
          speed={1}
          delay={1}
          divide8Height={window.innerHeight / 8}
        ></OneLine>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "blue",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "black",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "white",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "yellow",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "green",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "pink",
          }}
        ></div>
        <div
          style={{
            height: windowSize.divide8Height,
            width: "100%",
            backgroundColor: "brown",
          }}
        ></div>
      </>
    );
  };

  return <div className="background">{rendering()}</div>;
};

export default Background;
