import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Album } from '../models/album.model';
import { AudioService } from '../services/AudioService.service';
import { Song } from '../models/song.model';
import { SongListService } from '../services/songlistService.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  albumlist: Album[] = [];
  path: string = '';
  data: any;

  constructor(private audioService: AudioService, private songListService: SongListService) {
    this.albumlist = this.songListService.albumlist;
  }

  ngOnInit(): void {
    this.audioService.data$.subscribe((res) => (this.data = res));
  }
}
