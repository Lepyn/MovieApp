/* eslint-disable */
import Context from '../../Context/Context'

const Genres = ({ genre_ids }) => {
  return (
    <p className="movies__jenres">
      {' '}
      <Context.Consumer>
        {(value) => {
          if (value) {
            let genresArr = genre_ids.map((item) => {
              const findElem = value.find((el) => el.id === item)
              return findElem?.name
            })
            let genresPrepared = genresArr.slice(0, 3).map((name, id) => {
              return (
                <span key={id} className="movies__jenre">
                  {name}
                </span>
              )
            })
            return genresPrepared
          }
        }}
      </Context.Consumer>
    </p>
  )
}

export default Genres
