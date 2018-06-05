import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';
import { DataTableModule } from 'angular2-datatable';

@Component({
	selector: 'mensaje',
	templateUrl: '../views/mensaje.html',
	providers: [UserService, MensajeService]
})
export class MensajeComponent implements OnInit{
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";
    
    public title: string;
    public identity;
    public token;
    public mensajes: Array<Mensaje>;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _mensajeService: MensajeService
	){
		this.title = 'Mensajes';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  

	}

	ngOnInit(){
        console.log('El componente mensaje.component ha sido cargado!!');        
        this.mostrarNuevosMensajes();        
	}

	mostrarNuevosMensajes(){          
        this.loading = 'show';            
        this._mensajeService.getMensajes(this.token).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                     
                    this.mensajes = response.data;
                    this.token = this._userService.setToken(response.token);                 
                    this.loading = 'hide';

                    // Total paginas
                    /*this.pages = [];
                    for(let i = 0; i < response.total_pages; i++){
                        this.pages.push(i);                        
                    }

                    // Pagina anterior
                    if(page >= 2){
                        this.pagePrev = (page - 1);
                    }else{
                        this.pagePrev = page;                        
                    }  

                    // Pagina siguiente
                    if(page < response.total_pages){
                        this.pageNext = (page+1);
                    }else{
                        this.pageNext = page;
                    }*/
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }    
}	