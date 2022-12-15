import movieDataBase from '../movieDataBase'
const getAllMovies = async (query, page = 1) => {
  const { data } = await movieDataBase.get('/search/movie', {
    params: {
      query,
      page,
    },
  })

  return data
}
export default getAllMovies
