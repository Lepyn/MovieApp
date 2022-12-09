const Rating = ({ precent }) => {
  return <div>{precent.toFixed(1) ? precent.toFixed(1) : 'NR'}</div>
}
export default Rating
