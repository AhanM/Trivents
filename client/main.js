import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../imports/api/events.js';

import './main.html';
import './getevent.html';

BlazeLayout.setRoot('body');

UI.registerHelper('breaklines', function(text, options) {
  text = s.escapeHTML(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return new Spacebars.SafeString(text);
});

function getDateString(timestamp) {
  const threshold = 23;
  const milliInHour = 60 * 60 * 1000;
  const hourDifference = Math.floor((timestamp - Date.now()) / milliInHour);

  if (hourDifference < 1 || hourDifference > threshold) {
    let date = new Date(timestamp);
    let out = "";
    out += String(date.getDate()) + " ";
    out += ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] + " "
    out += String(date.getUTCFullYear()) + ", ";
    out += (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":";
    out += (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " ";
    out += (date.getHours() > 11 ? "PM" : "AM");
    return out;
  } else {
    return "In " + hourDifference + " hour" + ((hourDifference === 1) ? "" : "s");
  }
}

Template.curevents.helpers({
	live_events: function() {
    const currTime = Date.now();
    let events = Events.find({ start_time: {$lt: currTime}, end_time: {$gt: currTime} }, { sort: { start_time: 1 }});
    return events.map(e => { e.time = getDateString(e.start_time); return e; });
  },
  future_events: function() {
    const currTime = Date.now();
    let events = Events.find({ start_time: {$gt: currTime} }, { sort: { start_time: 1 }});
    return events.map(e => { e.time = getDateString(e.start_time); return e; })
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
