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

const MyTest = (props) => {
  const [until, setUntil] = useState(-999);
  const [speed, setSpeed] = useState(6);
  const [marginValue, setMarginValue] = useState("0");
  const [marginTop, setMarginTop] = useState("0px");
  const [time, setTime] = useState(1500);
  const [rolling, setRolling] = useState(true);
  const [counting, setCounting] = useState(false);
  const slide = useRef();
  const foods = [
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
  ];
  let delay = 10;
  let emojiSize = 80;
  let totalSize = emojiSize * foods.length;

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
    props.setResult("a");
  };

  const changeMargin = () => {
    if (marginValue >= totalSize) {
      setMarginValue(0);
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
    result.push(<div key="f">{foods[foods.length - 1]}</div>);
    for (let j = 0; j < foods.length; j++) {
      result.push(<div key={j.toString()}>{foods[j]}</div>);
    }
    result.push(<div key="l">{foods[0]}</div>);
    return result;
  };

  return (
    <div>
      <div className="cont">
        <ul className="slide-box" ref={slide} style={{ marginTop: marginTop }}>
          {rendering()}
        </ul>
      </div>
      <button className="roll" onClick={onClick} disabled={counting}>
        {rolling ? "stop" : "roll"}
      </button>
      {marginValue}
    </div>
  );
};

export default MyTest;
