import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generateDate'})
export class GenerateDatePipe implements PipeTransform{
	transform(value):string{		
		var a = new Date(value * 1000);
		var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();

		var hour = a.getHours();
		let hourfinal = hour.toString()
		if(hour <= 9){
			hourfinal = '0'+hour;
		} 
		var min = a.getMinutes();
		let minfinal = min.toString();
		if(min <= 9){
			minfinal = '0'+min; 
		} 
		var sec = a.getSeconds();
		let secfinal = sec.toString();
		if(sec <= 9){
			secfinal = '0'+sec;
		}
		var time = date + '-' + month + '-' + year + ' ' + hourfinal + ':' + minfinal + ':' + secfinal ;
		return time;
	}
}