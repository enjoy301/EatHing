import React, { useState, useEffect } from "react";

const History = ({ result }) => {
  const [arr, setArr] = useState(["a", "b", "c"]);

  useEffect(() => {
    let newArr = arr;
    newArr[0] = result[0];
    setArr(newArr);
  }, [arr, result]);

  return (
    <div className="history">
      <div className="item">{arr[0]}</div>
      <span className="line"></span>
      <div className="item">{arr[1]}</div>
      <span className="line"></span>
      <div className="item">{arr[2]}</div>
    </div>
  );
};

export default History;
