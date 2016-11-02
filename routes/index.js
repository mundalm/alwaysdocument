var express = require('express');
var router = express.Router();


// Get all Tasks
router.get('/', function(req, res, next) {
	res.render('index.html')
})

// Get all Tasks
router.get('/test', function(req, res, next) {
	res.render('balle.html')
})

module.exports = router;