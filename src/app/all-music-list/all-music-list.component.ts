import { Component, OnInit } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { Song } from '../song.model';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-all-music-list',
  templateUrl: './all-music-list.component.html',
  styleUrls: ['./all-music-list.component.css'],
})
export class AllMusicListComponent implements OnInit {
  songlist: Song[] = [];
  path: string = '';
  data: any;

  constructor(private audioService: AudioService, private songListService: SongListService) {}

  ngOnInit(): void {
    this.audioService.data$.subscribe((res) => (this.data = res));
    this.songlist = this.songListService.songlist;
  }

  openAudioFile = (path: string, song: Song) => {
    this.audioService.openAudio(path);
    this.audioService.changeData(song);
    this.audioService.playAudio();
  };
}
