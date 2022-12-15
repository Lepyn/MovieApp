import { useState } from 'react'
import { Rate } from 'antd'
import movieRateStars from '../../Services/ServicesMovie/postMovieRateStars'

const RatedList = ({ id }) => {
  const localGetRating = localStorage.getItem('str')
  const ratedCards = JSON.parse(localGetRating)

  let res = []
  if (ratedCards) {
    res = ratedCards.filter((elem) => {
      return elem.id === id
    })
  }
  const aver = res.length > 0 ? res[0].rating : 0
  const handleClickStar = (star) => {
    movieRateStars(star, id)
  }

  return <Rate key={id} count={10} defaultValue={aver} className="stars" onChange={handleClickStar} />
}
export default RatedList
