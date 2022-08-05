import React, {useContext}  from "react";
import {CTX} from "../context/Store";

const Osc1 = () => {
  const [appState, updateState] = useContext(CTX);
  let { detune, type } = appState.osc1Settings;
  const change = (e) => {
    let {id, value } = e.target;
    console.log(id +" " + value);
    updateState({ type: 'CHANGE_OSC1', payload: { id, value }});
  }

  /*const PlayNote = () => {
    if(lastPlayed !== null && lastPlayed + noteTime > (Date.now()/1000)){
      return;
    }
    setLastPlayed(Date.now()/1000);
    if(firstTime){
      setFirstTime(false)
      osc1.start()
    } else {
      gain1.gain.exponentialRampToValueAtTime(.8, context.currentTime);
    }
    gain1.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + noteTime - 0.03);
  }*/

  return (
    <div>
      <div>
        <h3>Play</h3>
        <button id="NoteBtn" onClick={() => updateState({ type: 'START_OSC'})}></button>
        <h3>Stop</h3>
        <button id="NoteBtn" onClick={() => updateState({ type: 'STOP_OSC'})}></button>
      </div>
      <div className="param">
        <h3>Detune</h3>
        <input
          value={detune}
          onChange={change}
          type="range"
          id="detune"
        />
      </div>
      <div className="param">
        <h3>Wave</h3>
        <div style={{display: "flex", flexDirection: "row"}}>
        <button
          id="type"
          className={type === "sine" ? "textSelected" : "textContent"}
          value="sine"
          onClick={change}
        >
          Sine
        </button>
        <button
          id="type"
          className={
            type === "triangle" ? "textSelected" : "textContent"
          }
          value="triangle"
          onClick={change}
        >
          Triangle
        </button>
        <button
          id="type"
          className={
            type === "square" ? "textSelected" : "textContent"
          }
          value="square"
          onClick={change}
        >
          Square
        </button>
        <button
          id="type"
          className={
            type === "sawtooth" ? "textSelected" : "textContent"
          }
          value="sawtooth"
          onClick={change}
        >
          Sawtooth
        </button>
        </div>
      </div>
    </div>
  );
};

export default Osc1;
