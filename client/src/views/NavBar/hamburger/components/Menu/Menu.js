import React, { useEffect, useState, }  from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';
import { ReactComponent as Logo } from '../../../../../assets/crown.svg';
import Authentication from '../../../Authentication'
import BookedDropdown from '../../../../Booked/sections/BookedDropdown'
import { useSelector,useDispatch } from "react-redux";

import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({currentUser, open, ...props }) => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  
  const [Hidden, setHidden] = useState(false)
  const toggleBooked = () => {
  // to make toggle button toggle
  setHidden(!Hidden)
}
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
       <Link className='logo-container' to='/' tabIndex={tabIndex}>
        <Logo className='logo' />
        <span className="logo-text">DSK CINEMA</span>
      </Link>
      <div className='options'>
        <Link className='movieList' to='/aboutus' tabIndex={tabIndex}>
          ABOUT US
        </Link> 
      </div>    
      <div>
      <Link className='auth' to='/cinemas' tabIndex={tabIndex}>
          CINEMAS
        </Link>
      </div>
       
        
      
    </StyledMenu>
      
    
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
