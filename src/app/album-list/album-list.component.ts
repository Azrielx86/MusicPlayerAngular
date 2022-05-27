import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Album } from '../album.model';
import { AudioService } from '../AudioService.service';
import { Song } from '../song.model';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  albumlist: Album[] = [];
  path: string = '';
  data: any;

  constructor(private audioService: AudioService, private songListService: SongListService) {}

  ngOnInit(): void {
    this.audioService.data$.subscribe((res) => (this.data = res));
    console.log(this.songListService.getAlbumList());

    this.albumlist = this.songListService.albumlist;

    // this.albumlist = this.songListService.getAlbumList();
  }

  openAudioFile = (path: string, song: Song) => {
    this.audioService.openAudio(path);
    this.audioService.changeData(song);
    this.audioService.playAudio();
  };
}
