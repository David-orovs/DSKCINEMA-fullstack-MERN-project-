import React, { useEffect, useState, useRef} from 'react'
// import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './navbar.css';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import Authentication from './Authentication'
import BookedDropdown from '../Booked/sections/BookedDropdown'
import { useSelector,useDispatch } from "react-redux";

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hamburger/hooks';
import { GlobalStyles } from './hamburger/global';
import { theme } from './hamburger/theme';
import { Burger, Menu } from './hamburger/components';
import FocusLock from 'react-focus-lock';

export default function NavBar({currentUser}) {
  const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
  const [Hidden, setHidden] = useState(false)
  const toggleBooked = () => {
    // to make toggle button toggle
    setHidden(!Hidden)
}
  const [open, setOpen] = useState(false);
  // const node = useRef();
  const menuId = "main-menu";

// useOnClickOutside(node, () => setOpen(false));


  return (
    <>
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
    {/* <div className='mobilenavbar'>
     <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
        
      </>
     </ThemeProvider>
    </div> */}
  </>
    
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
  