

// API MOVIES


// AFFICHER LA LISTE DES FILMS

function moviesApi() {
  
  // Récupérer les films grâce à l'adresse de l'api et le fetch
  let movies = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8ce9f8f28953d4d7871c62b5ac654555&language=en-US&page=1`)
  .then(response => response.json())
  .then(data => {

    let movies_results = data.results;

    for(let i = 0; i < movies_results.length; i++)  {
      
      let apiMovies = document.getElementById("popularMovie");
      let movieId = movies_results[i].id;
      
      // Création de la div parent pour tous les films
      let moviesDiv = document.createElement("a");
      moviesDiv.setAttribute("class", "movie");
      moviesDiv.setAttribute("movieId", movies_results[i].id);
      moviesDiv.setAttribute("href", `details.html?id=${movieId}`);
      apiMovies.appendChild(moviesDiv);
      
      // Création de la balise image pour afficher les posters des films
      let posterMovie = document.createElement("img");
      posterMovie.setAttribute("class", "poster_movie");
      posterMovie.src = "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" + movies_results[i].poster_path;
      moviesDiv.appendChild(posterMovie);
      
      // Création de la balise title pour afficher les titres des films
      let title = document.createElement("h5");
      title.setAttribute("class", "title_movie");
      title.textContent = movies_results[i].title;
      moviesDiv.appendChild(title);

    }
  });
};

moviesApi();
  




// RÉCUPÉRER LE TITRE D'UN FILM ET SON AFFICHE DEPUIS L'INPUT

const API_KEY = '8ce9f8f28953d4d7871c62b5ac654555';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Taille de l'image, vous pouvez changer "w200" pour d'autres tailles disponibles.

const searchBar = document.getElementById('searchBar');
const resultsMovies = document.getElementById('resultsMovies');


searchBar.addEventListener('input', debounce(handleSearch, 300));

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

async function handleSearch() {
  
  const searchTerm = searchBar.value.trim();
  const popularMovie = document.getElementById("popularMovie");
  const allPopularMovies = popularMovie.querySelectorAll(".movie");
  
  if (searchTerm === '') {
    resultsMovies.innerHTML = '';
    // Réapparition de la liste de films dans container-movies
    allPopularMovies.forEach(apiMovies => {
      apiMovies.style.display = "block";
    })
    return;
  }

  try {
    const response = await fetch(`${'https://api.themoviedb.org/3/'}/search/movie?api_key=${'8ce9f8f28953d4d7871c62b5ac654555'}&query=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    const movies = data.results;
    displayResults(movies);
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  }
}

function displayResults(movies) {
  const popularMovie = document.getElementById("popularMovie");
  const allPopularMovies = popularMovie.querySelectorAll(".movie");
  resultsMovies.innerHTML = '';

  if (movies.length === 0) {
    resultsMovies.innerHTML = '<p>Aucun film trouvé</p>';
    return;
  }

  // Pour chaque film trouvé, tu m'affiches son titre et son affiche

  movies.forEach((movie) => {
    const movieDiv = document.createElement('a');
    movieDiv.setAttribute("class", "movie");
    movieDiv.setAttribute("movieId", movie.id);
    movieDiv.setAttribute("href", `details.html?id=${movie.id}`);

    if (movie.poster_path) {
      const moviePoster = document.createElement('img');
      moviePoster.setAttribute("class", "poster_movie");
      moviePoster.src = IMAGE_BASE_URL + movie.poster_path;
      movieDiv.appendChild(moviePoster);
    }

    const movieTitle = document.createElement('h2');
    movieTitle.setAttribute("class", "title_movie");
    movieTitle.textContent = movie.title;
    movieDiv.appendChild(movieTitle);

    resultsMovies.appendChild(movieDiv);
  });

  // Au moment de l'affichage des résultats depuis la barre de recherche, tu me caches les films présents sur la page d'accueil

  allPopularMovies.forEach(apiMovies => {
    apiMovies.style.display = "none";
  })
}
