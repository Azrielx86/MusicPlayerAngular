import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {
  audio: HTMLAudioElement | null = null;

  constructor() {}

  openAudio(path: string): void {
    if (!this.audio) this.audio = new Audio(path);
    else {
      this.audio.pause();
      this.audio = new Audio(path);
    }
  }

  playAudio(): void {
    if (!this.audio) return;
    this.audio.play();
  }
}
