import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

 	constructor() { }
	
	readonly apiUrl: string = "http://localhost:3000/api/";
}
