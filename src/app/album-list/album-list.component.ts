import { Component, OnInit } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  songlist: any[] = [];
  path: string = '';

  constructor(private audioService: AudioService, private songListService: SongListService) {}

  ngOnInit(): void {
    console.log('Album page');

    this.songlist = this.songListService.sortedByAlbum();
  }

  openAudioFile = (path: string) => {
    this.audioService.openAudio(path);
    this.audioService.playAudio();
  };
}
