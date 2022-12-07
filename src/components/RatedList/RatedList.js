// import MovieCard from "../MoviesCard/MovieCard";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import movieDataBase from "../../Services/movieDataBase";

const RatedList = ({id}) => {
  // const [valueStar, setValueStar] = useState([]);
  const [starFull, setStarFull] = useState(0);

  const movieRateStars = async (starFull) => {
    const data = await movieDataBase
      .post(
         `/movie/${id}/rating`,
        {
          value: starFull,
        },
        {
          params: {
            guest_session_id: localStorage.getItem("guest"),
            session_id: localStorage.getItem('session')
          },
        }
      )
      .catch((e) => console.log(`${e.name} - ТЫ ЗАЕБАЛА МЕНЯ НАХУЙ УЖЕ `));
  };

  const handleClickStar = (star) => {
    setStarFull(star);
    movieRateStars(star);
  };

  return (
    <Rate
      count={10}
      defaultValue={0}
      className="stars"
      onChange={handleClickStar}
      // valueStar={valueStar}
      starFull={starFull}
    />
  );
};
export default RatedList;
