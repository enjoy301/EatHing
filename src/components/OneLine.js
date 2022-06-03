import react, { useState, useEffect } from "react";
import "./OneLine.css";
import styled from "styled-components";

const OneLine = ({ width, divide8Height, direction, speed, delay }) => {
  const [marginRightSize, setMarginRightSize] = useState(divide8Height * 2);
  const [boxCount, setBoxCount] = useState(1);
  const [boxSize, setBoxSize] = useState(divide8Height * 0.9);

  useEffect(() => {
    setMarginRightSize(divide8Height * 2);
    setBoxSize(divide8Height * 0.9);
  }, [divide8Height]);

  useEffect(() => {
    const minSetSize = boxSize + marginRightSize + boxSize;
    const oneSetSize = marginRightSize + boxSize;

    if (width < minSetSize) {
      setBoxCount(0);
    } else {
      setBoxCount(parseInt((width - boxSize) / oneSetSize));
    }
  }, [marginRightSize, boxSize, width]);

  const calculateLeft = (index) => {
    if (index === -2) {
      return -(boxSize + marginRightSize) + "px";
    } else if (index === -1) {
      return (boxSize + marginRightSize) * boxCount + "px";
    } else if (index === 0) {
      return "0px";
    } else {
      return (boxSize + marginRightSize) * index + "px";
    }
  };

  const Box = styled.div`
    width: ${boxSize + "px"};
    height: ${boxSize + "px"};
    left: ${(props) => calculateLeft(props.index)};
  `;

  return (
    <div
      style={{ width: "200%", height: divide8Height, backgroundColor: "red" }}
    >
      <div className="horizon-slide-box">
        <Box className="horizon-item" index={-2}></Box>
        {[...Array(boxCount)].map((item, index) => {
          return <Box key={index} className="horizon-item" index={index}></Box>;
        })}
        <Box className="horizon-item" index={-1}></Box>
      </div>
    </div>
  );
};

export default OneLine;
