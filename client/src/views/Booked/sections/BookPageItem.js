import React from 'react';
import './BookePageItem.css';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../components/config';
import axios from 'axios';

export default function BookPageItem(Book, ...otherBookedProps) {
   
    return (
        // <div className='booked'>
        //   {Book.moviePost ?
        //       <div className='bookitem'>
        //           <img className='bookitem__img' src={`${IMAGE_BASE_URL}${POSTER_SIZE}${Book.moviePost}`} />
        //           <span className='item__details'>{Book.movieTitle}</span>
        //       </div>              
        //       : "no image"}
            
        // </div>


        <div >
            {Book.moviePost ?
                <div className='booked--item'>
                    <div className='image--container'>
                        <img className='bookpage__img' src={`${IMAGE_BASE_URL}${POSTER_SIZE}${Book.moviePost}`} />
                    </div>
                    <span className='name'>{Book.movieTitle}</span>
                    <div>$10</div>
                </div>
               : "no image"}
        </div>
    )
}
