var express = require('express');
var request = require('request');
var async = require('async');

var router = express.Router();

var tmdbKey = process.env.TMDB_KEY;
var tmdbUrl = 'http://api.themoviedb.org/3/';

function makeUrl(ext) {
	return tmdbUrl + ext + '?api_key=' + tmdbKey;
}

router.get('/', function(req, res, next) {
	res.redirect('/1');
});

/* GET home page. 
 * Display currently showing movies as well as the ages and average.
 */
router.get('/:page', function(req, res, next) {
  var currentPage = req.params.page;
  var movies = [];
  request(makeUrl('movie/now_playing'), function(error, response, body) {

  });
  
  res.render('index', { title: 'Express' });
});

router.get('/movie/:id', function(req, res, next) {

	res.render('movie', {});
})

module.exports = router;
