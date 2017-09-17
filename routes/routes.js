var datastore = require('@google-cloud/datastore');

let appRouter = function (app){


	app.get("/", function(req, res) {
    	res.send("Hello World");
	});

	app.get('/list', function(req, res){

	})
	app.get('/get', function(req, res){

		var datastoreClient = datastore({
		  			projectId: 'faqlexa-180223',
		  			keyFilename: 'FAQLexa-77c9a325dfe0.json'
		});
		


		// var key = datastoreClient.key(['Product', 'Computer']);
		var query = datastoreClient.createQuery('faqs');
		var caliQuery = query.filter('keywords', 'clubs');
		datastoreClient.runQuery(caliQuery)
			.then((results) => {
			// Task entities found.
			const tasks = results[0];
			output = ""
			console.log('Tasks:');
			tasks.forEach((task) => {output+=JSON.stringify(task)});
			res.send(output);
			});
	})

	app.get('/push', function(req, res){
		var datastoreClient = datastore({
		  			projectId: 'faqlexa-180223',
		  			keyFilename: 'FAQLexa-77c9a325dfe0.json'
		});
		var blogPostData = {
		category:"Activities",
		question:"What clubs and organizations are available to students?",
		answer:"VCU has more than 500 recognized student organizations. They range from social to political, from religious to academic, from honorary to student government. If VCU does not have a group that interests you, you can form an organization of your own.",
		keywords: ["clubs", "organizations", "clubs and organizations"]
		};
		var blogPostKey = datastoreClient.key('faqs');

		

		datastoreClient.save({
		  key: blogPostKey,
		  data: blogPostData
		}, function(err) {
		  // `blogPostKey` has been updated with an ID so you can do more operations
		  // with it, such as an update.
		  // blogPostData.isDraft = false;

		  datastoreClient.save({
		    key: blogPostKey,
		    data: blogPostData
		  }, function(err) {
		    if (!err) {
		      // The blog post is now published!
		    }
		  });
		});
	})
}
module.exports = appRouter; 