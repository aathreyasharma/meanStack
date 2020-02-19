import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../event.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-event-details',
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

	constructor(private _eventService: EventService, private router: Router, private _cartService: CartService) { }
	eventId = "";
	eventObj = {};
	// eventDetails
	ngOnInit() {
		this._eventService.getEventDetails()
		.subscribe(
			res => {
				if (Object.keys(res).length > 0) {
					this.eventObj = res;
				} else {
					this.router.navigate(['/']);
				}
			},
			err => console.log(err)
		)
	}

	deleteEvent(mId) {
		this._eventService.deleteEvent(mId)
		.subscribe(
			res => {
				// this.router.navigate(['/events']);
				console.log("Reditrecting to events page");
			},
			err => console.log(err)
		);
	}

	addToCart(eventObj) {
		// eventObj.qty = qty;
		// console.log(eventObj)
		this._cartService.addItem(eventObj);
	}

	removeFromCart(eventId) {
		this._cartService.removeItemFromCart(eventId);
	}
}
