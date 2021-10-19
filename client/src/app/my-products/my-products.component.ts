import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  estudios: any;

  constructor(public data: DataService, private rest: ResApiService) { }

  async ngOnInit() {
    try {
      const data: any = await this.rest.get(
        'api/administrador/estudios'
      );

      data['success']
        ? (this.estudios = data['estudios'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
