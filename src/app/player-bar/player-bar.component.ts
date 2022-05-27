import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { Song } from '../song.model';

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
  data: Song | undefined;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.data$.subscribe(res => this.data = res);
    this.updateEventsInterval = setInterval(() => {
      this.updateEvents();
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
    if (this.audioService.audio) {
      this.progressBar =
        (this.audioService.audio.currentTime * 100) / this.audioService.audio.duration;
    }
  };
}
