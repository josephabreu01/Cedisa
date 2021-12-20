import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-estudios-vista',
  templateUrl: './estudios-vista.component.html',
  styleUrls: ['./estudios-vista.component.scss']
})
export class EstudiosVistaComponent implements OnInit {

  constructor(
    private data : DataService,
    private rest : ResApiService
  ) { }

  estudios :any;
  pagina = 1;
  totalEstudios = 0;
  ngOnInit(): void {
    this.obtenerEstudios();
  }

  async obtenerEstudios(event?: any) {
    if (event) {
      this.estudios = null;
    }

    try {
      const data: any = await this.rest.get(`api/estudios/${this.pagina - 1}`);
      data['success']
        ? ((this.estudios = data['estudios']),
          (this.totalEstudios = data['totalEstudios']))
        : this.data.error('No se pudieron encontrar los Estudios');

      window.scroll(0, 0);
    } catch (error) {
      // this.data.error(error['message'])
    }
  }
}
