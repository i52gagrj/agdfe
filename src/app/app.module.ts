import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DocumentoComponent } from './components/documento.component';
import { DocumentoNewComponent } from './components/documento.new.component';
import { ModeloComponent } from './components/modelo.component';
import { MensajeComponent } from './components/mensaje.component';
import { MensajeNewComponent } from './components/mensaje.new.component';
import { DefaultComponent } from './components/default.component';
import { GenerateDatePipe } from './pipes/generate.date.pipe';

import { NgUploaderModule } from 'ngx-uploader';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterComponent,
    DefaultComponent,
    DocumentoComponent,
    DocumentoNewComponent,
    ModeloComponent,
    MensajeComponent,
    MensajeNewComponent,
    GenerateDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    routing,
    NgUploaderModule,
    FileUploadModule
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [ AppComponent ],
	exports: [ AppComponent ]
})
export class AppModule { }
