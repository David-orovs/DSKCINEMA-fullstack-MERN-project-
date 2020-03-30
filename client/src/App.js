import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios';

import './App.css';
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import AboutUs from './views/AboutUs/AboutUs'
import Footer from './views/Footer/Footer'
import Cinemas from './views/Cinemas/Cinemas'
import MovieDetail from './views/MovieDetail/MovieDetail'
import RegisterPage from './views/Register/Register'
import LoginPage from './views/LoginPage/LogIn'
import Booked from './views/Booked/Booked'
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
function App() {

  const user = useSelector(state=>state.user)
  return (      
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path='/cinemas' component={Cinemas} />
          {/* <Route exact path='/cinemas' component={user.isLoggedIn?Cinemas:LoginPage} />           */}
          <Route exact path='/movie/:movieId' component={MovieDetail} />
          <Route exact path='/booked' component={Booked} />
        </Switch>
        <Footer />
      </div>
    
  );
}
export default App; 