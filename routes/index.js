var express = require('express');
var request = require('request');
var async = require('async');

var router = express.Router();

var tmdbKey = process.env.TMDB_KEY;
var tmdbUrl = 'http://api.themoviedb.org/3/';

function makeUrl(ext) {
	return tmdbUrl + ext + '?api_key=' + tmdbKey;
}

/* GET home page. 
 * Display currently showing movies as well as the ages and average.
 */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
