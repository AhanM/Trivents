import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import "./create.html"

Template.body.events({
	'submit .create_event'(event) {
		event.preventDefault();

		console.log(event.target.eventName.value);

		//constructing object data
		const form = event.target;
		let formData = {
			name: form.eventName.value,
			description: form.description.value,
			loc: form.location.value,
			lat: 0, //todo: use google api
			lng: 0, //todo: use google api
			time: 0, //todo: do correct format
			createdAt: new Date()
		};
		Meteor.call('events.create', formData);
	}
});

Template.create_wrapper.onCreated(function() {
	// GoogleMaps.load({
	// 	key: 'AIzaSyCycdCeB3hwdxOxNJralLp-RGjqn13ZAaU',
	// 	libraries: 'places'
	// });
});

Template.create_wrapper.onRendered(function() {
	console.log(GoogleMaps.loaded());
	if (GoogleMaps.loaded()) {
		console.log('loaded')
      $("loc").geocomplete();
    }
});