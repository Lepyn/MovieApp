// import MovieCard from "../MoviesCard/MovieCard";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import movieDataBase from "../../Services/movieDataBase";

const RatedList = ({ id }) => {
  const [valueStar, setValueStar] = useState([]);
  const [starFull, setStarFull] = useState(0);

  const movieRateStars = async (starFull) => {
    const data = await movieDataBase
      .post("/movie/movie_id/rating", {
        headers: {
          Content_Type: "application/json;charset=utf-8",
        },
        params: {
          guest_session_id: window.localStorage.getItem('guest'),
          movie_id: id, 
        },
        body: {
          value: starFull,
        },
      })
      .catch((e) => console.log(`${e.name} - ТЫ ЗАЕБАЛА МЕНЯ НАХУЙ УЖЕ `));

    setValueStar(data);
  };

  const handleClickStar = (star) => {
    setStarFull(star);
    movieRateStars();
  };

 
  return (
    <Rate
      count={10}
      defaultValue={0}
      className="stars"
      onChange={handleClickStar}
      valueStar={valueStar}
      starFull={starFull}
    />
  );
};
export default RatedList;
