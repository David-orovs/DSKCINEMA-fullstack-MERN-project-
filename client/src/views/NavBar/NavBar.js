import React, { useEffect, useState, } from 'react'
// import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './navbar.css';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import Authentication from './Authentication'
import BookedDropdown from '../Booked/sections/BookedDropdown'
import { useSelector,useDispatch } from "react-redux";

export default function NavBar({currentUser}) {
  const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
  const [Hidden, setHidden] = useState(false)
  const toggleBooked = () => {
    // to make toggle button toggle
    setHidden(!Hidden)
}

  return (
    <div className='navbar'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
        <span className="logo-text">DSK CINEMA</span>
      </Link>
      <div className='options'>
        <Link className='movieList' to='/aboutus'>
          ABOUT US
        </Link>     
        <Link className='auth' to='/cinemas'>
          CINEMAS
        </Link>
        <Authentication />
        {user.isLoggedIn &&  <>
          <Link className='auth'  onClick={toggleBooked} style={{position: 'relative'}}>
          BOOKED
        </Link>
        <div>
        {Hidden? <BookedDropdown /> : null
          }
      </div>
        </>}
        
        
      </div>
      
    </div>
  )
}



// const NavBar = ({ currentUser }) => (
//     <div className='navbar'>
//       <Link className='logo-container' to='/'>
//         <Logo className='logo' />
//         <span className="logo-text">DSK CINEMA</span>
//       </Link>
//       <div className='options'>
//         <Link className='movieList' to='/aboutus'>
//           ABOUT US
//         </Link>
//         <Link className='auth' to='/booked'>
//           BOOKED
//         </Link>
//         <Link className='auth' to='/cinemas'>
//           CINEMAS
//         </Link>
//         <Authentication />
//       </div>
//     </div>
//   );
  
//   export default NavBar;
  