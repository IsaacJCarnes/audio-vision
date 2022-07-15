import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";

import Header from "./components/Header.js";
import Osc1 from "./components/Osc1.js";

let context = new AudioContext();
let destination = context.destination;

let osc1 = context.createOscillator();
let gain1 = context.createGain();

osc1.connect(gain1);
gain1.connect(destination);

function App() {
  const basePath = "/audio-vision/";

  const [firstTime, setFirstTime] = useState(true);

  const [osc1Settings, setOsc1Settings] = useState({
    frequency: osc1.frequency.value,
    detune: osc1.detune.value,
    type: osc1.type,
  });

  const ChangeOsc1 = (e) => {
    let { value, id } = e.target;
    setOsc1Settings({...osc1Settings, [id]: value});
    if(id === 'type'){
      console.log(value + " " + id);
      osc1.type = value;
    } else {
      osc1[id].value = value;
    }
  }

  const noteTime = 1; // seconds to milliseconds
  const [lastPlayed, setLastPlayed] = useState(null)
  const PlayNote = () => {
    if(lastPlayed !== null && lastPlayed + noteTime < (Date.now()/1000)){
      console.log("early push");
    }
    setLastPlayed(Date.now()/1000);
    if(firstTime){
      setFirstTime(false)
      osc1.start()
    } else {
      gain1.gain.exponentialRampToValueAtTime(.8, context.currentTime);
    }
    gain1.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + noteTime - 0.03);
  }

  return (
    <div className="App">
      <Header />
      <div id="Content">
        <Osc1 change={ChangeOsc1} settings={osc1Settings} />
        <h3>Play Note</h3>
        <button id="NoteBtn" className={lastPlayed + noteTime > (Date.now()/1000) && "activeBtn"} onClick={() => PlayNote()}></button>
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
