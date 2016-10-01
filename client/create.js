import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import "./create.html";	
import { getTimespanText } from "./date.js"

Template.create_wrapper.events({
	'submit .create_event'(event) {
		event.preventDefault();

		//constructing object data
		const form = event.target;
		const locale = "-0700";

		let start = Date.parse(form.startDate.value + "T" + form.startTime.value + locale),
		end = Date.parse(form.endDate.value + "T" + form.endTime.value + locale);
		let formData = {
			name: form.eventName.value,
			description: form.description.value,
			loc: form.location.value,
			lat: form.lat.value,
			lng: form.lng.value,
			start_time: start,
			end_time: end,
			time: getTimespanText(start, end),
			createdAt: new Date()
		};
		console.log(formData);
		Meteor.call('events.create', formData);
	}
});