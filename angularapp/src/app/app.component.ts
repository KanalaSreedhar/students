import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import {
  AnimationDirection,
  AnimationType,
  PopupAnimation,
} from "@progress/kendo-angular-popup";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DataBindingDirective)
  dataBinding!: DataBindingDirective;
  public gridData: any[] = [];
  public gridView: any[] = [];
  httpClient: HttpClient;

  public mySelection: string[] = [];

  ngOnInit(): void {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    this.gridData = [
      {
        "name": "Alice",
        "age": 20,
        "hobies": ["reading", "swimming", "coding"]
      },
      {
        "name": "Bob",
        "age": 22,
        "hobies": ["painting", "dancing", "singing"]
      }
    ];
    this.httpClient.get<students[]>('http://localhost:7225/api/Student').subscribe((result: any) => {
      if(result && result.length) {
        this.gridData = result;
        this.gridView = this.gridData;
      }
    }, error => {
      console.error(error);
    });
  }

  constructor(http: HttpClient) {
    this.httpClient = http;
  }
  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "age",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "hobies",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}

interface students {
  name: string;
  age: number;
  hobies: string[];
}

