import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import Header from "./components/Header.js";

function App() {
  const basePath = "/audio-vision/";
  return (
    <div className="App">
      <Header />
      <div id="Content">
        <Routes>
          <Route exact path={basePath} element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
