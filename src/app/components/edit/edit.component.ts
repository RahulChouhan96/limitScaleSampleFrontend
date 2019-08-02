import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    productName: "",
    cal: "",
    expiry: ""
  };
  _id: String = "";
  private editItUrl = "http://localhost:2000/sample/edit";
  private oneUserUrl = "http://localhost:2000/sample/getOneUser";
  constructor(private http: HttpClient, private router: Router, private acRoute: ActivatedRoute) { }

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
    }
    this.http.post<any>(this.oneUserUrl, obj)
      .subscribe(
        res => {
          console.log(res);
          this.user = res.response;
        },
        err => {
          console.log(err);
        }
      );
  }

  edit() {
    this.http.post<any>(this.editItUrl, this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(["/seeAll"]);
        },
        err => {
          console.log(err);
        }
      );
  }
}
