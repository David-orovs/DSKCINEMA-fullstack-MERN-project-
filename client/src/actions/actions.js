import axios from 'axios';
// here is the action we defined in our reducers, this is what it does
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/config';

export function registerUser(dataToSubmit){
// data defined in register route
    const request = axios.post(`http://localhost:5010/api/users/register`,dataToSubmit)
        .then(response =>{
    localStorage.setItem('token',response.data.token)
    return response.data
        });
        
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit){
  try {
      console.log('oubgk')
    const request = await axios.post(`http://localhost:5010/api/users/login`,dataToSubmit)
    console.log(request)
    const response = request.data
    localStorage.setItem('token',response.token)
    return {
        type: LOGIN_USER,
        payload: response
    }
  } catch (error) {
      console.log(error)
  }
}

export function auth(){
    const request = axios.get(`http://localhost:5010/api/users/auth`)
    .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`http://localhost:5010/api/users/logout`)
    .then(response => response.data);
    localStorage.removeItem('token')

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

