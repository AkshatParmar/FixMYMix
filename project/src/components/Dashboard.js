import React, { useState } from "react"
import { Card,CardDeck, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import logo from "../assets/logo.png" ;
import queryString from 'query-string';
import "./imgStyles.css";


const parsed = queryString.parse(window.location.search);
const access_token = parsed.access_token;

fetch('https://api.spotify.com/v1/me', {
  headers: {'Authorization': 'Bearer ' + access_token}
}).then(response => response.json())
.then(data => console.log(data))

fetch('https://api.spotify.com/v1/me/playlists', {
  headers: {'Authorization': 'Bearer ' + access_token}
}).then(response => response.json())
.then(data => console.log(data))


export default function Dashboard() {
   
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  
  return (
    <>
    
      <Card className="bg-dark text-white"> 
      <img alt="logo" className="photo" src={logo}></img>
        <Card.Body>
        
          <h2 className="text-center mb-4">Fix My Mix Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Spotify Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </Card.Body>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      
      {/* Login with Spotify button*/}
      <button onClick={() => window.location='http://localhost:8888/login' }
      style={{padding: '20px','font-size': '30px', 'margin-top': '20px'}}>
        Authenticate with Spotify
      </button>
      </div>

      <div className="w-100 text-center mt-2">
        {/* <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button> */}
      </div>
      <CardDeck>
  <Card className="bg-dark text-white">
 
    <Card.Body>
    <Card.Title>Recent Playlist</Card.Title>

    <iframe src="https://open.spotify.com/embed/playlist/1sx7Ta4yIG7tXOscFKqalB" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    {/* <iframe src="" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
 
    {/* "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd" */}
      <Card.Text>
          Your most recently played playlist
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Button variant="primary">Play Now</Button>
    <div></div>
    <small className="text-muted">Spotify Playlist</small>
    </Card.Footer>
  </Card>
 
  <Card className="bg-dark text-white">
    <Card.Body>
      <Card.Title>Fix'd Mix Playlist</Card.Title>
      
      <Card.Text>
        Click "Get Recommendation" to experience your AI tailored playlist!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Button variant="primary">Get Recommendation</Button> 
    <div></div>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardDeck>

    </>
  )
  }