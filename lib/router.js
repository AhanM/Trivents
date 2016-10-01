
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
		BlazeLayout.render("mainLayout", { main: "event", id: params.id});
	}
	// name: ""
});