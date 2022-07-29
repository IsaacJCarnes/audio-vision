import React from "react";

let context = new AudioContext();
let destination = context.destination;

let osc1 = context.createOscillator();
let gain1 = context.createGain();
let filter = context.createBiquadFilter();

osc1.connect(gain1);
gain1.connect(filter);
filter.connect(destination);

const CTX = React.createContext();
export { CTX };

let firstTime = true;
const noteTime = 1; // seconds to milliseconds

export function reducer(state, action) {
    let { id, value } = action.payload || {};

  switch (action.type) {
    case "START_OSC":
        if(firstTime){
            osc1.start();
            firstTime = false;
        } else {
            gain1.gain.exponentialRampToValueAtTime(.8, context.currentTime);
        }
      return { ...state };
    case "STOP_OSC":
        gain1.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + noteTime - 0.04);
        //osc1.stop(context.currentTime + noteTime);
        return { ...state };
    case "CHANGE_OSC1":
      if (id === "type") {
        osc1.type = value;
      } else {
        osc1[id].value = value;
      }
      return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
    case "CHANGE_FILTER":
      if (id === "type") {
        filter.type = value;
      } else {
        filter[id].value = value;
      }
      return { ...state, filterSettings: { ...state.filterSettings, [id]: value } };
    default:
      console.log("reducer error. action: ", action);
      return { ...state };
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    osc1Settings: {
      frequency: osc1.frequency.value,
      detune: osc1.detune.value,
      type: osc1.type,
    },
    filterSettings: {
      frequency: filter.frequency.value,
      detune: filter.detune.value,
      Q: filter.Q.value,
      gain: filter.gain.value,
      type: filter.type,
    },
  });
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
