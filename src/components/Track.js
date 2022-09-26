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
    if(forward){ //forward works
      if(selectedTrackNote < notes.length-1){ //If not last element in list, switch with last
      let first = notes[selectedTrackNote];
      let second = notes[selectedTrackNote + 1];
        if(second.startPos+second.blankSpace >= first.startPos+first.blankSpace+first.noteLength+1){
          first.blankSpace += 1;
        } else {
          let firstStartPos = first.startPos;
          let firstBlankSpace = first.blankSpace;
          first.startPos = second.startPos;
          second.startPos = firstStartPos;
          if(second.noteLength > first.noteLength){
            first.blankSpace = second.blankSpace + (second.noteLength-first.noteLength);
            second.blankSpace = firstBlankSpace;
          } else if (second.noteLength < first.noteLength){
            first.blankSpace = second.blankSpace - (first.noteLength-second.noteLength);
            second.blankSpace = firstBlankSpace;
          } else {
            first.blankSpace = second.blankSpace;
            second.blankSpace = firstBlankSpace;
          }
          notes[selectedTrackNote] = second;
          notes[selectedTrackNote + 1] = first;
          setSelectedTrackNote(selectedTrackNote+1);
        }
      }
      else{
        notes[selectedTrackNote].blankSpace += 1;
      }
    } else { //Works when same size
      if(notes[selectedTrackNote].startPos > 0){
        let first = notes[selectedTrackNote];
        let second = notes[selectedTrackNote-1];
        if(second.startPos + second.blankSpace + second.noteLength < first.startPos + first.blankSpace){
          first.blankSpace-=1;
        } else {
          let firstStartPos = first.startPos;
          let firstBlankSpace = first.blankSpace;
          first.startPos = second.startPos;
          second.startPos = firstStartPos;
          if(second.noteLength > first.noteLength){
            first.blankSpace = second.blankSpace + (second.noteLength-first.noteLength) - (second.noteLength-first.noteLength);
            second.blankSpace = firstBlankSpace - (second.noteLength-first.noteLength);
          } else if (second.noteLength < first.noteLength){
            first.blankSpace = second.blankSpace;
            second.blankSpace = firstBlankSpace + (first.noteLength-second.noteLength);
          } else {
            first.blankSpace = second.blankSpace;
            second.blankSpace = firstBlankSpace;
          }
          notes[selectedTrackNote] = second;
          notes[selectedTrackNote - 1] = first;
          setSelectedTrackNote(selectedTrackNote-1);
        }
      } else {
        if(notes[0].blankSpace > 0){
          notes[selectedTrackNote].blankSpace -= 1;
        }
      }
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
            let blankSpace= 0;
            if (lastNote) {
              startPos =
                Number(lastNote.startPos) +
                1;
              blankSpace = Number(lastNote.noteLength) + Number(lastNote.blankSpace) - 1;
            }
            setTrackNotes([
              ...trackNotes,
              {
                ...currentNote,
                noteLength: Number(lengthMultiplier),
                startPos: startPos,
                blankSpace: blankSpace,
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
          <button onClick={(e) => MoveTrackNote(false)}>{"<"}</button>
          move note
          <button onClick={(e) => MoveTrackNote(true)}>{">"}</button>
        </div>
      </div>
      <div className="trackVisual" onClick={(e) => {if(e.target.className === "trackNote"){setSelectedTrackNote(Number(e.target.dataset['index']))}}}>{TrackVisual}</div>
    </div>
  );
}
