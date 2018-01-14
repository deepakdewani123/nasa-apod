export class NasaData {
  title: string;
  explanation: string;
  date: string;
  copyright: string;
  url: string;
  hdurl: string;
  loaded: boolean;
  isHDImage: boolean;
  constructor(obj?: any) {
    this.title = (obj && obj.title) || "";
    this.explanation = (obj && obj.explanation) || "";
    this.date = (obj && obj.date) || "";
    this.copyright = (obj && obj.copyright) || "";
    this.url = (obj && obj.url) || "";
    this.hdurl = (obj && obj.hdurl) || "";
    this.loaded = (obj && obj.loaded) || false;
    this.isHDImage = (obj && obj.isHDImage) || false;
  }
}
