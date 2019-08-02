import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    productName: "",
    cal: "",
    expiry: ""
  }
  private addUrl = "http://localhost:2000/sample/addCustomer";
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  addCustomer() {
    this.http.post<any>(this.addUrl, this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(["/seeAll"]);
        },
        err => {
          console.log(err);
        }
      )
  }

}
