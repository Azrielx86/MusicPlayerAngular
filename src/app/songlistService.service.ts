import { Injectable } from '@angular/core';
import { Song } from './song.model';

@Injectable()
export class SongListService {
  songlist: Song[] = [];

  constructor() {}

  addSongs = (songlist: any[]): void => {
    songlist.forEach((song) => {
      if (!this.songlist.some((s) => s.name === song.name)) {
        this.songlist.push(new Song(song.name, song.meta, song.fullpath, song.coverURL));
      }
    });
  };

  getMetaSong = (path: string): any | undefined => {
    for (const value of this.songlist) {
      if (value.fullpath === path) {
        return value;
      }
    }
    return undefined;
  };

  sortedByAlbum = (): Song[] => {
    return this.songlist.sort((a, b) => a.album.localeCompare(b.album));
  };

  sortedByArtist = (): Song[] => {
    return this.songlist.sort((a, b) => a.artist.join(',').localeCompare(b.artist.join(',')));
  };

  sortedByTitle = (): Song[] => {
    return this.songlist.sort((a, b) => a.title.localeCompare(b.title));
  };

  getFromAlbum = (album: string): Song[] => {
    return this.songlist.filter((song) => song.album === album);
  };
}
