var express = require('express');
var router = express.Router();
var service = require('../service.js');//require queryFacebook

/* GET home page. -- call views */
router.get('/ex', function(req, res, cb) {
	

	//service.queryFacebook(req, res, cb);

	
	const a = service.queryFacebook(req, res, cb);

	console.log(a);
	
  //res.render('index.jade', { title: result });
  // res.send(vongLap);//In ket qua cuoi cung date - value
});


module.exports = router;