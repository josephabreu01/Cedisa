import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  constructor() {}

  estatus: boolean = false;

  vistaHome() {
    return this.estatus;
  }

  guardarVista(params: boolean) {
    this.estatus = params;
  }
}
