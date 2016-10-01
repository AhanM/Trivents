import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import 'meteor/http';

export const Events = new Mongo.Collection('events');

Meteor.methods({
	'events.create'(res) {
		//inserting into datbase
		Events.insert(res);

		//posting to evenbrite
		const tokenParam = "?token=6XZGEV3DXPBLJKFD2J7J";
		HTTP.call('POST',
			"https://www.eventbriteapi.com/v3/events/" + tokenParam,
			{
				"data": {
					'event.name.html': res.name,
					'event.start.utc': new Date(res.start_time).toISOString().split('.')[0] + "Z", //todo: datetime
					'event.description.html': res.description,
					'event.organizer_id': 11815419002,
					'event.start.timezone': "America/Los_Angeles",
					'event.end.utc': new Date(res.end_time).toISOString().split('.')[0] + "Z", //todo: datetime
					'event.end.timezone': "America/Los_Angeles",
					'event.currency': "USD"
				}
			},			
			function(err, result) {
				console.log("/events/: " + result.statusCode);
				if (err) { console.log("/imports/api/events.js: Error"); return; }
				let id = result.data.id;
				HTTP.call('POST',
					"https://www.eventbriteapi.com/v3/events/"+id+"/ticket_classes/" + tokenParam,
					{
						"data": {
							'ticket_class.name': 'Free',
							'ticket_class.donation': true
						}
					},
					function(err, result) {
						console.log("/ticket_classes/: " + result.statusCode);
						if (result.statusCode === 400) console.log(result);
						HTTP.call('POST',
							"https://www.eventbriteapi.com/v3/events/"+id+"/publish/"+tokenParam,
							function(err, result) {
								console.log("/publish/:" + result.statusCode);
							}
						);
					});
			});
	}
});