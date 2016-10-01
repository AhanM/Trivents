import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../imports/api/events.js';

import './main.html';
import './getevent.html';

BlazeLayout.setRoot('body');

Template.curevents.helpers({
	events: function() {
    return Events.find({}, { sort: { createdAt: -1 }});
  }
});

Template.getevent.events({
  'submit .eventform'(event) {
    console.log("Yo");
    // Do stuff like enter this into collection
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const text = target.url.value;
    
    // Insert into collection
    Meteor.call('inserteventData', {eventurl: text});
    
    // Clear form
    target.url.value = '';
  },
});

Template.event.helpers({
  id: function() {
    return FlowRouter.getParam("id");
  },
  res: function() {
    var id = FlowRouter.getParam("id");
    return Events.findOne({_id: id});
  }
});
