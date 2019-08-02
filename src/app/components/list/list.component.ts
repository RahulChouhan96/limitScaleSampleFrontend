import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users = [];
  private getUsersUrl = "http://localhost:2000/sample/getAllUsers";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get<any>(this.getUsersUrl)
      .subscribe(
        res => {
          console.log(res);
          this.users = res.response;
        },
        err => {
          console.log(err);
        }
      )
  }

}
