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
    public mensaje: Mensaje;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;
    public status_mensaje;

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
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.mensaje = new Mensaje(1, null, this.identity.sub, this.identity.admin, false);
        }             
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
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }   
    
    onSubmit(){        
        this._mensajeService.create(this.token, this.mensaje).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                   
                    this.token = this._userService.setToken(response.token);              
                    this.status_mensaje = response.status;                    
                    if(this.status_mensaje != 'success'){
                        this.status_mensaje = 'error';
                    }else{
                        this.mensaje = response.data;
                        location.reload(true);
                    }
                }                    
            },
            error => {
                console.log(<any>error)
            }
        );
    }    
}	