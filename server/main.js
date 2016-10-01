import { Meteor } from 'meteor/meteor';
import FB from 'fb';
import { Events } from '../imports/api/events.js';

FB.mapi = Meteor.wrapAsync(FB.napi);

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.methods({
	'inserteventData'({eventurl}) {
		console.log("Invoked inserteventData");

		if(eventurl[eventurl.length - 1] == '/'){
			// if '/' is the last char of the url
			eventurl = eventurl.substring(0, eventurl.length - 1);		
		}

		identifier = eventurl.substring(eventurl.lastIndexOf("/"));

		console.log("identified")
		var res = FB.mapi(identifier, {
			access_token: "249276968799606|SbS-5WRPQ8h1YxQmHTNFaw8i3J8"
		});

		Events.insert({
			name: res.name,
			description: res.description,
			loc: res.place.name,
			lat: res.place.location.latitude,
			lng: res.place.location.longitude,
			start_time: Date.parse(res.start_time),
			end_time: Date.parse(res.end_time),
			createdAt: new Date(),
		});

		console.log(res);
	},
});