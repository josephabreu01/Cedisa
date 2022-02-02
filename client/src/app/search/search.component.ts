import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pagina = 1;

  contenido : any;
  estudios : any;
  existe = true;

  query = '';
  constructor(
    private data : DataService,
    private rest : ResApiService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.query = res['query']
      this.pagina = 1;
      this.getEstudios();

    })
  }

  get lower() {
    return 1 + this.contenido.hitsPerPage * this.contenido.page;
  }

  get upper() {
    return Math.min(
      this.contenido.hitsPerPage * (this.contenido.page + 1),
      this.contenido.nbHits,
    );
  }

  async getEstudios(){
    try {
      const data : any = await this.rest.get(
        `api/search?query=${this.query}&page=${this.pagina- 1 }`
      )
      data['success']
      ?(this.contenido = data['content'])
      :this.data.error('No se pudieron encontrar los Estudios')
      this.existe =  this.contenido.length ? true : false;
      window.scroll(0,0);
    } catch (error) {
      this.data.error(error['message'])
    }
  }

}
