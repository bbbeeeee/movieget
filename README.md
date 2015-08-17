# movieget
Movie age calculator

## How it works
Movieget calls from The Movie Database (TMDB) API to get listings of current movies (by page), the full cast, 
and then averages the age via another API call. 

It's an Express webapp that you can access [here](http://movieget.herokuapp.com/). On the front page, you'll see a
bunch of cards with movie titles. Hit the button to calculate age. Wait a bit - and there's your age! Hit the next or back arrow
(appearance depends on the page number you're on) to see more movies).

## Constraints
The app was designed to support any volume of movies by having age calculations separate from the pageload itself.
If too many age calculations are requested, TMDB's rate limit will stop us from calculating the age. With the TMDB API,
some age calculations are skewed - I found that often in int'l movies, the age returns as zero because of weird data. 
The cards display errors so you know what's going on, though.

## Run it yourself
```
git clone https://github.com/btroo/movieget.git
cd movieget
npm install
npm start
```

You'll also need to get an API key from https://www.themoviedb.org. Set it as so:
```
export TMDB="[API KEY]"
```
## Tech
Requires:
- Node.js

Uses:
- [express](http://expressjs.com/)
- [request](https://github.com/request/request)
- [async](https://github.com/caolan/async)

