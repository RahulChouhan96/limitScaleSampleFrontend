import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  suggestions = [];
  completeSearch = [];
  key: String = "";
  searchUrl = `searchData/${this.key}`;
  searchQueryUrl = "http://localhost:2000/sample/search";
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  search() {
    let obj = {
      key: this.key
    };
    if (this.key != "")
    this.suggestions = [];
      this.http.post<any>(this.searchQueryUrl, obj)
        .subscribe(
          res => {
            console.log(res);
            res.response.forEach(ele => {
              this.suggestions.push(ele.fields[0]);
            });
            this.completeSearch = res.response;
            console.log("key is", this.key);
          },
          err => {
            console.log(err);
          }
        )
  }

  searchAll() {
    if (this.key != "") {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate([`/searchData/${this.key}`]);
    }
  }

}
