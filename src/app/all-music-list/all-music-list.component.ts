import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/AudioService.service';
import { Song } from '../models/song.model';
import { SongListService } from '../services/songlistService.service';

@Component({
  selector: 'app-all-music-list',
  templateUrl: './all-music-list.component.html',
  styleUrls: ['./all-music-list.component.css'],
})
export class AllMusicListComponent implements OnInit {
  songlist: Song[] = [];
  path: string = '';
  data: any;

  constructor(private audioService: AudioService, private songListService: SongListService) {
    this.songlist = this.songListService.songlist;
  }

  ngOnInit(): void {
    this.audioService.data$.subscribe((res) => (this.data = res));
  }

  openAudioFile = (path: string, song: Song) => {
    this.audioService.openAudio(path);
    this.audioService.changeData(song);
    this.audioService.playAudio();
  };
}
