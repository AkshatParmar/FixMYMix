import React, { useState, useEffect } from "react" ;
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Themes" ;


function App() {
  const [theme, setTheme] = useState('light')
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light') }  
    //const icon= props.theme === "light" ? <HiMoon size={40} /> : CgSun size={40}/>;
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}> 
      <>
      <GlobalStyles/>
      <button onClick={themeToggler}>Switch Theme</button>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
    </>
    </ThemeProvider>//added
  )
}

export default App