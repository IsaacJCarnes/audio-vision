import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";

import Header from "./components/Header.js";
import Osc1 from "./components/Osc1.js";
import Filter from "./components/Filter.js";

function App() {
  const basePath = "/audio-vision/";

  return (
    <div className="App">
      <Header />
      <div id="Content">
        <Osc1/>
        <Filter/>
      </div>
    </div>
  );
}
/*
<Routes>
          <Route exact path={basePath} element={<HomePage />} />
        </Routes>
        */

export default App;
