import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users = [];
  page = 1;
  count: Number;
  previous;
  page2;
  page3;
  pageNext;
  deleteTag;
  private getUsersUrl = "http://localhost:2000/sample/getAllUsers";
  private countUrl = "http://localhost:2000/sample/count";
  private deleteUsersUrl = "http://localhost:2000/sample/deleteOneUser";
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getCount();
    this.getAllUsers();
  }

  getCount() {
    this.http.get<any>(this.countUrl)
      .subscribe(
        res => {
          console.log(res);
          this.count = res.response;
        },
        err => {
          console.log(err);
        }
      )
  }

  pages(num) {
    if ((num - 1) * 5 > this.count) {
      return true;
    } else {
      return false;
    }
  }

  previousPage() {
    if (this.page == 1) {
      return true;
    } else {
      return false;
    }
  }

  nextPage() {
    if (this.count > this.page * 5) {
      return false;
    } else {
      return true;
    }
  }

  getAllUsers() {
    let obj = {
      num: this.page
    };
    this.http.post<any>(this.getUsersUrl, obj)
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

  delete(_id) {
    let obj = {
      _id: _id
    }
    this.http.post<any>(this.deleteUsersUrl, obj)
      .subscribe(
        res => {
          console.log(res);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(["/seeAll"]);
        },
        err => {
          console.log(err);
        }
      )
  }

  changePage(number) {
    console.log(number);

    if (number) {
      if (number > 3) {
        this.page++;
      } else if (number > 0) {
        this.page = number;
      }
      if (number <= 0) {
        console.log("number");
        this.page--;
      }
      this.getAllUsers();
    }
  }

}
