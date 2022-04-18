import "./App.css";
import History from "./components/History";
import MyTest from "./components/MyTest";
import { useState } from "react";

function App() {
  const [result, setResult] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-Area">
          <p>오늘 점심 메뉴는?</p>
          <MyTest setResult={setResult}></MyTest>
          <History></History>
          <div>{result}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
