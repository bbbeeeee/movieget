var express = require('express');
var request = require('request');
var async = require('async');

var router = express.Router();

var tmdbKey = process.env.TMDB_KEY;
var tmdbUrl = 'http://api.themoviedb.org/3/';

function makeUrl(ext, page) {
	var p = (page) ? '&page=' + page : '';
	return tmdbUrl + ext + '?api_key=' + tmdbKey + p;
}

function getAge(bday) {
	bdayString = bday.replace('-', '');
	var year = bdayString.substring(0,4);
	var month = bdayString.substring(4,6);
	var day = bdayString.substring(6,8);

	var date = new Date(year, month-1, day);

	var ageDifMs = Date.now() - date.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
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
  request(makeUrl('movie/now_playing', 1), function(error, response, body) {
		var movies = JSON.parse(body);
		
		// 20 results
		Movies = json.results;

		res.render('index', { title: 'Movie get!', movies: Movies, page: currentPage});
	});
});
  
  
});

router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id;

	request(makeUrl('movie/' + id + '/credits', null), function(error, response, body) {
		var cast = movie.cast;
		var ages = 0;

		async.eachSeries(cast, function(person, callback) {
			request(makeUrl('person/' + person.id, null), function(error, response, body) {
				ages += getAge(person.birthday);
			});
		});

		res.send(ages / cast.length);
	})
})

module.exports = router;
