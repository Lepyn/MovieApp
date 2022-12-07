import { useEffect, useState } from "react";
import MovieCard from "../../MoviesCard/MovieCard";
import { getRatedMovies } from "../../../Services/RatedPageService";
import NoInternetLoading from "../../NoInternetLoading/NoInternetLoading";
import Loading from "../../Loading/Loading";

function RatedPage() {
  const [ratedList, setRatedList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getRatedMovies().then((el) => {
      setRatedList(el.data.results);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <NoInternetLoading />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ul className="movies">
            <>
              {ratedList.map((searchMovie, index) => {
                return <MovieCard key={index} {...searchMovie} />;
              })}
            </>
          </ul>
          {/*<Page datas={datas} allFetchMovies={allFetchMovies} />*/}
        </>
      )}
    </>
  );
}

export default RatedPage;
