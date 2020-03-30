import React from 'react'
import './mainimage.css'
export default function MainImage(props) {
    return (
        <div style={{
            background: `url(${props.image})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            width: '100%',
            height: '580px',
            position: 'relative'
        }}> 
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '80px' }}>
                <h2 className='title'>{props.title}</h2>
                <p className='textt'>{props.text}</p>
                {/* <div className='book'><h1>BOOK NOW</h1></div> */}
                
                
            </div>          
        </div>
    )
}
