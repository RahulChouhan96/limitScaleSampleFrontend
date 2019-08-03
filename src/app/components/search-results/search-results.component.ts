import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  users = [];
  key: String = "";
  searchQueryUrl = "http://localhost:2000/sample/search";
  constructor(private http: HttpClient, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSearchKey();
    this.getSearchUsers();
  }

  getSearchKey() {
    this.acRoute.paramMap.subscribe(params => {
      this.key = params.get("key");
    });
  }

  getSearchUsers() {
    let obj = {
      key: this.key
    }
    this.http.post<any>(this.searchQueryUrl, obj)
      .subscribe(
        res => {
          console.log(res);
          res.response.forEach(ele => {
            this.users.push(ele.detail);
          });
        },
        err => {
          console.log(err);
        }
      )
  }

}
