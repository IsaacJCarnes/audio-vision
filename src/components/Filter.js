import React, { useContext } from "react";
import { CTX } from "../context/Store";

const Filter = () => {
    
  const [appState, updateState] = useContext(CTX);
  let { frequency, detune, Q, gain, type } = appState.filterSettings;
  const filterGain = ["lowshelf", "highshelf", "peaking"];
  const filterQ = ["lowpass", "highpass", "bandpass", "peaking", "notch", "allpass"];

  const change = (e) => {
    let { id, value } = e.target;
    updateState({ type: "CHANGE_FILTER", payload: { id, value } });
  };

  return (
    <div>
      <h2 className="textContent">Filter</h2>
      <div className="sliderContainer">
        <div className="param">
          <h3>frequency</h3>
          <span className="sliderWithHoriLine">
            <input
              value={frequency}
              type="range"
              onChange={change}
              id="frequency"
              max="10000"
            />
          </span>
        </div>
        <div className="param">
          <h3>detune</h3>
          <span className="sliderWithHoriLine">
            <input value={detune} type="range" onChange={change} id="detune" />
          </span>
        </div>
        <div className="param" style={{display: filterQ.includes(type) ? 'flex' : 'none'}}>
          <h3>Q</h3>
          <span className="sliderWithHoriLine">
            <input value={Q} type="range" onChange={change} id="Q" max="10" />
          </span>
        </div>
        <div className="param" style={{display: filterGain.includes(type) ? 'flex' : 'none'}}>
          <h3>gain</h3>
          <span className="sliderWithHoriLine">
            <input
              value={gain}
              type="range"
              onChange={change}
              id="gain"
              max="10"
            />
          </span>
        </div>
      </div>
      <div className="param">
        <h3>type</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            id="type"
            className={type === "lowpass" ? "textSelected" : "textContent"}
            value="lowpass"
            onClick={change}
          >
            Lowpass
          </button>
          <button
            id="type"
            className={type === "highpass" ? "textSelected" : "textContent"}
            value="highpass"
            onClick={change}
          >
            Highpass
          </button>
          <button
            id="type"
            className={type === "bandpass" ? "textSelected" : "textContent"}
            value="bandpass"
            onClick={change}
          >
            Bandpass
          </button>
          <button
            id="type"
            className={type === "lowshelf" ? "textSelected" : "textContent"}
            value="lowshelf"
            onClick={change}
          >
            Lowshelf
          </button>
          <button
            id="type"
            className={type === "highshelf" ? "textSelected" : "textContent"}
            value="highshelf"
            onClick={change}
          >
            Highshelf
          </button>
          <button
            id="type"
            className={type === "peaking" ? "textSelected" : "textContent"}
            value="peaking"
            onClick={change}
          >
            Peaking
          </button>
          <button
            id="type"
            className={type === "notch" ? "textSelected" : "textContent"}
            value="notch"
            onClick={change}
          >
            Notch
          </button>
          <button
            id="type"
            className={type === "allpass" ? "textSelected" : "textContent"}
            value="allpass"
            onClick={change}
          >
            Allpass
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
