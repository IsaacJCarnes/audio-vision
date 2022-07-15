import "./HomePage.css";
import Audio from './Audio.js';

import { useState } from "react";
import { Col, Row, Grid } from 'react-flexbox-grid';

import { tone as toneArray } from "./helper.js";

export default function HomePage() {
  const [firstTime, setFirstTime] = useState(true);
  const [wave, setWave] = useState("sine");
  const [volume, setVolume] = useState(0);
  const [frequency, setFrequency] = useState(440);
  const [oscillatorNodes, setOscillatorNodes] = useState([]);
  const noteTime = .25;

  var oscillator;


  const playNote = (e, noteFreq = frequency) => {
    e.preventDefault();
    if(firstTime){
        setFirstTime(false);
        Audio.masterGainNode.connect(Audio.context.destination);
        Audio.masterGainNode.gain.linearRampToValueAtTime(0, Audio.context.currentTime);
        Audio.context.resume();
    }

    oscillator = Audio.context.createOscillator();
    oscillator.connect(Audio.context.destination);
    oscillator.type = wave;
    oscillator.frequency.value = Math.round(noteFreq*10)/10; // value in hertz

    oscillator.start();
    Audio.masterGainNode.gain.exponentialRampToValueAtTime(0.01, Audio.context.currentTime + noteTime - 0.03);
    oscillator.stop(Audio.context.currentTime + noteTime);
  }

  const FrequencyOptions = () => {
    let noteLetters = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    return(
        <Grid onClick={(e) => {if(e.target.type === "submit" || e.target.nodeName === "SPAN"){
            playNote(e, e.target.value);
            setFrequency(e.target.value);
        }}}>
            {noteLetters.map((note, indexI) => (
                <Row key={"row"+indexI}>
                    {toneArray[note].map((noteValue, indexJ) => (<Col sm={9} md={1} key={"row"+indexI+"col"+indexJ}><button className="textContent" value={noteValue}>{noteLetters[indexI]}<span value={noteValue}>{indexJ}</span></button></Col>))}
                </Row>
            ))}
        </Grid>
    )
  }



  return (
    <div className="">
        <button className="textContent" id="play" onClick={(e) => playNote(e)}>{'>'}</button>
      <select className="textContent" id="wave" onChange={(e) => setWave(e.target.value)}>
        <option value="sine">sine</option>
        <option value="triangle">triangle</option>
        <option value="square">square</option>
        <option value="sawtooth">sawtooth</option>
      </select>
      {FrequencyOptions()}

     
      <input id="volume" type="range" min="0" max="10" value={volume} onChange={(e) => setVolume(e.target.value)}/>
    </div>
  );
}
