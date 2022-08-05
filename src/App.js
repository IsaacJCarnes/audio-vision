import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";

import Header from "./components/Header";
import Osc1 from "./components/Osc1";
import Filter from "./components/Filter";
import NoteKeyboard from "./components/NoteKeyboard";

function App() {
  const basePath = "/audio-vision/";

  return (
    <div className="App">
      <Header />
      <div id="Content">
        <NoteKeyboard/>
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
