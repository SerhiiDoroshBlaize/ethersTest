import "./App.css";
import EthersBlock from "./components/EthersBlock";
import Header from "./components/Header";
import NetworkSelector from "./components/NetworkSelector";

function App() {
  return (
    <div className="App">
      <Header />
      <EthersBlock />
      <NetworkSelector />
    </div>
  );
}

export default App;
