import { useEffect, useState } from "react";
import movieDataBase from "../../Services/movieDataBase";
import MovieCard from "../MoviesCard/MovieCard";
import SearchInput from "../SearchInput/SearchInput";
import Loading from "../Loading/Loading";
import NoInternetLoading from "../NoInternetLoading/NoInternetLoading";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [allFilms, setAllFilms] = useState([]);
  const [keyDownInput, setKeyDown] = useState(false);

  const allFetchMovies = async (text) => {
    const { data } = await movieDataBase.get("/search/movie", {
      params: {
        query: text,
      },
    });
    setKeyDown(true);
    setAllFilms(data.results);
  };
  const fetchMovies = async () => {
    const { data } = await movieDataBase.get("/movie/popular");
    setMovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
    allFetchMovies();
  }, []);

  return (
    <>
      <NoInternetLoading />
      <SearchInput allFetchMovies={allFetchMovies} />

      {isLoading ? (
        <Loading />
      ) : (
        <ul className="movies">
          {keyDownInput && (
            <>
              {allFilms.map((searchMovie, index) => {
                return <MovieCard key={index} {...searchMovie} />;
              })}
            </>
          )}
          {!keyDownInput && (
            <>
              {movies.map((movie, index) => {
                return <MovieCard key={index} {...movie} />;
              })}
            </>
          )}
        </ul>
      )}
    </>
  );
};
export default MovieList;
