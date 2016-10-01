import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import 'meteor/http';

export const Events = new Mongo.Collection('events');

Meteor.methods({
	'events.create'(res) {
		//inserting into datbase
		Events.insert(res);

		//posting to evenbrite
		HTTP.call('POST',
			"https://www.eventbriteapi.com/v3/events/?token=6XZGEV3DXPBLJKFD2J7J"
			,
			{
				"data": {
					'event.name.html': res.name,
					'event.start.utc': new Date(res.start_time).toISOString().split('.')[0] + "Z", //todo: datetime
					'event.start.timezone': "America/Los_Angeles",
					'event.end.utc': new Date(res.end_time).toISOString().split('.')[0] + "Z", //todo: datetime
					'event.end.timezone': "America/Los_Angeles",
					'event.currency': "USD"
				}
			},			
			(err, result) => { console.log(result); });
	}
});