import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	
	private broadCastMessage = new BehaviorSubject<any>({});
	// public cast = this.broadCastMessage.asObservable();
	public cast = this.broadCastMessage.asObservable();

	constructor() {	
		this.broadCastMessage.next(this.getCartDetails())
	}

	addItem(item) {
		console.log(item);
		if (localStorage.getItem("cart") === null) {
			let cart = [];
			cart.push(item);
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			let cart = JSON.parse(localStorage.getItem("cart"));
			const found = cart.some(el => el._id === item._id);
			if (!found) cart.push(item);
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		let cartDetails = this.getCartDetails();
		this.broadCastMessage.next(cartDetails);
	}

	removeItemFromCart(item) {
		if (localStorage.getItem("cart") !== null) {
			let cart = JSON.parse(localStorage.getItem("cart"));
			const found = cart.some(cartItem => cartItem._id === item._id);
			if (found) cart.pop(item);
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		let cartDetails = this.getCartDetails();
		console.log("remove item", cartDetails)
		this.broadCastMessage.next(cartDetails);
	}

	getCartDetails() {
		var totalItems:number = 0;
		let totalUnits:any = 0;
		if (localStorage.getItem('cart') !== null) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			let totalItems = cart.length;
			
			for (var i = 0; i < cart.length; ++i) {
				console.log(cart[i].qty);
				let qty:any = cart[i].qty;
				totalUnits = totalUnits + qty;
			}
			// var tempArr = Object.values(cart);
			// if (tempArr.length > 0) {
			// 	for (var i = 0; i < tempArr.length; ++i) {
			// 		var val:any = tempArr[i];
			// 		totalLen = totalLen + val;
			// 	}
			// }

			// console.log("Total Items in cart : ", totalLen);
			return {'cart': cart, 'totalItems': totalItems, 'totalUnits': totalUnits}
		} else {
			return {'cart': {}, 'totalItems': 0, 'totalUnits': totalUnits}
		}
	}

}
