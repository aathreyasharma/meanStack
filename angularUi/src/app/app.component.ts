import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'E-Comm OpenSource';
	totalItems = 0;
	totalUnits = 0;
	cart = [];
	tempVar:string;
	constructor(private _authService: AuthService, private cartService: CartService, private msg : MsgServiceService){}
	ngOnInit() {
		this.cartService.cast
		.subscribe(
			cartDetails => {
				this.totalItems = cartDetails.totalItems;
				this.totalUnits = cartDetails.totalUnits;
				this.cart = cartDetails.cart;
			},
			err => console.log(err.message)
		)
	}	
	
}
