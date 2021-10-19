import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email :string ='';
  contrasena : string ='';

  btnDisabled  = false;

  constructor(private router : Router , private data : DataService, private res : ResApiService)  { }

  ngOnInit(): void {
  }

  validate(){
    if (this.email) {
      if (this.contrasena) {
        return true;
      } else {
        return this.data.error('Password is not entered');
      }
    } else {
      return this.data.error('Email is not entered.');
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data : any = await this.res.post(
          'api/accounts/login',
          {
            email: this.email,
            contrasena: this.contrasena,
          },
        );
        
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message'] + data.data);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
