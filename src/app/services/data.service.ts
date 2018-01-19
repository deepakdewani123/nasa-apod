import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";
// import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

interface DataResponse {
  title: string;
  explanation: string;
  date: string;
  copyright: string;
  url: string;
  hdurl: string;
}

@Injectable()
export class DataService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "https://api.nasa.gov/planetary/apod?";
  }

  getTodayData(highDefinition: boolean) {
    let url: string;
    if (highDefinition) {
      url =
        this.baseURL +
        `hd=${highDefinition}&api_key=FvuaAkgkbQNeHku21L2At5gpBmEm4hENxkNNNokg`;
    } else {
      url = this.baseURL + "api_key=FvuaAkgkbQNeHku21L2At5gpBmEm4hENxkNNNokg";
    }

    return this.http.get<DataResponse>(url).map(
      data => {
        // console.log(data.hdurl);
        console.log(data);
        return data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }

  getDataForDate(date: string) {}
}
