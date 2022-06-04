import react, { useState, useEffect } from "react";
import "./OneLine.css";
import styled, { keyframes } from "styled-components";

const OneLine = ({ items, index, width, divide8Height, direction }) => {
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

  return (
    <BoxContainer
      index={index}
      divide8Height={divide8Height}
      direction={direction}
      boxSize={boxSize}
      marginRightSize={marginRightSize}
    >
      {[...Array(boxCount + 4)].map((item, index) => {
        return (
          <Box
            key={index - 2}
            className="horizon-item"
            index={index - 2}
            calculateLeft={calculateLeft}
            boxSize={boxSize}
          >
            {items[index % 2]}
          </Box>
        );
      })}
    </BoxContainer>
  );
};

const boxContainerMove = (props) => keyframes`
  0% {
    left: 0px;
  }
  100% {
    left: ${(props.boxSize + props.marginRightSize) * 2 + "px"};
  }
`;

const BoxContainer = styled.div`
  width: 200%;
  height: ${(props) => props.divide8Height + "px"};
  position: relative;
  display: flex;
  align-items: center;
  left: ${(props) =>
    props.index % 2 === 1
      ? (props.boxSize + props.marginRightSize) / 2 + "px"
      : "0px"};
  animation: ${(props) => boxContainerMove(props)} 8s infinite linear
    ${(props) => (props.direction === 1 ? "normal" : "reverse")};
`;

const Box = styled.div`
  width: ${(props) => props.boxSize + "px"};
  height: ${(props) => props.boxSize + "px"};
  position: absolute;
  // border: 1px solid black;
  text-align: center;
  align-items: center;
  margin: 0;
  font-size: ${(props) => props.boxSize * 0.5 + "px"};
  left: ${(props) => props.calculateLeft(props.index)};
`;

export default OneLine;
