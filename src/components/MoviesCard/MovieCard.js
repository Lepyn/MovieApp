import { format } from "date-fns";
import Rating from "../Rating/Rating";

const showImage = (posters) => {
  if (posters === null) return console.log("ЕБАТЬ");
  return `https://image.tmdb.org/t/p/original/${posters}`;
};

const card = ({
  poster_path,
  original_title,
  title,
  vote_average,
  release_date,
  overview,
}) => {
  const today = format(new Date(release_date), "MMMM d, yyyy");

  const hiddenText =
    overview.length > 200
      ? overview.slice(0, overview.indexOf(" ", 100)) + "..."
      : overview;
  const noDescription = overview.length === 0 ? "Нахуй давай" : hiddenText;

  const bar = {
    low: "solid 2px #FF0000",
    medium: "solid 2px #FFD700",
    high: "solid 2px #00FF00",
    none: "solid 2px #666666",
  };

  const getColor = (vote_average) => {
    if (vote_average >= 7) return "high";
    if (vote_average >= 4) return "medium";
    if (vote_average > 0) return "low";
    return "none";
  };

  return (
    <div>
      <div className="movies__card">
        <img src={showImage(poster_path)} alt={title} className="movies__img" />
        <div className="movies__description">
          <h5 className="movies__name">{original_title || title}</h5>
          <div
            className="movies__rate"
            style={{ border: bar[getColor(vote_average)] }}
          >
            <Rating precent={vote_average} />
          </div>
          <p className="movies__date">{today}</p>
          <p className="movies__jenres">
            <span className="movies__jenre">Drama</span>
            <span className="movies__jenre">Action</span>
          </p>
          <p className="movies__intro">{hiddenText}</p>
        </div>
      </div>
    </div>
  );
};

export default card;
