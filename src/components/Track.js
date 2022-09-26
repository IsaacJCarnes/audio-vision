import "../css/Track.css";

import React, { useContext, useEffect, useState } from "react";
import { CTX } from "../context/Store";

import { tone as toneArray, ToneAsList } from "../pages/HomePage/helper.js";

export default function Track() {
  const [appState, updateState] = useContext(CTX);
  const [currentNote, setCurrentNote] = useState({
    noteId: "",
    noteFreq: 440
  });
  const [trackNotes, setTrackNotes] = useState([]);
  const [selectedTrackNote, setSelectedTrackNote] = useState(null);

  const [lengthMultiplier, setLengthMultiplier] = useState(1);
  const [bpm, setBpm] = useState(240);
  const noteWidth = 7; //refers to view width

  let { frequency } = appState.osc1Settings;

  const TrackVisual = trackNotes.map(
    (element, index) => (
        <div
          className="trackNote"
          key={index}
          data-index={index}
          style={{
            left: (element.startPos + element.blankSpace) * noteWidth + "vw",
            width: element.noteLength * noteWidth + "vw",
          }}
        >
          {element.noteId}
        </div>
    )
  );

  const MoveTrackNote = (forward) => {
    let notes = [...trackNotes];
    if(forward){
      let first = notes[selectedTrackNote];
      let firstStartPos = first.startPos;
      let second = notes[selectedTrackNote + 1];
      first.startPos = second.startPos + (second.noteLength - first.noteLength);
      second.startPos = firstStartPos;
      notes[selectedTrackNote] = second;
      notes[selectedTrackNote + 1] = first;
      setSelectedTrackNote(selectedTrackNote+1);
    } else {
      let first = notes[selectedTrackNote];
      let firstStartPos = first.startPos;
      let second = notes[selectedTrackNote - 1];
      first.startPos = second.startPos;
      second.startPos = firstStartPos + (first.noteLength - second.noteLength);
      notes[selectedTrackNote] = second;
      notes[selectedTrackNote - 1] = first;
      setSelectedTrackNote(selectedTrackNote-1);
    }
    setTrackNotes(notes);
  }

  const RemoveLastNote = () => {
    let newTrack = [...trackNotes];
    newTrack.pop();
    setTrackNotes(newTrack);
  };

  const PlayNotes = () => {
    let noteLength = 60 / bpm;
    let notes = [...trackNotes];
    updateState({ type: "PLAY_OSC", payload: { notes, noteLength } });
  };

  useEffect(() => {
    setCurrentNote(
      ToneAsList().find(
        (note) => Math.floor(note.noteFreq) === Math.floor(frequency)
      )
    );
  }, [frequency]);

  return (
    <div className="track">
      <h2 className="textContent">Track</h2>
      <div className="ButtonHolder" id="LeftButtonHolder">
        <button
          className="active"
          onClick={(e) => {
            let lastNote = trackNotes[trackNotes.length - 1];
            let startPos = 0;
            if (lastNote) {
              startPos =
                Number(lastNote.startPos) +
                Number(lastNote.blankSpace) +
                Number(lastNote.noteLength);
            }
            setTrackNotes([
              ...trackNotes,
              {
                ...currentNote,
                noteLength: Number(lengthMultiplier),
                startPos: startPos,
                blankSpace: 0,
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
        <button
          disabled={trackNotes.length === 0}
          className={trackNotes.length > 0 ? "active" : "disabled"}
          onClick={(e) => {
            PlayNotes();
          }}
        >
          {">"}
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
      <div className="ButtonHolder" id="RightButtonHolder">
        <div className={selectedTrackNote !== null ? "active" : "disabled"}>
          <button className={selectedTrackNote > 0 ? "active" : "disabled"} onClick={(e) => MoveTrackNote(false)}>{"<"}</button>
          move note
          <button className={selectedTrackNote < trackNotes.length-1 ? "active" : "disabled"} onClick={(e) => MoveTrackNote(true)}>{">"}</button>
        </div>
      </div>
      <div className="trackVisual" onClick={(e) => {if(e.target.className === "trackNote"){setSelectedTrackNote(Number(e.target.dataset['index']))}}}>{TrackVisual}</div>
    </div>
  );
}
