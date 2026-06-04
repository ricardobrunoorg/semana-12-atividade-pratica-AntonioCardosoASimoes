const API_KEY = "8516e5101fc95a7c530639a80cca2c14";

const BASE_URL =
`https://api.themoviedb.org/3`;

const IMAGE_URL =
`https://image.tmdb.org/t/p/w500`;

const movieList =
document.getElementById("movie-list");

const message =
document.getElementById("message");

const searchInput =
document.getElementById("search");

const btnSearch =
document.getElementById("btnSearch");

async function fetchMovies(query = "") {

    try {

        showMessage("Carregando filmes...");

        let url;

        if(query){

            url =
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;

        } else {

            url =
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
        }

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Erro ao acessar API");
        }

        const data = await response.json();

        renderMovies(data.results);

    } catch(error){

        console.error(error);

        showMessage("Erro ao carregar filmes.");
    }
}

function createMovieCard(movie){

    const card =
    document.createElement("div");

    card.classList.add("movie-card");

    const poster = movie.poster_path
        ? `${IMAGE_URL}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=Sem+Imagem";

    card.innerHTML = `
        <img src="${poster}" alt="${movie.title}">

        <div class="movie-info">
            <h2>${movie.title}</h2>

            <p>
                <strong>Ano:</strong>
                ${movie.release_date ?
                movie.release_date.substring(0,4)
                : "N/A"}
            </p>

            <p>
                <strong>Nota:</strong>
                ${movie.vote_average}
            </p>

            <p>
                ${movie.overview ?
                movie.overview.substring(0,120)
                + "..."
                : "Sem descrição"}
            </p>
        </div>
    `;

    return card;
}

function renderMovies(movies){

    movieList.innerHTML = "";

    if(movies.length === 0){

        showMessage("Nenhum filme encontrado.");

        return;
    }

    showMessage("");

    movies.forEach(movie => {

        const card =
        createMovieCard(movie);

        movieList.appendChild(card);
    });
}

function showMessage(text){

    message.textContent = text;
}

function init(){

    fetchMovies();
}

btnSearch.addEventListener("click", () => {

    const query =
    searchInput.value.trim();

    fetchMovies(query);
});

searchInput.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){

        const query =
        searchInput.value.trim();

        fetchMovies(query);
    }
});

init();