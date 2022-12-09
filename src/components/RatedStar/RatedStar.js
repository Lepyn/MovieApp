import { useState } from "react";
import { Rate } from "antd";
import movieDataBase from "../../Services/movieDataBase";

const RatedList = ({ id }) => {
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
          },
        }
      )
      .catch((e) => console.log(`${e.name} - вы убрали оценку фильма!`));
  };
  const localGetRating = localStorage.getItem("str");
  const ratedCards = JSON.parse(localGetRating);

  let res = [];
  if (ratedCards) {
    res = ratedCards.filter((elem) => {
      return elem.id === id;
    });
  }
  const aver = res.length > 0 ? res[0].rating : 0;

  const handleClickStar = (star) => {
    setStarFull(star);
    movieRateStars(star);
  };

  return (
    <Rate
      count={10}
      defaultValue={aver}
      className="stars"
      onChange={handleClickStar}
      starFull={starFull}
    />
  );
};
export default RatedList;
