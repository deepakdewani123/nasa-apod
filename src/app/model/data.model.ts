export class NasaData {
  title: string;
  explanation: string;
  date: string;
  copyright: string;
  url: string;
  hdurl: string;
  imageLoaded: boolean;
  isSaved: boolean;
  localUrl: string;

  constructor(obj?: any) {
    this.title = (obj && obj.title) || "";
    this.explanation = (obj && obj.explanation) || "";
    this.date = (obj && obj.date) || "";
    this.copyright = (obj && obj.copyright) || "";
    this.url = (obj && obj.url) || "";
    this.hdurl = (obj && obj.hdurl) || "";
    this.imageLoaded = (obj && obj.imageLoaded) || false;
    this.isSaved = (obj && obj.isSaved) || false;
    this.localUrl = (obj && obj.localUrl) || "";
  }
}
