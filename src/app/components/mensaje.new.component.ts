import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';

@Component({
    selector: 'mensaje-new',
    templateUrl: '../views/mensaje.new.html',
    providers: [UserService, MensajeService]
})
export class MensajeNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public mensaje: Mensaje;
    public status_mensaje;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _mensajeService: MensajeService        
    ){
        this.page_title = 'Enviar nuevo mensaje';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.mensaje = new Mensaje(1, null, this.identity.sub, this.identity.admin, false);
        }       
        console.log('El componente mensaje.new.component ha sido cargado!!');         
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
                        this._router.navigate(['/mensaje']);
                    }
                }                    
            },
            error => {
                console.log(<any>error)
            }
        );
    }
}