import movieDataBase from '../movieDataBase'
const guestToken = async () => {
  if (localStorage.getItem('guest')) return
  const guestKey = await movieDataBase.get('/authentication/guest_session/new')
  localStorage.setItem('guest', `${guestKey.data.guest_session_id}`)
}

export default guestToken
