import { Song } from './song.model';

export class Album {
  constructor(public name: string, public songs: Song[], public coverURL: string = '') {}
}
