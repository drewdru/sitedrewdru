import { Component, Emit, Prop, Vue } from 'vue-property-decorator';


@Component({
  components: {
  },
})
export default class WebAudio extends Vue {
  private audioContext: any = new (window.AudioContext || (<any> window).webkitAudioContext);
  private oscList: any = [];
  private masterGainNode: any = null;

  private keyboard: any = null;
  private wavePicker: any = null;
  private volumeControl: any = null;

  private noteFreq: Array<number> = [];
  private customWaveform: any = null;
  private sineTerms: any = new Float32Array([0, 0, 1, 0, 1]);
  private cosineTerms: any = null;

  private volume: any = 0.5;
  private oscilatorType: any = 'custom';
  private oscilatorTypes: any = [
    "sine", "square", "sawtooth", "triangle", "custom"
  ];


  private created() {
    this.noteFreq = this.createNoteTable();
   
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = this.volume;

    this.cosineTerms = new Float32Array(this.sineTerms.length);
    this.customWaveform = this.audioContext.createPeriodicWave(this.cosineTerms, this.sineTerms);
   
    for (let i=0; i<9; i++) {
      this.oscList[i] = {};
    }
    this.oscList[0]["A"] = {};
    this.oscList[0]["A#"] = {};
    this.oscList[0]["B"] = {};
    this.oscList[1]["C"] = {};
    this.oscList[1]["C#"] = {};
    this.oscList[1]["D"] = {};
    this.oscList[1]["D#"] = {};
    this.oscList[1]["E"] = {};
    this.oscList[1]["F"] = {};
    this.oscList[1]["F#"] = {};
    this.oscList[1]["G"] = {};
    this.oscList[1]["G#"] = {};
    this.oscList[1]["A"] = {};
    this.oscList[1]["A#"] = {};
    this.oscList[1]["B"] = {};
    this.oscList[7]["C"] = {};
    this.oscList[7]["C#"] = {};
    this.oscList[7]["D"] = {};
    this.oscList[7]["D#"] = {};
    this.oscList[7]["E"] = {};
    this.oscList[7]["F"] = {};
    this.oscList[7]["F#"] = {};
    this.oscList[7]["G"] = {};
    this.oscList[7]["G#"] = {};
    this.oscList[7]["A"] = {};
    this.oscList[7]["A#"] = {};
    this.oscList[7]["B"] = {};
    this.oscList[8]["C"] = {};
  }

  @Emit()
  private playTone(freq:any) {

    let newGain = this.audioContext.createGain();
    newGain.connect(this.audioContext.destination);
    newGain.gain.value = this.volume;

    let osc = this.audioContext.createOscillator();
    osc.connect(newGain);
   
    if (this.oscilatorType == "custom") {
      osc.setPeriodicWave(this.customWaveform);
    } else {
      osc.type = this.oscilatorType;
    }

    var now = this.audioContext.currentTime;
    newGain.gain.setValueAtTime(1, now);
    newGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.frequency.value = freq;
    osc.start();
    osc.stop(now+ 0.5);
   
    return osc;
  }

  @Emit()
  private notePressed(frequency:any, note:any, octave:any) {
    this.oscList[octave][note]["osc"] = this.playTone(frequency);
    // if (!this.oscList[octave][note]["pressed"]) {
    //   this.oscList[octave][note]["osc"] = this.playTone(frequency);
    //   this.oscList[octave][note]["pressed"] = true;
    //   this.oscList[octave][note]["start"] = this.audioContext.currentTime;
    // }
  }

  @Emit()
  private noteReleased(frequency:any, note:any, octave:any) {
    // if (this.oscList[octave][note]["pressed"]) {
    //   console.log(this.oscList[octave][note]["osc"])
    //   this.oscList[octave][note]["osc"].stop(
    //     this.oscList[octave][note]["start"] + 0.5
    //   );
    //   this.oscList[octave][note]["pressed"] = false;
    // }
  }

  @Emit()
  private changeVolume(event:any) {
    this.masterGainNode.gain.value = this.volume
  }

  @Emit()
  private createNoteTable() {
    let noteFreq: any = [];
    for (let i=0; i< 9; i++) {
      noteFreq[i] = {};
    }
  
    noteFreq[0]["A"] = 27.500000000000000;
    noteFreq[0]["A#"] = 29.135235094880619;
    noteFreq[0]["B"] = 30.867706328507756;  
    noteFreq[1]["C"] = 32.703195662574829;
    noteFreq[1]["C#"] = 34.647828872109012;
    noteFreq[1]["D"] = 36.708095989675945;
    noteFreq[1]["D#"] = 38.890872965260113;
    noteFreq[1]["E"] = 41.203444614108741;
    noteFreq[1]["F"] = 43.653528929125485;
    noteFreq[1]["F#"] = 46.249302838954299;
    noteFreq[1]["G"] = 48.999429497718661;
    noteFreq[1]["G#"] = 51.913087197493142;
    noteFreq[1]["A"] = 55.000000000000000;
    noteFreq[1]["A#"] = 58.270470189761239;
    noteFreq[1]["B"] = 61.735412657015513;
    noteFreq[7]["C"] = 2093.004522404789077;
    noteFreq[7]["C#"] = 2217.461047814976769;
    noteFreq[7]["D"] = 2349.318143339260482;
    noteFreq[7]["D#"] = 2489.015869776647285;
    noteFreq[7]["E"] = 2637.020455302959437;
    noteFreq[7]["F"] = 2793.825851464031075;
    noteFreq[7]["F#"] = 2959.955381693075191;
    noteFreq[7]["G"] = 3135.963487853994352;
    noteFreq[7]["G#"] = 3322.437580639561108;
    noteFreq[7]["A"] = 3520.000000000000000;
    noteFreq[7]["A#"] = 3729.310092144719331;
    noteFreq[7]["B"] = 3951.066410048992894;
    noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
  }
}
