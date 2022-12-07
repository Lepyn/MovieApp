import MovieList from "./components/MoviesList/MovieList";
import RatedList from "./components/RatedList/RatedList";
import MainHeader from "./components/MainHeader/MainHeader";
import RatedPage from './components/Page/RatedPage/RatedPage'
import "./style";
// import { Menu } from "antd";
import { useEffect, useState } from "react";


const App = () => {
  const [selectedPage, setSelectedPage] = useState("search");
  useEffect(() =>{
      console.log('selected', selectedPage)

  } , [selectedPage])

  return (
    <>
      <section>
        <MainHeader setSelectedPage={setSelectedPage} />
        {selectedPage === "search" && <MovieList />}
        {selectedPage === "rated" && <RatedPage/>}
      </section>
    </>
  );
};
export default App;