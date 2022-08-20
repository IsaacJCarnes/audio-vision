import "../css/Track.css";

import React, { useContext, useEffect, useState } from "react";
import { CTX } from "../context/Store";

import { tone as toneArray, ToneAsList } from "../pages/HomePage/helper.js";

export default function Track() {
  const [appState, updateState] = useContext(CTX);
  const [currentNote, setCurrentNote] = useState({ noteId: "", noteFreq: 440 });
  const [trackNotes, setTrackNotes] = useState([]);

  const [lengthMultiplier, setLengthMultiplier] = useState(1);
  const noteWidth = 7; //refers to view width

  let { frequency } = appState.osc1Settings;

  const TrackVisual = trackNotes.map((element, index) => (
    <div
      className="trackNote textContent"
      key={index}
      style={{ width: element.noteLength * noteWidth + "vw" }}
    >
      {element.noteId}
    </div>
  ));

  const RemoveLastNote = () => {
    let newTrack = [...trackNotes];
    newTrack.pop();
    setTrackNotes(newTrack);
  };

  useEffect(() => {
    setCurrentNote(
      ToneAsList().find(
        (note) => Math.floor(note.noteFreq) === Math.floor(frequency)
      )
    );
  }, [frequency]);

  return (
    <div>
      <h2 className="textContent">Track</h2>
      <div id="ButtonHolder">
        <button
          className="active"
          onClick={(e) => {
            setTrackNotes([
              ...trackNotes,
              {
                ...currentNote,
                noteLength: lengthMultiplier,
              },
            ]);
          }}
        >
          Add {currentNote.noteId}
        </button>
        <button
          disabled={trackNotes.length === 0}
          className={trackNotes.length > 0 ? "active" : "disabled"}
          onClick={(e) => {
            RemoveLastNote();
          }}
        >
          Remove Last Note
        </button>
        <label className="textContent">
          Note Length:
          <input
            type="text"
            value={lengthMultiplier}
            onChange={(e) => setLengthMultiplier(e.target.value)}
          />
        </label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>{TrackVisual}</div>
    </div>
  );
}
