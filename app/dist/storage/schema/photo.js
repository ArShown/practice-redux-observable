/* @flow */
export default class Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor() {
    this.albumId = 0;
    this.id = 0;
    this.title = '';
    this.url = '';
    this.thumbnailUrl = '';
  }
}
