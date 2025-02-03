const apiKey = "fd3311ecfd2af752b2fea9aad18cbd0b";
const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

const moviesContainer = document.getElementById("container");

async function fetchMovies() {
  try {
    const data = await getData();
    // const data = await response.json();

    data.results.forEach((media) => {
      const movieCard = createMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createMovieCard(media) {
  const { title, name, backdrop_path } = media;

  const movieCard = document.createElement("div");
  // movieCard.classList.add("movie_item")
  movieCard.classList.add("card");
  movieCard.style.width = "18rem";

  movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movie_img_rounded">
       
        <div class = "card-body">${title || name}</div>
    `;
  return movieCard;
}
async function getData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data; // Directly return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchMovies();
