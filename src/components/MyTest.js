import React, { useState, useEffect, useRef } from "react";
import "./MyTest.css";

function useInterval(callback, delay) {
  const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

const MyTest = () => {
  const [arr, setArr] = useState([
    [" ", "???"],
    [" ", "???"],
    [" ", "???"],
  ]);
  const [until, setUntil] = useState(-999);
  const [speed, setSpeed] = useState(6);
  const [marginValue, setMarginValue] = useState("80");
  const [marginTop, setMarginTop] = useState("-80px");
  const [time, setTime] = useState(1500);
  const [rolling, setRolling] = useState(true);
  const [counting, setCounting] = useState(false);
  const slide = useRef();
  const foods = [
    ["🍒", "체"],
    ["🍉", "수"],
    ["🍊", "렌"],
    ["🍓", "딸"],
    ["🍇", "포"],
    ["🥝", "키"],
    ["🐶", "개"],
    ["🐱", "냥"],
    ["🐭", "쥐"],
    ["🐹", "햄"],
    ["🐰", "토"],
    ["🦊", "여"],
    ["🐻", "곰"],
  ];
  let delay = 10;
  let emojiSize = 80;
  let totalSize = emojiSize * (foods.length + 1);

  useInterval(
    () => {
      if (rolling && !counting) {
        // 와다다다 계속 돌때
        setMarginValue(marginValue + speed);
        changeMargin();
      } else if (!rolling && counting) {
        // 점점 느려질 때
        setTime(time - 10);

        if (time < 0) {
          if (until === -999) {
            setUntil(Math.floor((marginValue - 45) / 80) * 80 + 45);
          }
          if (marginValue < until) {
            getResult();
            setCounting(false);
            setSpeed(6);
            setUntil(-999);
          }
        } else if (time >= 0 && time < 500) {
          setSpeed(speed - 0.1);
        } else if (time >= 500 && time < 1000) {
          setSpeed(speed - 0.05);
        } else if (time >= 1000 && time < 1500) {
          setSpeed(speed - 0.01);
        }
        setMarginValue(marginValue + speed);
        changeMargin();
      }
    },
    rolling || counting ? delay : null
  );

  const getResult = () => {
    arr[2] = arr[1];
    arr[1] = arr[0];
    arr[0] = foods[((until - 45) / 80 - 1 + foods.length) % foods.length];
    setArr(arr);
  };

  const changeMargin = () => {
    if (marginValue >= totalSize) {
      setMarginValue(80);
    }
    let marginTop = "-" + marginValue.toString() + "px";
    setMarginTop(marginTop);
  };

  const onClick = () => {
    if (rolling) {
      setCounting(true);
    } else {
      setTime(1500);
    }
    setRolling(!rolling);
  };

  const rendering = () => {
    const result = [];
    result.push(<div key="f1">{foods[foods.length - 2][0]}</div>);
    result.push(<div key="f2">{foods[foods.length - 1][0]}</div>);
    for (let j = 0; j < foods.length; j++) {
      result.push(<div key={j.toString()}>{foods[j][0]}</div>);
    }
    result.push(<div key="l1">{foods[0][0]}</div>);
    result.push(<div key="l2">{foods[1][0]}</div>);
    return result;
  };

  return (
    <div>
      <p className="title">오늘 점심 메뉴는?</p>
      <div className="cont">
        <div className="arrow left-arrow"></div>
        <div className="pointer"></div>
        <div className="arrow right-arrow"></div>
        <ul className="slide-box" ref={slide} style={{ marginTop: marginTop }}>
          {rendering()}
        </ul>
      </div>
      <button className="roll" onClick={onClick} disabled={counting}>
        {rolling ? "멈춰!" : "돌려!"}
      </button>
      <div className="history">
        <div className="item">
          <div className="icon">{arr[0][0]}</div>
          <div className="name">{arr[0][1]}</div>
        </div>
        <div className="line"></div>
        <div className="item">
          <div className="icon">{arr[1][0]}</div>
          <div className="name">{arr[1][1]}</div>
        </div>
        <div className="line"></div>
        <div className="item">
          <div className="icon">{arr[2][0]}</div>
          <div className="name">{arr[2][1]}</div>
        </div>
      </div>
    </div>
  );
};

export default MyTest;
