import React, { useState, useEffect } from 'react'
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [clientID, setClientID] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.date);
    });
  }, []);

  useEffect(() => {
    fetch('/info').then(res => res.json()).then(data => {
      setClientID(data.client_id);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">


        <p>The current date time is {currentTime}.</p>
        <p>The client ID is {clientID}</p>
      </header>
    </div>
  );
     
  // return (
  //   <Container
  //     className="d-flex align-items-center justify-content-center"
  //     style={{ minHeight: "100vh" }}
  //   >
  //     <div className="w-100" style={{ maxWidth: "1200px" }}>
  //       <Router>
  //         <AuthProvider>
  //           <Switch>
  //             <PrivateRoute exact path="/" component={Dashboard} />
  //             <PrivateRoute path="/update-profile" component={UpdateProfile} />
  //             <Route path="/signup" component={Signup} />
  //             <Route path="/login" component={Login} />
  //             <Route path="/forgot-password" component={ForgotPassword} />
  //           </Switch>
  //         </AuthProvider>
  //       </Router>
  //     </div>
  //   </Container>
  // )
}

export default App