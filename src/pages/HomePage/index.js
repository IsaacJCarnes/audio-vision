import "./HomePage.css";

import { useState } from "react";

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

  const playNote = (e) => {
    e.preventDefault();
    if(firstTime){
        setFirstTime(false);
        audioContext.resume();
    }

    oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.type = wave;
    oscillator.frequency.value = frequency; // value in hertz

    oscillator.start();
    oscillator.stop(audioContext.currentTime + noteTime);
  }

  const FrequencyOptions = () => {
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
      <select id="freqSelect" className="textContent" defaultValue={frequency} onChange={(e) => setFrequency(e.target.value)}>
            {FrequencyOptions()}
      </select>
      <input id="volume" type="range" min="0" max="10" value={volume} onChange={(e) => setVolume(e.target.value)}/>
    </div>
  );
}
