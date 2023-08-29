import {useEffect, useState} from 'react';
import axios from 'axios';
import SongCard from './SongCard';
import './App.css'
import SearchIcon from './Search.svg';
import {Link} from 'react-router-dom';

function App() {
  const CLIENT_ID = "f629d88d37ad439e9e14fcbc41147756"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [album, setAlbums] = useState([])

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "album"
        }
    })
    console.log(data);
    setAlbums(data.albums.items)
  } 

  const renderArtists = () => {
    return (
        <div className="container">
            {album.map((album) => (<SongCard album={album}/>))}
        </div>
    )
  } 

  return (
      <div className="app">
        <h1>Spotify Manager</h1>
            {!token ?
                <Link to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}><button class="logInOutButton">Login
                    to Spotify</button> </Link>
                : <button onClick={logout} class="logInOutButton">Logout</button>}
             
            <div className="search">
            <form onSubmit={searchArtists}>
              <input 
                placeholder="Search for albums" 
                onChange={e => setSearchKey(e.target.value)}/>
              <img
                 src={SearchIcon}
                 alt="search"
                 type={"submit"}
                 onClick={searchArtists}
                />
            </form>
            </div>
            {renderArtists()}
      </div>
  );
}

export default App;