import { Song } from './song.model';

export class Album {
  constructor(public name: string, public artist: string, public songs: Song[], public coverBytes: string = '') {}
}
