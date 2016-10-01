import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../imports/api/events.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';
import './getevent.html';

BlazeLayout.setRoot('body');

function getDateString(timestamp, text) {
  const threshold = 23;
  const milliInHour = 60 * 60 * 1000;
  const hourDifference = Math.floor((timestamp - Date.now()) / milliInHour);

  if (hourDifference < 1 || hourDifference > threshold) {
    return text; 
  } else {
    return "In " + hourDifference + " hour" + ((hourDifference === 1) ? "" : "s");
  }
}

Template.getevent.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.getevent.onRendered(function() {
  $(p).text("");
});

Template.curevents.helpers({
	live_events: function() {
    const currTime = Date.now();
    let events = Events.find({ start_time: {$lt: currTime}, end_time: {$gt: currTime} }, { sort: { start_time: 1 }});
    return events.map(e => {e.time = getDateString(e.start_time, e.time); return e;});
  },
  future_events: function() {
    const currTime = Date.now();
    let events = Events.find({ start_time: {$gt: currTime} }, { sort: { start_time: 1 }});
    return events.map(e => {e.time = getDateString(e.start_time, e.time); return e;});
  }
});

Template.getevent.events({
  'submit .eventform'(event, instance) {
    console.log("Yo");
    // Do stuff like enter this into collection
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const text = target.url.value;
    
    // Insert into collection
    Meteor.call('inserteventData', {eventurl: text}, (err) => {
      if(!err) {
        $("p").text("Success");
      } else {
        $("p").text("Invalid URL");
        console.log(err);
      }
    });
  
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
