import "../css/Track.css";

import React, { useContext, useEffect, useState } from "react";
import { CTX } from "../context/Store";

import { tone as toneArray, ToneAsList } from "../pages/HomePage/helper.js";

export default function Track() {
  const [appState, updateState] = useContext(CTX);
  const [noteList, setNoteList] = useState([]);
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
    setNoteList(ToneAsList());
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2 className="textContent">Track</h2>
        <button
          onClick={(e) => {
            setTrackNotes([
              ...trackNotes,
              {
                ...noteList.find(
                  (note) => Math.floor(note.noteFreq) === Math.floor(frequency)
                ),
                noteLength: lengthMultiplier,
              },
            ]);
          }}
        >
          Add Selected Note To Track
        </button>
        <button
          onClick={(e) => {
            RemoveLastNote();
          }}
        >
          Remove Last Note From Track
        </button>
      </div>
        <label className="textContent">
          Note Length:
          <input type="text" value={lengthMultiplier} onChange={(e) => setLengthMultiplier(e.target.value)} />
        </label>
      <div style={{ display: "flex", flexDirection: "row" }}>{TrackVisual}</div>
    </div>
  );
}
