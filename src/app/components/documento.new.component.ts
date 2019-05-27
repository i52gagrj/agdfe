import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Documento } from '../models/documento';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';


@Component({
    selector: 'documento-new',
    templateUrl: '../views/documento.new.html',
    providers: [UserService, DocumentoService]
})
export class DocumentoNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public file: File;    
    public documento: Documento;
    public status_documento;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _documentoService: DocumentoService      
    ){
        this.page_title = 'Añadir un nuevo documento';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();
        //this.url = GLOBAL.url;
    }

    ngOnInit(){
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.documento = new Documento(1, "", "", "", this.identity.sub, "null");
        }   
        console.log('El componente documento.new.component ha sido cargado!!');     
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.file = fileList[0];            
        }
    }

    onSubmit(){
        this._documentoService.create(this.token, this.documento, this.file).subscribe(            
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                                                         
                    this.status_documento = response.status;
                    this.token = this._userService.setToken(response.token);                     
                    if(this.status_documento != 'success'){
                        this.status_documento = 'error';
                    }else{
                        this.documento = response.data;
                        this._router.navigate(['/documento']);
                    }     
                }               
            },
            error => {
                console.log(<any>error)                
            }
        );
    }
}    