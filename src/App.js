import "./App.css";
import History from "./components/History";
import MyTest from "./components/MyTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-Area">
          <p>오늘 점심 메뉴는?</p>
          <MyTest></MyTest>
          <History></History>
        </div>
      </header>
    </div>
  );
}

export default App;
