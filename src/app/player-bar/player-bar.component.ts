import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../AudioService.service';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css'],
})
export class PlayerBarComponent implements OnInit, OnDestroy {
  progressBar: number = 0;
  // TODO: get from save file
  volume: number = 100;
  updateEventsInterval: any;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.updateEventsInterval = setInterval(() => {
      this.updateEvents();
      // console.log(this.progressBar);
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateEventsInterval);
  }

  changeVolume = () => {
    this.audioService.changeVolume(this.volume);
  };

  changeAudioTime = () => {
    this.audioService.changeAudioTime(this.progressBar);
  };

  playPauseAudio = () => {
    this.audioService.playPauseAudio();
  };

  updateEvents = () => {
    if (this.audioService.audio)
      this.progressBar =
        (this.audioService.audio.currentTime * 100) / this.audioService.audio.duration;
  };
}
