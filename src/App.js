import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './components/MoviesList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourite from './components/RemoveFavourite';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const storageKey = 'react-movie-app-favourites';

  const getMovieRequest = async searchValue => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=ba79adb5`;
    const response = await fetch(url);
    const json = await response.json();
    //if (json.Search) setMovies(json.Search);
    setMovies(json.Search);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const getMoviesFromStorage = () => {
    const storedMovies = JSON.parse(localStorage.getItem(storageKey));
    return storedMovies || [];
  };

  useEffect(() => {
    const favMovies = getMoviesFromStorage();
    setFavourites(favMovies);
  }, []);

  const saveMovies = movies => {
    localStorage.setItem(storageKey, JSON.stringify(movies));
  };

  const handleChange = event => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const addToFavourites = movie => {
    const newFavouritesList = [...favourites, movie];
    setFavourites(newFavouritesList);
    saveMovies(newFavouritesList);
  };

  const removeFavourite = movie => {
    const newFavouritesList = favourites.filter(
      favourite => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouritesList);
    saveMovies(newFavouritesList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center m-4">
        <MovieListHeading heading="Movies" />
        <SearchBox value={searchValue} onChange={handleChange} />
      </div>
      <div className="row movie-list mx-4">
        <MoviesList
          movies={movies}
          searchValue={searchValue}
          favouriteComponent={AddFavourites}
          favourites={favourites}
          handleFavouritesClick={addToFavourites}
        />
      </div>
      <div className="row d-flex align-items-center m-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row movie-list mx-4 i">
        <MoviesList
          movies={favourites}
          favouriteComponent={RemoveFavourite}
          handleFavouritesClick={removeFavourite}
          fav
          na
          wa
          o
        />
      </div>
    </div>
  );
};

export default App;
