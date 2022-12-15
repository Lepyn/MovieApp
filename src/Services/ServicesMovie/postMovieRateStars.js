import movieDataBase from '../movieDataBase'

const postMovieRateStars = async (starFull, id) => {
  const data = await movieDataBase
    .post(
      `/movie/${id}/rating`,
      {
        value: starFull,
      },
      {
        params: {
          guest_session_id: localStorage.getItem('guest'),
        },
      },
    )
    .catch((e) => console.log(`${e.name} - вы убрали оценку фильма!`))
}

export default postMovieRateStars
