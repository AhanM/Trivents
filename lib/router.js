import { Events } from '../imports/api/events.js';
import { Template } from 'meteor/templating';

FlowRouter.route('/', {
	action: function() {
		console.log("triggered");
		BlazeLayout.render("mainLayout", { main: "curevents"});
	}
});

FlowRouter.route('/event/:id', {
	action: function(params, queryParams) {
		console.log("Params: ", params);
		console.log("queryParams: ", queryParams);

    // Fetch relevant event
		// res = Events.findOne({_id: params.id});

    // printing out queries and params


		BlazeLayout.render("mainLayout", { main: "event"});
	}
	// name: ""
});

FlowRouter.route('/getevent', {
	action: function() {
		BlazeLayout.render("mainLayout", {main: "getevent"});
	}
});

FlowRouter.route('/postevent',  {
	action: function() {
		BlazeLayout.render("mainLayout", {main: "create_wrapper"});
	}
})