import { useEffect, useContext } from "react";
import { AuthContext } from '../../context/auth.context';


const Favs = ({favs, deleteFav, getFavs}) => {
  const {user} = useContext(AuthContext)

  useEffect(() => {
    console.log("user", user)
    user && getFavs()
  }, [user]);

  return (
    <div>
    <h1>Favs</h1>
    {favs && favs.map((fav) => (
      <div>
        <p>{fav.model}</p>
        <button onClick={() => {deleteFav(fav)}}>Remove</button>
      </div>
    ))}
    </div>
  )
}

export default Favs
