// Universal page navigation and functions 
function openMovies() {
    window.location.href = ("index.html");
}
function openShows() {
    window.location.href = ("shows.html");
}
function openSearch() {
    window.location.href = "searched.html";
}
// Defaults 
const API_KEY = 'api_key=ca97876a17b59447397a518278ec649b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_MOVIE_SHOW = BASE_URL + '/search/movie?'+API_KEY+'&query="';
// Genre JSON content
const genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]

// Search functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userSearch = searchButton.value;
    if(userSearch && userSearch !== '') {
        getMovies(SEARCH_MOVIE_SHOW+userSearch);
        userSearch = '';
    }else{
        window.location.reload();
    }
})
const searchButton = document.getElementById('searchButton');
searchedMovie(SEARCH_MOVIE_SHOW);
function searchedMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showSearched(data.results);
    });
}
function showSearched(data){
    searchResults.innerHTML = '';
    data.forEach(search => {
        const {title, poster_path, vote_average, overview} = search;
        const searchElement = document.createElement('div');
        searchElement.classList.add('search');
        searchElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}" alt="">
            <div class="search_info">
                <h3> ${title} </h3>
                <h3>  </h3>
                <span class="search_reviews"> ${vote_average} </span>
            </div>
            <div class="search_overview">
                ${overview}
            </div>
        `
        searchResults.appendChild(searchElement);
    });
}

// Home page on Load for Movie
const API_MOVIE_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const popularMovies = document.getElementById('popularMovies');
// Movie
getMovies(API_MOVIE_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    });
}
function showMovies(data) {
    
    popularMovies.innerHTML = '';
    data.forEach(movie => {
        const {title, cast_id, poster_path, vote_average, overview, popularity} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3> ${title} </h3>
                    <span class="review"> ${vote_average} </span>
                </div>
                <p class="pop"> ${popularity} </p>
                <div class="overview">
                    ${overview}
                </div>
        `
        popularMovies.appendChild(movieElement);
    });
}
// Shows on Load for shows.html
const API_SHOW_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const popularShows = document.getElementById('popularShows');
// Show
getShows(API_SHOW_URL);
function getShows(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showShows(data.results);
    });
}
function showShows(data) {
    popularShows.innerHTML = '';
    data.forEach(show => {
        const {name, poster_path, vote_average, overview} = show;
        const showElement = document.createElement('div');
        showElement.classList.add('shows');
        showElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${name}">
                <div class="show-info">
                    <h3> ${name} </h3>
                    <span class="review"> ${vote_average} </span>
                </div>
                <div class="overview">
                    ${overview}
                </div>
        `
        popularShows.appendChild(showElement);
    });
}

// setting genre for search page
var genreSelection = [];
const tagsElement = document.getElementById('selectors');
chooseGenre();
function chooseGenre() {
    tagsElement.innerHTML = '';
    genres.forEach(genre => {
        const x = document.createElement('div');
        x.classList.add('selector');
        x.id=genre.id;
        x.innerText = genre.name; 
        x.addEventListener('click', () => {
            if(genreSelection.length == 0) {
                genreSelection.push(genre.id);
            } else {
                if(genreSelection.includes(genre.id)) {
                    genreSelection.forEach((id, idx) => {
                        if(id == genre.id) {
                            genreSelection.splice(idx, 1);
                        }
                    })
                } else {
                    genreSelection.push(genre.id);
                }
            } 
            console.log(genreSelection);
            getMovies(API_MOVIE_URL + '&with_genres='+encodeURI(genreSelection.join(',')));
            getShows(API_SHOW_URL + '&with_genres='+encodeURI(genreSelection.join(',')));
        });
        tagsElement.append(x);
    }); 
};

// Pagination 
const prev = document.getElementById('prev');
const current = document.getElementById('currentPage');
const next = document.getElementById('next');

var currentPage = 1;
var nextpage = 2;
var previouspage = 3;
var lURL = '';
var totalNumPages = 50;
