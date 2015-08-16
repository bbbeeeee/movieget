var express = require('express');
var request = require('request');
var async = require('async');

var router = express.Router();

var tmdbKey = process.env.TMDB;
var tmdbUrl = 'http://api.themoviedb.org/3/';

function makeUrl(ext, page) {
	var p = (page) ? '&page=' + page : '';
	return tmdbUrl + ext + '?api_key=' + tmdbKey + p;
}

function getAge(bday) {
	if(bday) {
		bdayString = bday.replace('-', '');
		var year = bdayString.substring(0,4);
		var month = bdayString.substring(4,6);
		var day = bdayString.substring(6,8);

		var date = new Date(year, month-1, day);

		var ageDifMs = Date.now() - date.getTime();
	  var ageDate = new Date(ageDifMs); // miliseconds from epoch
	  return Math.abs(ageDate.getUTCFullYear() - 1970);
	} else {
		return 0;
	}
}


router.get('/', function(req, res, next) {
	res.redirect('/1');
});

/* GET home page. 
 * Display currently showing movies as well as the ages and average.
 */
router.get('/:page', function(req, res, next) {
  var currentPage = req.params.page;

  var Movies = [];
  request(makeUrl('movie/now_playing', currentPage), function(error, response, body) {
		var movies = JSON.parse(body);

		// 20 results
		Movies = movies.results;

		res.render('index', { 
				title: 'Movie get!', 
				movies: Movies, 
				page: parseInt(currentPage), 
				maxPage: parseInt(movies.total_pages) }
		);
	});
});


router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id;
	console.log("Processing ages...");
	request(makeUrl('movie/' + id + '/credits', null), function(error, response, body) {
		var cast = JSON.parse(body).cast;
		var ages = 0;
		var count = 0;

		async.eachSeries(cast, function(person, callback) {
			request(makeUrl('person/' + person.id, null), function(error, response, body) {
				var person = JSON.parse(body);

				ages += getAge(person.birthday);

				console.log(ages);
				callback();

				if(count === cast.length - 1) {
					res.send({avg: ages / cast.length});
				}
				count++;


			});
		});
	})
});

module.exports = router;