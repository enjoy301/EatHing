import "./App.css";
import MyTest from "./components/MyTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-Area">
          <p class="title">오늘 점심 메뉴는?</p>
          <MyTest></MyTest>
        </div>
      </header>
    </div>
  );
}

export default App;
