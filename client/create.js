import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import "./create.html"

function getUnix() {

}

Template.create_wrapper.events({
	'submit .create_event'(event) {
		event.preventDefault();

		//constructing object data
		const form = event.target;
		const locale = "-0700";
		let formData = {
			name: form.eventName.value,
			description: form.description.value,
			loc: form.location.value,
			lat: 0, //todo: use google api
			lng: 0, //todo: use google api
			start_time: Date.parse(form.startDate.value + "T" + form.startTime.value + locale),
			end_time: Date.parse(form.endDate.value + "T" + form.endTime.value + locale),
			createdAt: new Date()
		};
		console.log(formData);
		Meteor.call('events.create', formData);
	}
});