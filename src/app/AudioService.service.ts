import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {
  audio: HTMLAudioElement | null = null;
  playing: boolean = false;
  // intervalPlayer: any;

  constructor() {}

  openAudio(path: string): void {
    if (this.playing) {
      this.playing = false;
    }
    if (!this.audio) this.audio = new Audio(path);
    else {
      this.audio.pause();
      this.audio = new Audio(path);
    }
  }

  playAudio(): void {
    if (!this.audio) return;
    if (this.playing) return;
    this.audio.play();
    this.playing = true;
  }

  pauseAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.playing = false;
    }
  }

  playPauseAudio = () => {
    if (this.playing) {
      this.audio?.pause();
      this.playing = false;
    } else {
      this.audio?.play();
      this.playing = true;
    }
  };

  changeVolume(volume: number): void {
    if (this.audio) this.audio.volume = volume / 100;
  }

  changeAudioTime(time: number): void {
    if (this.audio) this.audio.currentTime = (time * this.audio.duration) / 100;
  }

  getCurrentTime = () => {
    return this.audio?.currentTime;
  };
}
