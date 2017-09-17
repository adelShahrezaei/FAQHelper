var datastore = require('@google-cloud/datastore');


let extractKeywords = function(text,callback){

	var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

	var natural_language_understanding = new NaturalLanguageUnderstandingV1({
	    "username": "d4d5f054-1b6e-4a34-913a-751a82f3ae03",
  		"password": "RDoNjZOSXrFs",
	    'version_date': '2017-02-27'
	});

	var parameters = {
	  'text': text,
	  'features': {
	    'keywords': {
	      'sentiment': true,
	      'emotion': true,
	      'limit': 10
	    }
	  }
	};

	natural_language_understanding.analyze(parameters, function(err, response) {
	  if (err)
	    console.log('error:', err);
	  else
	    console.log(JSON.stringify(response, null, 2));
		callback(response);
	});
}

let appRouter = function (app){


	app.get("/", function(req, res) {
		extractKeywords('what is the deadline for visit',function(response){
			res.send(response);	
		});
    	
	});

	app.get('/list', function(req, res){

	})
	app.get('/getAnswer', function(req, res){

		var datastoreClient = datastore({
		  			projectId: 'faqlexa-180223',
		  			keyFilename: 'FAQLexa-77c9a325dfe0.json'
		});
		


		// var key = datastoreClient.key(['Product', 'Computer']);
		var query = datastoreClient.createQuery('faqs');
		console.log(req.query.question)
		extractKeywords(req.query.question, function(keys){
			// Have to implement OR or somehow make more general querywhat are recreational facilities
			keys.keywords.forEach((key) => {
				console.log(key)
				query = query.filter('keywords','=',key.text)
			})	

			datastoreClient.runQuery(query)
			.then((results) => {
			// Task entities found.
			const answers = results[0];
			output = {answer:"There is no answer"}
			// console.log('Tasks:');
			answers.forEach((ans) => {
				console.log(ans)

				output=JSON.stringify({answer:ans.answer})
			});
			res.send(output);
			});

		})
		// var caliQuery = query.filter('keywords', '>',req.query.question);
		
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