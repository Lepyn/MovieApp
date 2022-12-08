import { useEffect, useState } from "react";
import { format } from "date-fns";
import Rating from "../Rating/Rating";
import Loading from "../Loading/Loading";
import RatedList from "../RatedList/RatedList";
import Context from "../../Context/Context";

const Сard = ({
  poster_path,
  original_title,
  title,
  vote_average,
  release_date,
  overview,
  id,
  genre_ids,
}) => {
  console.log(genre_ids);
  const showImage = () => {
    if (poster_path === null)
      return "https://cdn.fishki.net/upload/post/2022/11/30/4311893/3-5.jpg";
    return `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const formatData = (data) => {
    if (!data) return null;
    return format(new Date(data), "MMMM d, yyyy");
  };

  const hiddenText =
    overview.length > 200
      ? overview.slice(0, overview.indexOf(" ", 100)) + "..."
      : overview;
  const noDescription = overview.length === 0 ? "Нет описания" : hiddenText;

  const bar = {
    none: "solid 2px #E90000",
    low: "solid 2px #E97E00",
    medium: "solid 2px #E9D100",
    high: "solid 2px #66E900",
  };

  const getColor = (vote_average) => {
    if (vote_average > 7) return "high";
    if ((vote_average > 5) & (vote_average < 7)) return "medium";
    if ((vote_average > 3) & (vote_average < 5)) return "low";
    if ((vote_average > 0) & (vote_average < 3)) return "none";
  };

  let getRightGenres = (
    <Context.Consumer>
      {(value) => {
        if (value) {
          let genresArr = genre_ids.map((item) => {
            let findElem = value.find((el) => el.id === item);
            return findElem.name;
          });
          let genresPrepared = genresArr.slice(0, 3).map((name, id) => {
            return (
              <span key={id} className="movies__jenre">
                {name}
              </span>
            );
          });
          return genresPrepared;
        }
      }}
    </Context.Consumer>
  );

  return (
    <li className="movies__card">
      {loading ? (
        <Loading />
      ) : (
        <img
          src={showImage(poster_path)}
          style={{ height: "281px" }}
          alt={title}
          className="movies__img"
        />
      )}
      <div className="movies__description">
        <h5 className="movies__name">{original_title || title}</h5>
        <div
          className="movies__rate"
          style={{ border: bar[getColor(vote_average)] }}
        >
          <Rating precent={vote_average} />
        </div>
        <p className="movies__date">{formatData(release_date)}</p>
        <p className="movies__jenres">{getRightGenres}</p>
        <p className="movies__intro">{hiddenText}</p>
        <RatedList id={id} />
      </div>
    </li>
  );
};

export default Сard;
