import React from 'react';

const MoviesList = ({
  movies,
  searchValue,
  favouriteComponent,
  favourites,
  handleFavouritesClick,
  fav
}) => {
  const FavouriteComponent = favouriteComponent;
  const checkMovie = movie => {
    let isFavourite = false;
    if (favourites) {
      favourites.forEach(favourite => {
        if (isFavourite) return;
        isFavourite = favourite.imdbID === movie.imdbID;
      });
      return isFavourite;
    }
    return isFavourite;
  };
  return (
    <>
      {movies ? (
        movies.map((movie, index) => (
          <div
            className="image-container d-flex justify-content-start m-3"
            key={index}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <div
              className="overlay d-flex align-items-center justify-content-center"
              onClick={() => handleFavouritesClick(movie)}
            >
              <FavouriteComponent isFavourite={() => checkMovie(movie)} />
            </div>
          </div>
        ))
      ) : (
        <h6 className="mx-auto my-0 align-self-center">
          {searchValue
            ? 'No movies found.'
            : fav
            ? 'No favourite movies yet'
            : 'No movies to display. Try searching'}
        </h6>
      )}
    </>
  );
};

export default MoviesList;
