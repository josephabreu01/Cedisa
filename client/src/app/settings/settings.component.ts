import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  
  constructor(public data: DataService, private rest: ResApiService) { }

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }

      this.currentSettings = Object.assign({
        newPwd: '',
        pwdConfirm: ''
      }, this.data.user)
    } catch (error) { 
      this.data.error(error)
    }

    
  }

  validate(settings: any) {

    if (settings['nombre']) {
      if (settings['email']) {
        if (settings['newPwd']) {
          if (settings['pwdConfirm']) {
            if (settings['newPwd'] === settings['pwdConfirm']) {
              return true;
            } else {
              this.data.error('Las constrasenas no coinciden');
            }
          } else {
            this.data.error('Por favor confirme la contrasena');
          }
        } else {
          if (!settings['pwdConfirm']) {
            return true;
          } else {
            this.data.error('Por favor introdusca una nueva contrasena.');
          }
        }
      } else {
       return this.data.error('Escriba su email.');
      }
    } else {
     return this.data.error('Escriba su nombre.');
    }
  }

  async update(){
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)){
        const data : any = await this.rest.post(
          'http://localhost:3030/api/accounts/profile',
          {
            nombre: this.currentSettings['nombre'],
            email:this.currentSettings['email'],
            contrasena: this.currentSettings['newPwd'],
            esAdministrador: this.currentSettings['esAdministrador']
          }
        );
        data['success']
        ? (this.data.getProfile(), this.data.success(data['message']))
        : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message'])
    }
    this.btnDisabled = false;
  }

}
