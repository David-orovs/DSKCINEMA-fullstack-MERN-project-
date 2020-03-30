import React from 'react';
import { IMAGE_BASE_URL } from '../config';
import './movieitem.css'
import {Link} from 'react-router-dom'

export default function MovieItem(props) {
    let { actor, key, image, movieId, movieName, characterName  } = props
    const POSTER_SIZE = "w154";
    if (actor) {
        return (
            
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                </div>
           
        )
    } else {
        return (
            
                <div className='movieitem'>
                    <Link to={`/movie/${movieId}`} >
                        <img  alt={movieName} src={image} />
                    </Link>
                    <div style={{ position: 'absolute', maxWidth: '150px', bottom: '2rem', marginLeft: '20px' }}>
                {/* <h2 className='title'>{props.movieName}</h2> */}
                <div  className='book'><h1>BOOK NOW</h1></div>
                
                
            </div>     
                </div>
            
        )
    }
    


    
        // <div className='movieitem' style={{
        //     background: `url(${props.image})`
        // }}> 
        //     <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '80px' }}>
        //         <h2 className='title'>{props.movieName}</h2>
        //         <p className='text'>{props.text}</p>
        //         <div className='book'><h1>BOOK NOW</h1></div>
                
                
        //     </div>          
        // </div>
    

   
}
