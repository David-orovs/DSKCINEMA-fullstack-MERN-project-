import React from 'react';
// import React from 'react';
import { Menu, Divider } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { USER_SERVER } from '../../components/config';
import { withRouter } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
// const Upload = require('../../../../assets/images/upload.png');
import { logoutUser } from "../../actions/actions";


export default function Authentication(props) {
  const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
  const  logoutHandler = async () => {
    await dispatch(logoutUser())
    // axios.get(`http://localhost:5010/api/users/logout`).then(response => {
    //   if (response.status === 200) {
    //     props.history.push("/login");
    //   } else {
    //     alert('Log Out Failed')
    //   }
    // });
  };

//   if (user.userData && !user.userData.isAuth) {
    return (
    <>
    {user.isLoggedIn && <div className='auth' style={{cursor:'pointer', marginRight:'20px'}} onClick={logoutHandler}>LOG OUT</div>}
       {!user.isLoggedIn &&  <>
        <Link MODE={props.mode} className='auth' to="/login">
         LOG IN
      </Link>
      <Link MODE={props.mode} className='auth' to="/register">
         REGISTER
      </Link></>}
    </>
      
      
    )
// }
//      else {
//     return (
//     <Link MODE={props.mode} className='auth'  onClick={logoutHandler}>
//         LOGOUT
//      </Link>
//     )
//   }
}
