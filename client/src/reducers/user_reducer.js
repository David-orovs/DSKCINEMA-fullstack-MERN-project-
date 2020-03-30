import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../../src/actions/types';

const checkAuth = ()=>{
const value = JSON.stringify(localStorage.getItem('token'))
if(value === undefined || value === null){
    return null
}
const token = JSON.parse(value)
return token
}
 
// state={} sets an empty default state value and basically if case is related, return action.payload
export default function(state={
    isLoggedIn:checkAuth()
},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state,userId:action.payload.userId,isLoggedIn:true}
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state,isLoggedIn:false}
        default:
            return state;
    }
}