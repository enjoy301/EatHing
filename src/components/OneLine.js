import react, { useState, useEffect } from "react";
import "./OneLine.css";
import styled from "styled-components";
import { keyframes } from "styled-components";

const OneLine = ({ width, divide8Height, direction }) => {
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
    if (index === 0 || index === 101 || index === 102) {
      switch (index) {
        case 0:
          return "0px";
        case 101:
          return (boxSize + marginRightSize) * boxCount + "px";
        case 102:
          return (boxSize + marginRightSize) * (boxCount + 1) + "px";
        default:
          return "0px";
      }
    } else {
      return (boxSize + marginRightSize) * index + "px";
    }
  };

  const boxMove = keyframes`
    0% {
      left: 0px;
    }
    100% {
      left: ${(boxSize + marginRightSize) * 2 + "px"};
    }
  `;

  const BoxContainer = styled.div`
    width: 200%;
    height: ${divide8Height + "px"};
    position: relative;
    display: flex;
    align-items: center;
    animation: ${boxMove} 4s infinite linear
      ${direction === 1 ? "normal" : "reverse"};
  `;

  const Box = styled.div`
    width: ${boxSize + "px"};
    height: ${boxSize + "px"};
    position: absolute;
    // border: 1px solid black;
    text-align: center;
    align-items: center;
    margin: 0;
    font-size: ${boxSize + "px"};
    left: ${(props) => calculateLeft(props.index)};
  `;

  return (
    <BoxContainer>
      <Box className="horizon-item" index={-2}>
        🍒
      </Box>
      <Box className="horizon-item" index={-1}>
        🐶
      </Box>
      {[...Array(boxCount)].map((item, index) => {
        return (
          <Box key={index} className="horizon-item" index={index}>
            {index % 2 === 0 ? "🍒" : "🐶"}
          </Box>
        );
      })}
      <Box className="horizon-item" index={101}>
        {boxCount % 2 === 0 ? "🍒" : "🐶"}
      </Box>
      <Box className="horizon-item" index={102}>
        {boxCount % 2 === 1 ? "🍒" : "🐶"}
      </Box>
    </BoxContainer>
  );
};

export default OneLine;
