import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _registerUrl = "http://localhost:3000/api/register";
	private _loginUrl = "http://localhost:3000/api/login";
	constructor(private http: HttpClient, private _router: Router) { }

	registerUser(user) {
		return this.http.post<any>(this._registerUrl, user)
	}

	loginUser(user) {
		return this.http.post<any>(this._loginUrl, user)
	}

	loggedIn() {
		return !!localStorage.getItem('auth_token')
	}

	getToken() {
		return localStorage.getItem('auth_token')
	}

	logoutUser() {
		localStorage.removeItem('auth_token')
		this._router.navigate(['/events'])
	}
}
