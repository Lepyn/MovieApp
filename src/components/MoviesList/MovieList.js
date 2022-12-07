import React, { useEffect, useState } from "react";
import movieDataBase from "../../Services/movieDataBase";
import MovieCard from "../MoviesCard/MovieCard";
import SearchInput from "../SearchInput/SearchInput";
import Loading from "../Loading/Loading";
import NoInternetLoading from "../NoInternetLoading/NoInternetLoading";
import Cat from "../Cat/Cat";
import Page from "../Page/Page";

const MovieList = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [datas, setDatas] = useState([]);

  const RequestToken = async () => {
    if (localStorage.getItem("request_token")) return;
    const createRequestToken = await movieDataBase.get(
      "/authentication/token/new"
    );
    localStorage.setItem(
      "request_token",
      `${createRequestToken.data.request_token}`
    );
  };

  const createSessionId = async () => {
    if (localStorage.getItem("session")) return;

    const sessionId = await movieDataBase.post("/authentication/session/new", {
      request_token: localStorage.getItem("request_token"),
    });
    localStorage.setItem("session", `${sessionId.data.session_id}`);
  };

  const guestToken = async () => {
    if (localStorage.getItem("guest")) return;
    const guestKey = await movieDataBase.get(
      "/authentication/guest_session/new"
    );
    localStorage.setItem("guest", `${guestKey.data.guest_session_id}`);
  };
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

  const createAllTokens = async () => {
    await RequestToken();
    await guestToken();
    await createSessionId();
  };

  useEffect(() => {
    allFetchMovies();
    createAllTokens();
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
