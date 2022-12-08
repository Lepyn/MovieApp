import { useEffect, useState } from "react";
import MovieCard from "../../MoviesCard/MovieCard";
import movieDataBase from "../../../Services/movieDataBase";
import NoInternetLoading from "../../NoInternetLoading/NoInternetLoading";
import Loading from "../../Loading/Loading";

function RatedPage({ value }) {
  console.log(value);
  const [ratedList, setRatedList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [starrate, setStar] = useState(0);

  let localgest = localStorage.getItem("guest");
  const res = movieDataBase.get(`/guest_session/${localgest}/rated/movies`);

  const result = () => {
    res.then((el) => {
      setStar(el.data.results.map((el) => el.rating));
      console.log(el);
      const str = JSON.stringify(el.data.results);
      localStorage.setItem("str", str);
      setRatedList(el.data.results, starrate);
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
