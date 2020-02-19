import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ConstantsService } from './common/services/constants.service';


@Injectable({
	providedIn: 'root'
})
export class EventService {
	constructor(private http: HttpClient, private _constants: ConstantsService) { }
	private apiUrl = this._constants.apiUrl;

	private _eventsUrl = this.apiUrl + "events";
	private _specialEventsUrl = this.apiUrl + "special";
	private _eventDetailsUrl = this.apiUrl + 'event/';
	private _deleteEventUrl = this.apiUrl + 'event/';
	// private _eventsUrl = "http://localhost:3000/api/" + "events";
	// private _specialEventsUrl = "http://localhost:3000/api/" + "special";

	eventId = "";
	getEvents() {
		// console.log(this._eventsUrl);
		return this.http.get<any>(this._eventsUrl);
	}

	getSpecialEvents() {
		return this.http.get<any>(this._specialEventsUrl);
	}

	setEventId(eventId) {
		localStorage.setItem('eventId', eventId);
    	console.log("Event Id set : ",eventId);
	}

	getEventId() {
		// console.log("Event Id get : ",this.eventId);
		return localStorage.getItem('eventId');
	}

	removeEventId() {
		// localStorage.clear();
		localStorage.removeItem('eventId');
	}

	getEventDetails() {
		let eventId = localStorage.getItem('eventId');
		console.log("Get Event Details : ", eventId);
		return this.http.get<any>(this._eventDetailsUrl + eventId);
	}

	deleteEvent(mId) {
		console.log(mId);
		return this.http.delete<any>(this._deleteEventUrl + mId);
	}
}
