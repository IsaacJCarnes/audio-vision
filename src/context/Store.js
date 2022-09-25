import React from "react";
import Osc from "./Osc";

let context = new AudioContext();
let destination = context.destination;

let gain1 = context.createGain();
gain1.gain.value = 0.2;
let filter = context.createBiquadFilter();

gain1.connect(filter);
filter.connect(destination);

const CTX = React.createContext();
export { CTX };

let firstTime = true;
let isPlaying = false;
const noteTime = 1; // seconds to milliseconds

let nodes = [];

export function reducer(state, action) {
  let { id, value, innerText, notes, noteLength } = action.payload || {};

  switch (action.type) {
    case "PLAY_OSC":
      let firstStart = context.currentTime;
      let startTime =  context.currentTime;
      let noteLen = noteLength || 0.1;
     notes.forEach((note) => {
      let noteStart = startTime + note.startPos * noteLen;
      let lenMod = note.noteLength || 1;
      let tempOsc = new Osc(context, state.osc1Settings.type, note.noteFreq, state.osc1Settings.detune, state.envelope, gain1, noteStart);
      tempOsc.stop(noteStart + (noteLen*lenMod));

     })
     return { ...state };
    case "MAKE_OSC":
      const newOsc = new Osc(context, state.osc1Settings.type, value, state.osc1Settings.detune, state.envelope, gain1);
      nodes.push(newOsc);
      console.log("make osc, note and freq ", innerText, value, id);
      return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
    case "KILL_OSC":
      let newNodes = [];
      nodes.forEach((node) => {
        if (Math.round(node.osc.frequency.value) === Math.round(value)) {
          node.stop();
        } else {
          newNodes.push(node);
        }
      });
      nodes = newNodes;
      console.log("kill osc, note and freq ", innerText, value);
      return { ...state};
    case "CHANGE_OSC1":
      return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
    case "CHANGE_FILTER":
      if (id === "type") {
        filter.type = value;
      } else {
        filter[id].value = value;
      }
      return {
        ...state,
        filterSettings: { ...state.filterSettings, [id]: value },
      };
    case "CHANGE_ADSR":
        return {
          ...state,
          envelope: { ...state.envelope, [id]: Number(value) },
        };
    default:
      console.log("reducer error. action: ", action);
      return { ...state };
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    osc1Settings: {
      frequency: 440,
      detune: 0,
      type: "sine",
      bpm: 120,
    },
    filterSettings: {
      frequency: filter.frequency.value,
      detune: filter.detune.value,
      Q: filter.Q.value,
      gain: filter.gain.value,
      type: filter.type,
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain:0.6,
      release: 0.1,
    },
  });
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
