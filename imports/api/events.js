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
			'https://eventbriteapi.com/v3/events/?token=6XZGEV3DXPBLJKFD2J7J',
			{
				'event.name.html': res.name,
				'event.start.utc': res.start_time, //todo: datetime
				'event.start.timezone': "America/Los_Angeles",
				'event.end.utc': res.end_time, //todo: datetime
				'event.currency': "USD"
			},
			(err, result) => { console.log(err, result); })
	}
});