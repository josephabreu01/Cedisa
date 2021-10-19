import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categoriaId: any;
  categoria: any;
  pagina = 1;
  constructor(
    public data: DataService,
    private activatedRoute: ActivatedRoute,
    private rest: ResApiService,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(res => {
      this.categoriaId = res['id'];
      this.getEstudios();
    })
  }

  get lower() {
    return 10 * (this.pagina - 1) + 1;
  }

  get upper() {
    return Math.min(10 * this.pagina, this.categoria.totalEstudios);
  }

  async getEstudios(event?: any) {
    if (event) {
      this.categoria = null;
    }

    try {
      const data: any = await this.rest.get(
        `http://localhost:3030/api/categorias/${this.categoriaId}?pagina=${this.pagina - 1}`
      );

      data['success']
        ? (this.categoria = data)
        : this.data.error(data['message']);


    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
