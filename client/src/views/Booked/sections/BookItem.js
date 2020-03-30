import React from 'react';
import './bookitem.css'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../components/config'

export default function BookItem(Book, ...otherBookedProps) {
    return (
        <div className='booked'>
          {Book.moviePost ?
              <div className='bookitem'>
                  <img className='bookitem__img' src={`${IMAGE_BASE_URL}${POSTER_SIZE}${Book.moviePost}`} />
                  <span className='item__details'>{Book.movieTitle}</span>
              </div>              
              : "no image"}
            
        </div>
    )
}
