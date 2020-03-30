import React, { useEffect, useState } from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton';
import axios from 'axios';
import './bookeddropdown.css';
import BookItem from './BookItem'
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../components/config';

import { Link } from 'react-router-dom';



export default function BookedDropdown() {
  
    const user = useSelector(state => state.user)
    const [Booked, setBooked] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
    fetchBookedMovie()
    }, [])

    const fetchBookedMovie = () => {
        console.log(localStorage.getItem('token'))
        axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    axios.post('http://localhost:5010/api/booked/getbookedMovie', variable)
        .then(response => {
      console.log(response.data)
            if (response.data) {
                console.log(response.data.booked)
                setBooked(response.data.booked)
                setLoading(false)
            } else {
                alert('Failed to get subscription videos')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {

    const variables = {
        movieId: movieId,
        userFrom: userFrom,
    }

    axios.post('http://localhost:5010/api/booked/removeFrombooked', variables)
        .then(response => {
            if (response.data) {
                fetchBookedMovie()
            } else {
                alert('Failed to Remove From booked')
            }
        })
    }
    const renderCards = Booked.map((Book, index) => {

    return (
      <div  className='bookeddropdownn'>
          <div className='booked'>
          {Book.moviePost ?
              <div key={index} className='bookitem'>
                  <img className='bookitem__img' src={`${IMAGE_BASE_URL}${POSTER_SIZE}${Book.moviePost}`} />
                  <span className='item__details'>{Book.movieTitle}</span>
              </div>              
              : "no image"}
          </div>
          
      </div>
    )
   }
    )

  return (
    // <div>{renderCards}</div>
    <div className='bookeddropdownn'>
        {Booked.map(({index, ...otherBookedProps }) =>(
            <BookItem key={index} {...otherBookedProps} />
        ))}
        <Link to='/booked'>
            <CustomButton>GO TO BOOKED PAGE</CustomButton>
        </Link>
    </div>
  )
}
   

   