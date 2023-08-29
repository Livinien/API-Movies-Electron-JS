
// AFFICHER TOUS LES DÉTAILS DE LA FICHE TECHNIQUE D'UN FILM

function moviesApi() {

  const API_KEY = '8ce9f8f28953d4d7871c62b5ac654555';
  const URLPARAM = new URLSearchParams(window.location.search);
  const MOVIEID = URLPARAM.get("id")

  // Récupérer les films grâce à l'adresse de l'api et le fetch
  let movies = fetch(`https://api.themoviedb.org/3/movie/${MOVIEID}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits,images`)
  .then(response => response.json())
  .then(data => {

    console.log(data);

    const detailsMovies = document.getElementById("detailsMovies");
    
    // Création de la div parent pour afficher la fiche technique d'un film
    let moviesDiv = document.createElement("div");
    moviesDiv.setAttribute("class", "movieDetails");

    
    // Création de la balise image pour afficher le poster du film
    let posterMovie = document.createElement("img");
    posterMovie.setAttribute("class", "poster_movie_details");
    posterMovie.src = "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" + data.poster_path;
    detailsMovies.appendChild(posterMovie);
    detailsMovies.appendChild(moviesDiv);


    // Création de la balise title pour afficher le titre du film
    let title = document.createElement("h5");
    title.setAttribute("class", "titleDetails");
    title.textContent = data.title;
    moviesDiv.appendChild(title);


    // Afficher le synopsis d'un film
    let synopsisDiv = document.createElement("div");
    synopsisDiv.setAttribute("class", "synopsis");
    synopsisDiv.textContent = data.overview;  
    detailsMovies.appendChild(synopsisDiv);


    // Afficher l'origine du pays du film
    let originDiv = document.createElement("div");
    originDiv.setAttribute("class", "origin-movie");
    originDiv.textContent = "Origine : " + data.production_countries.map(country => country.name).join(', ');;  
    detailsMovies.appendChild(originDiv);


    // Afficher l'année de la sortie du film
    let yearDiv = document.createElement("div");
    yearDiv.setAttribute("class", "year");
    yearDiv.textContent = "Année de sortie : " + data.release_date;;  
    detailsMovies.appendChild(yearDiv);
   

    // Afficher le(s) genres du film
    const genresDiv = document.createElement("div");
    genresDiv.setAttribute("class", "genres");

    data.genres.forEach(genre => {
      const genreSpan = document.createElement("span");
      genreSpan.textContent = genre.name;
      genresDiv.appendChild(genreSpan);
    });

    detailsMovies.appendChild(genresDiv);


    // Afficher la durée du film
    const durationDiv = document.createElement("div");
    durationDiv.setAttribute("class", "duration");
    durationDiv.textContent = `Durée : ${data.runtime} minutes`;
    detailsMovies.appendChild(durationDiv);


    // Afficher les acteurs principaux du film
    const mainActorsDiv = document.createElement("div");
    mainActorsDiv.setAttribute("class", "main-actors");


    data.credits.cast.forEach(actor => {
      if (actor.order < 5) { 
      
      const actorDiv = document.createElement("div");
      actorDiv.setAttribute("class", "actor");

      const actorImage = document.createElement("img");
      actorImage.setAttribute("class", "actor-image");
      actorImage.src = "https://www.themoviedb.org/t/p/w138_and_h175_face" + actor.profile_path;

      const actorInfo = document.createElement("p");
      actorInfo.setAttribute("class", "actor-name");
      actorInfo.textContent = `${actor.name} (${actor.character})`;

      actorDiv.appendChild(actorImage);
      actorDiv.appendChild(actorInfo);

      
      mainActorsDiv.appendChild(actorDiv);
      }
    });

    detailsMovies.appendChild(mainActorsDiv);
  })
   
};
  
moviesApi();
