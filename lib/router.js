
FlowRouter.route('/event/:id', {
	action: function(params, queryParams) {
		console.log("Params: ", params);
		console.log("queryParams: ", queryParams);
	},

	// name: ""
});