import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import './booked.css';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../components/config'
import BookPageItem from './sections/BookPageItem';


export default function Booked() {
    const user = useSelector(state => state.user)
    const [Booked, setBooked] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
    fetchBookedMovie()
    }, [])

    const fetchBookedMovie = () => {
 
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

    const onClickDelete = (movieId) => {

        const variables = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId'),
        }
    
        axios.post('http://localhost:5010/api/booked/removeFrombooked', variables)
            .then(response => {
                console.log(response)
                if (response.data) {
                    fetchBookedMovie()
                } else {
                    alert('Failed to Remove From booked')
                }
            }).catch(err=>{
 console.log(err)
            })
    }
    const bookCards = Booked.map((Book, index) => {

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
   })
    return (
        <div className='booked__page'>
            <div style={{width:'100%', textAlign:'center'}}>
            <h1>MY BOOKED MOVIES</h1>
            <hr></hr>
            </div>
            
            {Booked.map(({index, ...otherBookedProps }) =>{
             
                return(
            <React.Fragment>
                <BookPageItem key={index}  {...otherBookedProps} />
                <div className='remove-button' onClick={()=>{
                    onClickDelete(otherBookedProps.movieId)
                }}>
                &#10005;
                </div>
            </React.Fragment>
            
            )})}
            <div className='total'>TOTAL: ${Booked.length*10}</div>
            <div>
            <img alt="Visa Checkout" class="v-button" role="button" src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"></img>
            </div>
         </div>
    )
}
