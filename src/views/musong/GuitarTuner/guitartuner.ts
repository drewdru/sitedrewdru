import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import {OCTAVES, NOTES} from '@/constants/notes';

@Component({
  components: {
  },
})
export default class GuitarTuner extends Vue {
  private audioContext: any = new (window.AudioContext || (window as any).webkitAudioContext)();

  private noteFreq: any[] = [];
  private octaves: any = OCTAVES;

  private canvas: any = {};
  private canvasContext: any = {};
  private WIDTH: number = 0;
  private HEIGHT: number = 0;

  private analyser: any = undefined;
  private bufferLength: any = undefined;
  private dataArray: any = undefined;
  private source: any = undefined;
  private stream: any = undefined;
  private drawVisual: any = undefined;
  private distortion: any = undefined;
  private gainNode: any = undefined;
  private biquadFilter: any = undefined;
  private convolver: any = undefined;

  public async getAudioMedia() {
    const getUserMedia: any = (
      ((window as any).navigator as any).getUserMedia
      || ((window as any).navigator as any).webkitGetUserMedia
      || ((window as any).navigator as any).mozGetUserMedia
      || ((window as any).navigator as any).msGetUserMedia
    );
    if (!getUserMedia) {
      console.log('getUserMedia not supported on your browser!');
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({audio: true});
    } catch (error) {
      console.error('Error getting microphone', error);
      return;
    }
    this.source = this.audioContext.createMediaStreamSource(this.stream);

    this.source.connect(this.distortion);
    this.distortion.connect(this.biquadFilter);
    this.biquadFilter.connect(this.gainNode);
    // this.convolver.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.visualize();
  }
  public visualize() {
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    // this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawFrequencybars();
  }

  public drawFrequencybars() {
    this.drawVisual = requestAnimationFrame(this.drawFrequencybars.bind(this));
    this.analyser.getByteFrequencyData(this.dataArray);
    this.canvasContext.fillStyle = 'rgb(0, 0, 0)';
    this.canvasContext.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    const barWidth = (this.WIDTH / this.bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i];
      this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvasContext.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  }

  private mounted() {
    this.noteFreq = NOTES;

    this.canvas = (this.$refs.visualizer as any);
    this.canvasContext = this.canvas.getContext('2d');

    const intendedWidth = (this.$refs.guitartuner as any).clientWidth;
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    this.canvas.setAttribute('width', intendedWidth);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;

    this.distortion = this.audioContext.createWaveShaper();
    this.gainNode = this.audioContext.createGain();
    this.biquadFilter = this.audioContext.createBiquadFilter();
    this.convolver = this.audioContext.createConvolver();

    this.getAudioMedia();
  }
}
