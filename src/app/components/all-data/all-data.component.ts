import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css']
})
export class AllDataComponent implements OnInit {
  user = {};
  _id: String = "";
  private getUserUrl = "http://localhost:2000/sample/getOneUser";
  constructor(private http: HttpClient, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getId();
    this.getOneUser();
  }

  getId() {
    this.acRoute.paramMap.subscribe(params => {
      this._id = params.get("_id");
    });
  }

  getOneUser() {
    let obj = {
      _id: this._id
    };
    this.http.post<any>(this.getUserUrl, obj)
      .subscribe(
        res => {
          console.log(res);
          this.user = res.response;
        },
        err => {
          console.log(err);
        }
      )
  }

}
