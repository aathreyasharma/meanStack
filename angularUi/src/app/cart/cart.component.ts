import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	cart = [];
	totalItems = 0;
	totalUnits = 0;
	columnNames = ['name', 'qty', 'price'];
  constructor(private cartService: CartService) { }

  ngOnInit() {
  	this.cartService.cast
		.subscribe(
			cartDetails => {
				this.cart = cartDetails.cart;
				this.totalItems = cartDetails.totalItems;
				this.totalUnits = cartDetails.totalUnits;
			},
			err => console.log(err.message)
		)
  }

}
