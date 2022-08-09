import React, { useContext, useEffect, useState } from "react";
import { CTX } from "../context/Store";

import { Col, Row, Grid } from "react-flexbox-grid";

import { tone as toneArray, ToneAsList } from "../pages/HomePage/helper.js";

export default function NoteKeyboard() {
  const [appState, updateState] = useContext(CTX);
  const [noteList, setNoteList] = useState([]);
  const [minNote, setMinNote] = useState(0);
  const [maxNote, setMaxNote] = useState(99);

  let { frequency } = appState.osc1Settings;

  const change = (e) => {
    if (e.type === "click") {
      console.log("onclick");
      let { id, value } = e.target;
      updateState({ type: "CHANGE_OSC1", payload: { id, value } });
    } else if (e.type === "mousedown" || e.type === "touchstart") {
      console.log("mousedown");
      let { id, value, innerText } = e.target;

      updateState({ type: "MAKE_OSC", payload: { id, value, innerText } });
    } else if (e.type === "mouseup" || e.type === "touchend") {
      console.log("mouseup");
      let { id, value, innerText } = e.target;

      updateState({ type: "KILL_OSC", payload: { id, value, innerText } });
    } else {
      console.log("type " + e.type);
    }
  };

  const FrequencyOptions = () => {
    return (
      <div
        id="NoteContainer"

        //Disabled for now
        /*onClick={(e) => {
          if (e.target.type === "submit" || e.target.nodeName === "SPAN") {
            change(e);
          }
        }}*/
      >
        {noteList
          .filter((note, indexI) => minNote <= indexI && indexI <= maxNote)
          .map((note, indexJ) => (
            <button
              id="frequency"
              key={"note" + indexJ}
              onMouseUp={(e) => {
                change(e);
              }}
              onMouseDown={(e) => {
                change(e);
              }}
              onMouseLeave={(e) => {
                change(e);
              }}
              onTouchStart={(e) => {
                change(e);
              }}
              onTouchEnd={(e) => {
                change(e);
              }}
              className={
                Math.floor(frequency) === Math.floor(note.noteFreq)
                  ? "gridBtn textSelected"
                  : "gridBtn textContent"
              }
              value={note.noteFreq}
            >
              {note.noteId}
            </button>
          ))}
      </div>
    );
  };

  const RangeSlider = (isMin) => {
    if (isMin) {
      if(noteList.length < 1){
        return(<details className="rangeDetails">
          <summary>Min: </summary>
          <div>
          <input
            type="range"
            min="0"
            max="98"
            value={minNote}
            className="rangeSlider"
            onChange={(e) => setMinNote(e.target.value)}
          />
          </div>
        </details>);
      }
      return (
        <details className="rangeDetails">
          <summary>Min: {noteList[minNote].noteId}</summary>
          <div>
          <input
            type="range"
            min="0"
            max="98"
            value={minNote}
            className="rangeSlider"
            onChange={(e) => setMinNote(e.target.value)}
          />
          </div>
        </details>
      );
    } else {
      if(noteList.length < 1){
        return(<details className="rangeDetails">
          <summary>Max: </summary>
          <div>
          <input
            type="range"
            min="1"
            max="99"
            value={maxNote}
            className="rangeSlider"
            onChange={(e) => setMaxNote(e.target.value)}
          />
          </div>
        </details>);
      }
      return (
        <details className="rangeDetails">
          <summary>Max: {noteList[maxNote].noteId}</summary>
          <div>
          <input
            type="range"
            min="1"
            max="99"
            value={maxNote}
            className="rangeSlider"
            onChange={(e) => setMaxNote(e.target.value)}
          />
          </div>
        </details>
      );
    }
  };

  useEffect(() => {
    setNoteList(ToneAsList());
  }, []);

  return (
    <div
      id="NoteGrid"
      onContextMenu={() => {
        return false;
      }}
    >
      <h3 id="KeyboardTitle">Keyboard</h3>
      <div className="sliderHolder">
        {RangeSlider(true)}
        {RangeSlider(false)}
      </div>
      {FrequencyOptions()}
    </div>
  );
}
