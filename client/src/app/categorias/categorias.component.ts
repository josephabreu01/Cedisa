import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: any
  newCategory = '';
  btnDisabled: boolean = false;
  administrador : any 
  constructor(public data: DataService, private rest: ResApiService) { }

  async ngOnInit() {
     this.administrador = this.data.user ? this.data.user.esAdministrador : false;
    try {
      const data: any = await this.rest.get(
        'http://localhost:3030/api/categorias'
      );

      data['success']
        ? (this.categorias = data['categorias'])
        : this.data.error(data['message']);

    } catch (error) {
      this.data.error(error['message'])
    }
  }

  async agregarCategoria() {
    this.btnDisabled = true;
    
    try {
      const data: any = await this.rest.post(
        'http://localhost:3030/api/categorias',
        { categoria: this.newCategory }
      )

      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message'])
    } catch (error) {
      this.data.error(error['message'])
    }
    this.btnDisabled = false;
    setTimeout(function () {
      location.reload(true)
    }, 2000)
    
  }
}
