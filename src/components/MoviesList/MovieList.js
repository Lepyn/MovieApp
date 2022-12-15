/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react'
import MovieCard from '../MoviesCard/MovieCard'
import SearchInput from '../SearchInput/SearchInput'
import Loading from '../Loading/Loading'
import NoInternetLoading from '../NoInternetLoading/NoInternetLoading'
import NotFoundFilms from '../NotFoundFilms/NotFoundFilms'
import Pagination from '../Page/Pagination/Pagination'
import guestToken from '../../Services/ServicesMovie/guestToken'
import getAllMovies from '../../Services/ServicesMovie/getAllMovies'
import { debounce } from 'lodash'

const MovieList = () => {
  const [allFilms, setAllFilms] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)
  const [searchMovieValue, setSearchMovieValue] = useState()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const getMoviesDebounce = useCallback(
    debounce(async (value = 'return', page) => {
      if (value.trim() === '') return
      setLoading(true)
      setIsEmpty(false)
      try {
        const data = await getAllMovies(value, page)
        if (data.results.length === 0) {
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
          setAllFilms(data.results)
          setTotalPage(data.total_pages)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }, 300),
    [],
  )

  const searchResult = async (value, page = 1) => {
    setSearchMovieValue(value)
    setPage(page)
    getMoviesDebounce(value, page)
  }

  useEffect(() => {
    searchResult(searchMovieValue)
    guestToken()
  }, [])

  return (
    <>
      <NoInternetLoading />
      <SearchInput
        value={searchMovieValue}
        onChange={(e) => {
          searchResult(e.target.value)
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!isEmpty && (
            <>
              <ul className="movies">
                <>
                  {allFilms.map((searchMovie, index) => {
                    return <MovieCard key={index} {...searchMovie} />
                  })}
                </>
              </ul>
              <Pagination
                total_pages={totalPage}
                current={page}
                onChange={(newPage) => {
                  search(searchMovieValue, newPage)
                }}
              />
            </>
          )}
          {isEmpty && <NotFoundFilms />}
        </>
      )}
    </>
  )
}

export default MovieList
