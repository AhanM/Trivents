import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Meteor.methods({
	'events.create'(res) {
		Events.insert(res);
	}
});