import React from 'react'
import './mainimage.css'
export default function MainImage(props) {
    return (
        <div className='mainmovieimage' style={{
            background: `url(${props.image})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            width: '100%',
            height: '580px',
            position: 'relative'
        }}> 
            <div className="image__textt" >
                <h2 className='title'>{props.title}</h2>
                <p className='textt'>{props.text}</p>
                {/* <div className='book'><h1>BOOK NOW</h1></div> */}
                
                
            </div>          
        </div>
    )
}
