import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  userTypes: string[] = ['buyer', 'seller'];
  constructor(private _auth: AuthService, private _router: Router) { }
  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => { 
        console.log(res)
        localStorage.setItem('auth_token', res.auth_token);
        this._router.navigate(['/special'])
      },
      err => console.log(err)
      );
  }

}
