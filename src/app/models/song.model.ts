export class Song {
  public title: string = '';
  public album: string = '';
  public artist: string[] = [];
  public duration: number = 0;

  constructor(public name: string, public meta: any | undefined, public fullpath: string, public coverURL: string) {
    if (this.meta === undefined || this.meta === '') return;

    if (this.meta.common.title === undefined) this.title = this.name;
    else this.title = this.meta.common.title;

    if (this.meta.common.album === undefined) this.album = ' ';
    else this.album = this.meta.common.album;

    if (this.meta.common.artist === undefined) this.artist = [' '];
    else this.artist = this.meta.common.artist.split(',');

    this.duration = this.meta.format.duration;
  }
}
