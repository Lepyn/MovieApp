import { useEffect, useState } from "react";
import "../../style";
import MovieList from "../MoviesList/MovieList";
import MainHeader from "../MainHeader/MainHeader";
import RatedPage from "../Page/RatedPage/RatedPage";
import Context from "../../Context/Context";
import movieDataBase from "../../Services/movieDataBase";

const App = () => {
  const [selectedPage, setSelectedPage] = useState("search");
  const [genresState, setgenresState] = useState([]);

  const getGenres = async () => {
    const { data } = await movieDataBase.get(`/genre/movie/list`);
    setgenresState(data.genres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <Context.Provider value={genresState}>
        <section>
          <MainHeader setSelectedPage={setSelectedPage} />
          {selectedPage === "search" && <MovieList />}
          {selectedPage === "rated" && <RatedPage />}
        </section>
      </Context.Provider>
    </>
  );
};
export default App;
