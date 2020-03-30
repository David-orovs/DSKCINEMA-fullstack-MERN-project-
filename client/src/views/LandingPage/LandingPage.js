import React, { useEffect, useState, } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../components/config'
import MainImage from '../../components/MainImage/MainImage';
import './landingpage.css'
import MovieItem from '../../components/MovieItem/MovieItem'
import LoadingSpinner from '../../UIElement/LoadingSpinner'


export default function LandingPage() {
//   const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
// eslint-disable-next-line    
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        // to fetch the popular movies from movie db
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    // }, [])


    const fetchMovies = (endpoint) => {
// this fetches movies and load more loads more 
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results])
                // we .... spread it so it keeps the old pics in new load
                setMainMovieImage(MainMovieImage || result.results[0])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
// eslint-disable-next-line 
    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);

    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked')
            // buttonRef.current.click();

        }
    }

// objectfit: cover; width 100% ; height:100% for image but set width and height for div
    return (
        <div  >
            <div style={{width:'100%', padding:'2px', }}>
            {MainMovieImage ?
                <MainImage
                // when you consolelog response you see these params now use them to make props below copy this div exactly cos that mainmovieimage is important 
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                /> : <LoadingSpinner />

            }

            </div>
         
           <div className='contact'>   
           CUSTOMER SERVICE: 03890978756 & 08157689000 : 9:00AM - 9:00PM</div> 
           <div> 
               <p className="text">LATEST MOVIES</p>
                <hr />
            <div className='latest'>
               {Movies ? Movies.map((movie, index) => (
                        <MovieItem
                              key={index}
                              image={movie.poster_path ?
                                `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                : null}
                            movieId={movie.id}
                            movieName={movie.original_title}/> 
                            
                       
                    )):<LoadingSpinner />}
            </div>
           </div>
           

        </div>
        
    )
}
