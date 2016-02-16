var Contact = require('./models/contact');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all contacts
	app.get('/api/contacts', function(req, res) {

		// use mongoose to get all contacts in the database
		Contact.find(function(err, contacts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(contacts); // return all contacts in JSON format
		});
	});


	app.get('/api/contacts/:contact_id', function(req, res) {

		// use mongoose to get all contacts in the database
		Contact.findOne({
			_id : req.params.contact_id
		},function(err, contact) {
		console.log(contact);
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(contact); // return all contacts in JSON format
		});
	});

	// create contact and send back all contacts after creation
	app.post('/api/contacts', function(req, res) {

		// create a contact, information comes from AJAX request from Angular
		Contact.create({
			name : req.body.name,
			number : req.body.number
		}, function(err, contact) {
			if (err)
				res.send(err);

			// get and return all the contacts after you create another
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});

	});

	app.put('/api/contacts/:contact_id', function(req, res) {
		var query = {_id: req.params.contact_id};
		var update = {name: req.body.name, number: req.body.number};
		var options = {new: true};
		Contact.findOneAndUpdate(query, update, options, function(err, contact) {
			if (err)
				res.send(err);

			// get and return all the contacts after you create another
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});
	});

	// delete a contact
	app.delete('/api/contacts/:contact_id', function(req, res) {
		Contact.remove({
			_id : req.params.contact_id
		}, function(err, contact) {
			if (err)
				res.send(err);

			// get and return all the contacts after you create another
			Contact.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};