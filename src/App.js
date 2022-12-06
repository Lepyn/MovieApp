import MovieList from "./components/MoviesList/MovieList";
import RatedList from "./components/RatedList/RatedList";
import MainHeader from "./components/MainHeader/MainHeader";
import "./style";
// import { Menu } from "antd";
import { useEffect, useState } from "react";


const App = () => {
  const [selectedPage, setSelectedPage] = useState("search");

  return (
    <>
      <section>
        <MainHeader setSelectedPage={setSelectedPage} />
        {selectedPage === "search" && <MovieList />}
        {!selectedPage === "rated" && <RatedList />}
      </section>
    </>
  );
};
export default App;
