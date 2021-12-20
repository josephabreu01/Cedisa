import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ResApiService } from './res-api.service';
import { MessageComponent } from './message/message.component';
import { DataService } from './data.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PostProductComponent } from './post-product/post-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EstudioComponent } from './estudio/estudio.component';
import { SearchComponent } from './search/search.component';

import {MyFilterPipe} from './pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {DragDropModule ,CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';
import {MatIconModule} from'@angular/material/icon';
import { PreCitaComponent } from './pre-cita/pre-cita.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MantenimientoAvisosComponent } from './mantenimiento-avisos/mantenimiento-avisos.component';
import { MantenimientopreguntasComponent } from './mantenimientopreguntas/mantenimientopreguntas.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { InformacionSucursalesComponent } from './informacion-sucursales/informacion-sucursales.component';
import { ExtensionesMantenimientoComponent } from './extensiones-mantenimiento/extensiones-mantenimiento.component';
import { InformacionSucursalesMantenimientoComponent } from './informacion-sucursales-mantenimiento/informacion-sucursales-mantenimiento.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { NbThemeModule, NbLayoutModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EstudiosVistaComponent } from './estudios-vista/estudios-vista.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    CategoriasComponent,
    PostProductComponent,
    MyProductsComponent,
    CategoriaComponent,
    EstudioComponent,
    SearchComponent,
    MyFilterPipe,
    PreCitaComponent,
    MantenimientoAvisosComponent,
    MantenimientopreguntasComponent,
    ExtensionesComponent,
    InformacionSucursalesComponent,
    ExtensionesMantenimientoComponent,
    InformacionSucursalesMantenimientoComponent,
    PreguntasComponent,
    EstudiosVistaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    DragDropModule,
    MatTabsModule,
    CdkAccordionModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    
    

  ],
  providers: [ ResApiService,DataService,AuthGuardService,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
