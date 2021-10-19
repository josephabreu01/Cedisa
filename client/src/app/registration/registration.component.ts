import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';


import {DataService} from '../data.service'
import { Router } from '@angular/router';
import { ResApiService } from '../res-api.service';
import { tokenName } from '@angular/compiler';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  email :string = '';
  nombre : string = '';
  contrasena : string ='';
  contrsena1 : string = '';
  esAdministrador : boolean = false;

  btnDisabled = false; 


  constructor( private router: Router, public data :DataService , private res: ResApiService) { }

  ngOnInit(): void {
  }

  validate(){
    
    return(!this.nombre || !this.email || !this.contrsena1 || !this.contrasena)? this.data.error('Llene todos los campos correctamente')  : true ;
  }

  async register(){
    this.btnDisabled = true;
    try {
      if (this.validate()){
        const data : any = await this.res.post(
          'api/accounts/signup',
          {
             nombre:this.nombre,
             email: this.email,
             contrasena:this.contrasena,
             esAdministrador : this.esAdministrador
          }
        );

        if (data['success']) {        
          localStorage.setItem('token', data['token'] );
          this.data.success('Registration successful!');
          await this.data.getProfile(); 
        } else {
          this.data.error(data['message']);
        }
      }
      
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = true;
  }
}
