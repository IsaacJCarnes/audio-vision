export default class Osc {
    constructor(actx, type, frequency, detune, envelope, connection, startTime){
        this.actx = actx;
        this.envelope = envelope || {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.6,
            release: 0.1,
        };
        this.osc = actx.createOscillator();
        this.osc.frequency.value = frequency;
        this.osc.detune.value = detune;
        this.osc.type = type;
        this.gateGain = actx.createGain();
        this.gateGain.gain.value = 0;
        this.osc.connect(this.gateGain);
        this.gateGain.connect(connection);
        this.easing = 0.005;
        this.startTime = startTime || this.actx.currentTime;
        this.osc.start();
        this.start(startTime);
    }

    start(currentTime = this.actx.currentTime){
        console.log(currentTime);
        this.gateGain.gain.cancelScheduledValues(currentTime);
        this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
        this.gateGain.gain.linearRampToValueAtTime(1, currentTime + this.envelope.attack + this.easing);
        this.gateGain.gain.linearRampToValueAtTime(this.envelope.sustain, currentTime + this.envelope.attack + this.envelope.decay + this.easing);
    }

    stop( endTime = this.actx.currentTime){
        this.gateGain.gain.cancelScheduledValues(endTime);
        this.gateGain.gain.setTargetAtTime(0, endTime, this.envelope.release + this.easing);
        setTimeout(() => {
            this.osc.disconnect();
        }, 10000);
    }
}