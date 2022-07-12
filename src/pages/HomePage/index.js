import "./HomePage.css";

import { useState } from "react";
import { Col, Row, Grid } from 'react-flexbox-grid';

import { tone as toneArray } from "./helper.js";

export default function HomePage() {
  const [firstTime, setFirstTime] = useState(true);
  const [wave, setWave] = useState("sine");
  const [volume, setVolume] = useState(0);
  const [frequency, setFrequency] = useState(440);
  const noteTime = .25;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  var oscillator;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume * 0.01;

  gainNode.connect(audioContext.destination);


  /*document.addEventListener("click", () => audioContext.resume(), {
    once: true,
  });

  document.querySelector("#wave").addEventListener("change", (e) => {
    oscillator.type = e.target.value;
  });

  document.querySelector("#frequency").addEventListener("input", (e) => {
    oscillator.frequency.value = e.target.value;
  });

  document.querySelector("#volume").addEventListener("input", (e) => {
    gainNode.gain.value = volume * 0.01;
  });*/

  const playNote = (e, noteFreq = frequency) => {
    e.preventDefault();
    if(firstTime){
        setFirstTime(false);
        audioContext.resume();
    }

    oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.type = wave;
    oscillator.frequency.value = noteFreq; // value in hertz

    oscillator.start();
    //gainNode.gain.setTargetAtTime(0, audioContext.currentTime, audioContext.currentTime + noteTime - 0.03);
    oscillator.stop(audioContext.currentTime + noteTime);
  }

  /*const FrequencyOptions = () => {
    let noteLetters = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    let frequencies = [];
    for(let i = 0; i < toneArray['C'].length; i++){ //toneArray 'C' is equal for the max sublength of an array
        for(let j = 0; j < noteLetters.length; j++){
            if(i < toneArray[noteLetters[j]].length){
                frequencies.push(<option className="" key={noteLetters[j]+i} value={toneArray[noteLetters[j]][i]}>{noteLetters[j]+i}</option>);
            }
        }
    }
    return frequencies;
  }*/

  const FrequencyOptions = () => {
    let noteLetters = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    return(
        <Grid onClick={(e) => {if(e.target.type === "submit"){
            playNote(e, e.target.value);
            setFrequency(e.target.value);
        }}}>
            {noteLetters.map((note, indexI) => (
                <Row key={"row"+indexI}>
                    {toneArray[note].map((noteValue, indexJ) => (<Col sm={9} md={1} key={"row"+indexI+"col"+indexJ}><button className="textContent" value={noteValue}>{noteLetters[indexI]}<span>{indexJ}</span></button></Col>))}
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
/*
 <select id="freqSelect" className="textContent" defaultValue={frequency} onChange={(e) => setFrequency(e.target.value)}>
            {FrequencyOptions()}
      </select>
*/
