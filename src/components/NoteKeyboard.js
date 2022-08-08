import React, { useContext } from "react";
import { CTX } from "../context/Store";

import { Col, Row, Grid } from "react-flexbox-grid";

import { tone as toneArray, ToneAsList } from "../pages/HomePage/helper.js";

export default function NoteKeyboard() {
  const [appState, updateState] = useContext(CTX);
  let { frequency } = appState.osc1Settings;
  let minimumFreq = 261; //C5
  let maximumFreq = 494; //B5

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
    let noteLetters = [
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
      "A",
      "Bb",
      "B",
    ];
    let list = ToneAsList();

    return (
      <Grid
        id="NoteContainer"

        //Disabled for now
        /*onClick={(e) => {
          if (e.target.type === "submit" || e.target.nodeName === "SPAN") {
            change(e);
          }
        }}*/
      >
        {noteLetters.map((note, indexI) => (
          <Row key={"row" + indexI}>
            {toneArray[note].filter(freq => minimumFreq <= freq && freq <= maximumFreq).map((noteValue, indexJ) => (
              <Col key={"row" + indexI + "col" + indexJ}>
                <button
                  id="frequency"
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
                    Math.floor(frequency) === Math.floor(noteValue)
                      ? "gridBtn textSelected"
                      : "gridBtn textContent"
                  }
                  value={noteValue}
                >
                  {noteLetters[indexI]}
                  <span id="frequency" value={noteValue}>
                    {indexJ}
                  </span>
                </button>
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    );
  };

  return (
    <div
      id="NoteGrid"
      onContextMenu={() => {
        return false;
      }}
    >
      <h3>Keyboard</h3>
      {FrequencyOptions()}
    </div>
  );
}
