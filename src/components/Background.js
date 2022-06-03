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
  let direction = -1;

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

  return (
    <div className="background">
      {[...Array(8)].map((item, index) => {
        direction *= -1;
        let delay = Math.floor(Math.random() * 100);
        let speed = Math.floor(Math.random() * 5 + 1);
        return (
          <OneLine
            key={index}
            width={windowSize.width}
            divide8Height={windowSize.divide8Height}
            direction={direction}
            speed={speed}
            delay={delay}
          ></OneLine>
        );
      })}
    </div>
  );
};

export default Background;
