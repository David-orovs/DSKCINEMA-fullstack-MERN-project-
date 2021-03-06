import React from 'react';
// the isgooglesignin is props for database
import './custombutton.css';

const CustomButton = ({ children,  ...otherProps }) => (
  <button
    className={`custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
