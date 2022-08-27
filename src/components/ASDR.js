import React, { useContext } from "react";
import { CTX } from "../context/Store";

const ASDR = () => {
  const [appState, updateState] = useContext(CTX);
  let { attack, decay, sustain, release } = appState.envelope;
  const change = (e) => {
    let { id, value } = e.target;
    console.log(id + " " + value);
    updateState({ type: "CHANGE_ADSR", payload: { id, value } });
  };

  return (
    <div>
      <h2 className="textContent">ASDR</h2>
      <div className="sliderContainer">
        <div className="param">
          <h3>attack</h3>
          <span className="sliderWithHoriLine">
            <input
              value={attack}
              onChange={change}
              type="range"
              id="attack"
              max="2"
              step="0.2"
            />
          </span>
        </div>
        <div className="param">
          <h3>decay</h3>
          <span className="sliderWithHoriLine">
            <input
              value={decay}
              onChange={change}
              type="range"
              id="decay"
              max="1"
              step="0.1"
            />
          </span>
        </div>
        <div className="param">
          <h3>sustain</h3>
          <span className="sliderWithHoriLine">
            <input
              value={sustain}
              onChange={change}
              type="range"
              id="sustain"
              max="1"
              step="0.1"
            />
          </span>
        </div>
        <div className="param">
          <h3>release</h3>
          <span className="sliderWithHoriLine">
            <input
              value={release}
              onChange={change}
              type="range"
              id="release"
              max="2"
              step="0.2"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ASDR;
