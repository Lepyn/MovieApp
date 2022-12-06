import React, { useEffect, useState } from "react";
import movieDataBase from "../../Services/movieDataBase";
import MovieCard from "../MoviesCard/MovieCard";
import SearchInput from "../SearchInput/SearchInput";
import Loading from "../Loading/Loading";
import NoInternetLoading from "../NoInternetLoading/NoInternetLoading";
import Cat from "../Cat/Cat";
import Page from "../Page/Page";

// import Rated from '../Rated/Rated'

const MovieList = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [datas, setDatas] = useState([]);

  const allFetchMovies = async (text = "return") => {
    try {
      const { data } = await movieDataBase.get("/search/movie", {
        params: {
          query: text,
        },
      });

      if (data.results.length === 0) return setIsEmpty(false);
      else {
        setIsEmpty(true);
        setLoading(false);
        setAllFilms(data.results);
 
        setDatas(data);
      }
    } catch (e) {
      console.log(`Ошибка ${e}`);
    }
  };

  useEffect(() => {
    allFetchMovies();
  }, []);

  return (
    <>
      <NoInternetLoading />
      <SearchInput allFetchMovies={allFetchMovies} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isEmpty && (
            <>
              <ul className="movies">
                <>
                  {allFilms.map((searchMovie, index) => {
                    return <MovieCard key={index} {...searchMovie} />;
                  })}
                </>
              </ul>
              <Page datas={datas} allFetchMovies={allFetchMovies} />
            </>
          )}
          {!isEmpty && <Cat />}
        </>
      )}
    </>
  );
};
export default MovieList;
