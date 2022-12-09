import { useEffect, useState } from "react";
import MovieCard from "../../MoviesCard/MovieCard";
import movieDataBase from "../../../Services/movieDataBase";
import NoInternetLoading from "../../NoInternetLoading/NoInternetLoading";
import Loading from "../../Loading/Loading";

function RatedPage() {
  const [ratedList, setRatedList] = useState([]);
  const [isLoading, setLoading] = useState(true);


  let localgest = localStorage.getItem("guest");
  const res = movieDataBase.get(`/guest_session/${localgest}/rated/movies`);

  const result = () => {
    res.then((el) => {
      const str = JSON.stringify(el.data.results);
      localStorage.setItem("str", str);
      setRatedList(el.data.results);
      setLoading(false);
    });
  };

  useEffect(() => {
    result();
  }, []);

  return (
    <>
      <NoInternetLoading />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <></>
          <ul className="movies">
            <>
              {ratedList.map((searchMovie, index) => {
                return <MovieCard key={index} {...searchMovie} />;
              })}
            </>
          </ul>
        </>
      )}
    </>
  );
}
export default RatedPage;
