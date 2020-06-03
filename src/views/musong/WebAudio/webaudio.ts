import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import {OCTAVES, NOTES} from '@/constants/notes';

@Component({
  components: {
  },
})
export default class WebAudio extends Vue {
  private audioContext: any = new (window.AudioContext || (window as any).webkitAudioContext)();
  private oscList: any = [];
  private masterGainNode: any = null;

  private keyboard: any = null;
  private wavePicker: any = null;
  private volumeControl: any = null;

  private noteFreq: any[] = [];
  private customWaveform: any = null;
  private sineTerms: any = new Float32Array([0, 0, 1, 0, 1]);
  private cosineTerms: any = null;

  private volume: any = 1;
  private oscilatorType: any = 'sine';
  private oscilatorTypes: any = [
    'sine', 'square', 'sawtooth', 'triangle', 'custom',
  ];

  private octaves: any = OCTAVES;

  private created() {
    this.noteFreq = NOTES;

    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = this.volume;

    this.cosineTerms = new Float32Array(this.sineTerms.length);
    this.customWaveform = this.audioContext.createPeriodicWave(this.cosineTerms, this.sineTerms);

    NOTES.forEach((value, index, self) => {
      this.oscList[index] = {};
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          this.oscList[index][key] = {};
        }
      }
    });
  }

  @Emit()
  private playTone(freq: any) {

    const newGain = this.audioContext.createGain();
    newGain.connect(this.audioContext.destination);
    newGain.gain.value = this.volume;

    const osc = this.audioContext.createOscillator();
    osc.connect(newGain);

    if (this.oscilatorType === 'custom') {
      osc.setPeriodicWave(this.customWaveform);
    } else {
      osc.type = this.oscilatorType;
    }

    const now = this.audioContext.currentTime;
    newGain.gain.setValueAtTime(1, now);
    newGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.frequency.value = freq;
    osc.start();
    // osc.stop(now + 0.5);

    return {osc, now};
  }

  @Emit()
  private notePressed(frequency: any, note: any, octave: any) {
    // this.oscList[octave][note]['osc'] = this.playTone(frequency);
    if (!this.oscList[octave][note].pressed) {
      this.oscList[octave][note].osc = this.playTone(frequency);
      this.oscList[octave][note].pressed = true;
      this.oscList[octave][note].start = this.audioContext.currentTime;
    }
  }

  @Emit()
  private noteReleased(frequency: any, note: any, octave: any) {
    if (this.oscList[octave][note].pressed) {
      this.oscList[octave][note].osc.osc.stop(
        this.oscList[octave][note].osc.now + 0.5,
      );
      this.oscList[octave][note].pressed = false;
    }
  }

  @Emit()
  private changeVolume(event: any) {
    this.masterGainNode.gain.value = this.volume;
  }
}
