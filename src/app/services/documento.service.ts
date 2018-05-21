import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class DocumentoService{
	public url: string;
	//public identity;
	//public token;
	
	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

    create(token, documento, file) {
		let json = JSON.stringify(documento);

		const formData = new FormData;		
		formData.append('authorization', token);
		formData.append('json', json);
		formData.append('file', file);
				
		return this._http.post(this.url+'/documento/new', formData).map(res => res.json());
	}	
	
	getDocumentos(token, page = null){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/documento/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }	
	
	//Version para admin
	/*getDocumentos(token, id, page = null){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/documento/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }*/

    getDocumento(token, id){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		
		return this._http.post(this.url+'/documento/returnone', params, {responseType: ResponseContentType.Blob, headers: headers}).map(res => res.json());
	}
	
	borrarDocumento(token, id){        
        let params = "authorization="+token+"&id="+id;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this._http.post(this.url+'/documento/delete', params, {headers: headers}).map(res => res.json());
    }
}
	