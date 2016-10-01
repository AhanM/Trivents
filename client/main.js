import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../imports/api/events.js';

import './main.html';

BlazeLayout.setRoot('body');

Template.curevents.helpers({
	events: [
		{ text: 'Event 1', id: 1},
		{ text: 'Event 2', id: 2},
		{ text: 'Event 3', id: 3}
	]
});
