import React, { useEffect, useState } from 'react'
import axios from 'axios';

import CustomButton from '../../../components/CustomButton/CustomButton'
import { useSelector } from 'react-redux';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
// to save token
function Booked(props) {
    const user = useSelector(state => state.user)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
// from fav models
    const [BookNumber, setBookNumber] = useState(0)
    const [Book, setBooked] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickBook = () => {

        if (!user.isLoggedIn) {
            return alert('Please Log in first');
        }

        if (Book) {
            //when we are already subscribed 
            axios.post('http://localhost:5010/api/booked/removeFrombooked', variables)
                .then(response => { 
                    if (response.data.success) {
                        setBookNumber(BookNumber - 1)
                        setBooked(!Book)
                    } else { 
                        alert('Failed to Remove From Booked')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('http://localhost:5010/api/booked/addTobooked', variables)
                .then(response => {
                    if (response.data.success) {
                        setBookNumber(BookNumber + 1)
                        setBooked(!Book)
                    } else {
                        alert('Failed to Add To Booked')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('http://localhost:5010/api/booked/bookedNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setBookNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get Booked Number')
                }
            })

        axios.post('http://localhost:5010/api/booked/booked', variables)
            .then(response => {
                if (response.data.success) {
                    setBooked(response.data.subcribed)
                } else {
                    alert('Failed to get Booked Information')
                }
            })

    }, [])


    return (
        <>
            <CustomButton onClick={onClickBook}>  {!Book ? "Add to Booked": "Not Book"}  {BookNumber} </CustomButton>
           
        </>
    )
}

export default Booked

