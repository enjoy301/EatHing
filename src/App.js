import "./App.css";
import MyTest from "./components/MyTest";
import Background from "./components/Background";

function App() {
  return (
    <div className="App">
      <Background></Background>
      <header className="App-header">
        <div className="Main-Area">
          <MyTest></MyTest>
        </div>
      </header>
    </div>
  );
}

export default App;
