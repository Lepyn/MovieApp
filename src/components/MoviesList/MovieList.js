import { useEffect, useState } from "react";
import movieDataBase from "../../Services/movieDataBase";
import MovieCard from "../MoviesCard/MovieCard";
import SearchInput from "../SearchInput/SearchInput";
import Loading from "../Loading/Loading";
import NoInternetLoading from "../NoInternetLoading/NoInternetLoading";
import Cat from "../Cat/Cat";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [allFilms, setAllFilms] = useState([]);
  const [keyDownInput, setKeyDown] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const allFetchMovies = async (text) => {
    const { data } = await movieDataBase.get("/search/movie", {
      params: {
        query: text,
      },
    });
    setKeyDown(true);
    setIsEmpty(true);
    setAllFilms(data.results);
  };

  const fetchMovies = async () => {
    const { data } = await movieDataBase.get("/movie/popular");
    setIsEmpty(true)
    setMovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <NoInternetLoading />
       
      <SearchInput allFetchMovies={allFetchMovies} />
      {isLoading ? (
        <Loading />
      ) : (
        <> 
        
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
          )}  {isEmpty && <Cat />}
        </ul>
      </>)}
    </>
  );
};
export default MovieList;
