import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ResApiService } from './res-api.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
message = '';
messagetype = 'danger';

user : any = {};  
estudios : any = [];

  constructor(private router: Router , private rest : ResApiService) {


    this.router.events.subscribe( event =>{

      if (event instanceof NavigationStart) {
        this.message = '';
      }

      
    })

   }


   error(message : any){
     this.messagetype = 'danger';
     this.message = message;
   }

   success(message : any){
    this.messagetype = 'success';
    this.message = message;
  }

  warning(message : any){
    this.messagetype = 'warning';
    this.message = message;
  }

  estudiosCita(estudio : any){
    this.estudios.push(estudio)

    return this.estudios;
  }

  async getProfile(){
    try {
        if(localStorage.getItem('token')){
          const data : any = await this.rest.get(
            'api/accounts/profile'
          );
          this.user = data['usuario'];
        }
    } catch (error) {
      this.error(error);
    }
  }
}
