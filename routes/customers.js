var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://marius:marius@ds139197.mlab.com:39197/alwaysdocument', ['customers'])

// Get all Customers
router.get('/customers', function(req, res, next) {
	db.customers.find(function(err, customers) {
		if(err) {
			res.send(err);
		}
		res.json(customers);
	})
})

// Get single customer
router.get('/customers/:id', function(req, res, next) {
	db.customers.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, customer) {
		if(err) {
			res.send(err);
		}
		res.json(customer);
	})
})

//Save customer
router.post('/customer', function(req, res, next) {
	var customer = req.body;

	if(!customer.customerName || !(customer.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad data"
		});
	} else {
		db.customers.save(customer, function(err, customer) {
			if(err) {
				res.send(err);
			}
			res.json(customer);
		})
	}
})

// Delete single customer
router.delete('/customer/:id', function(req, res, next) {
	db.customers.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, customer) {
		if(err) {
			res.send(err);
		}
		res.json(customer);
	})
})

// Update single customer
router.put('/customer/:id', function(req, res, next) {

	var customer = req.body;
	var updCustomer = {};

		updCustomer.customerName = customer.customerName;
		updCustomer.isDone = customer.isDone;

	if(!updCustomer) {
		res.status(400);
		res.json({
			"error": "Bad data"
			});
	} else {
		db.customers.update({_id: mongojs.ObjectId(req.params.id)}, updCustomer, {},function(err, customer) {
			if(err) {
				res.send(err);
			}
			res.json(customer);
		});
	}

	
})

module.exports = router;