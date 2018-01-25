export class NasaData {
  title: string;
  explanation: string;
  date: string;
  copyright: string;
  url: string;
  hdurl: string;
  imageLoaded: boolean;
  isSaved: boolean;
  isFav: boolean;
  localUrl: string;
  localHDUrl: string;

  constructor(obj?: any) {
    this.title = (obj && obj.title) || "";
    this.explanation = (obj && obj.explanation) || "";
    this.date = (obj && obj.date) || "";
    this.copyright = (obj && obj.copyright) || "";
    this.url = (obj && obj.url) || "";
    this.localHDUrl = (obj && obj.localHDUrl) || "";
    this.hdurl = (obj && obj.hdurl) || "";
    this.imageLoaded = (obj && obj.imageLoaded) || false;
    this.isSaved = (obj && obj.isSaved) || false;
    this.isFav = (obj && obj.isFav) || false;
    this.localUrl = (obj && obj.localUrl) || "";
  }
}
