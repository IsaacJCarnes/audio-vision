import React from "react";
import { Col, Row, Grid } from "react-flexbox-grid";

import { tone as toneArray } from "../pages/HomePage/helper.js";

const Osc1 = ({ change, settings }) => {
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
    return (
      <Grid id="NoteContainer"
        onClick={(e) => {
          if (e.target.type === "submit" || e.target.nodeName === "SPAN") {
            change(e);
          }
        }}
      >
        {noteLetters.map((note, indexI) => (
          <Row key={"row" + indexI}>
            {toneArray[note].map((noteValue, indexJ) => (
              <Col key={"row" + indexI + "col" + indexJ}>
                <button
                  id="frequency"
                  className={
                    Math.floor(settings.frequency) === Math.floor(noteValue)
                      ? "textSelected"
                      : "textContent"
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
    <div>
      <div className="param">
        <h3>Note</h3>
        {FrequencyOptions()}
      </div>
      <div className="param">
        <h3>Detune</h3>
        <input
          value={settings.detune}
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
          className={settings.type === "sine" ? "textSelected" : "textContent"}
          value="sine"
          onClick={change}
        >
          Sine
        </button>
        <button
          id="type"
          className={
            settings.type === "triangle" ? "textSelected" : "textContent"
          }
          value="triangle"
          onClick={change}
        >
          Triangle
        </button>
        <button
          id="type"
          className={
            settings.type === "square" ? "textSelected" : "textContent"
          }
          value="square"
          onClick={change}
        >
          Square
        </button>
        <button
          id="type"
          className={
            settings.type === "sawtooth" ? "textSelected" : "textContent"
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
