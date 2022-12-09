import React, { useEffect, useState } from 'react'
import movieDataBase from '../../Services/movieDataBase'
import MovieCard from '../MoviesCard/MovieCard'
import SearchInput from '../SearchInput/SearchInput'
import Loading from '../Loading/Loading'
import NoInternetLoading from '../NoInternetLoading/NoInternetLoading'
import Cat from '../Cat/Cat'
import Pagination from '../Page/Pagination/Pagination'

const MovieList = () => {
  const [allFilms, setAllFilms] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)
  const [datas, setDatas] = useState([])

  const guestToken = async () => {
    if (localStorage.getItem('guest')) return
    const guestKey = await movieDataBase.get('/authentication/guest_session/new')
    localStorage.setItem('guest', `${guestKey.data.guest_session_id}`)
  }
  const allFetchMovies = async (text = 'return') => {
    try {
      const { data } = await movieDataBase.get('/search/movie', {
        params: {
          query: text,
        },
      })

      if (data.results.length === 0) return setIsEmpty(false)
      else {
        setIsEmpty(true)
        setLoading(false)
        setAllFilms(data.results)
        setDatas(data)
      }
    } catch (e) {
      console.log(`Ошибка ${e}`)
    }
  }

  useEffect(() => {
    allFetchMovies()
    guestToken()
  }, [])

  return (
    <>
      <NoInternetLoading />
      <SearchInput allFetchMovies={allFetchMovies} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isEmpty && (
            <>
              <ul className="movies">
                <>
                  {allFilms.map((searchMovie, index) => {
                    return <MovieCard key={index} {...searchMovie} />
                  })}
                </>
              </ul>
              <Pagination datas={datas} allFetchMovies={allFetchMovies} />
            </>
          )}
          {!isEmpty && <Cat />}
        </>
      )}
    </>
  )
}

export default MovieList
