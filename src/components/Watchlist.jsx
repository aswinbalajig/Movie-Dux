import React, { useEffect } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

export default function Watchlist({ movies, watchlist, toggleWatchlist,isloggedin}) {
    const navigate=useNavigate();
    useEffect(()=>{
          if(!isloggedin)
          {console.log('not logged in when in watchlist.jsx')
            navigate('/login');
          }
    },[]);


    return (
        <div className='watchlist'>
            {watchlist.map((movieid) => {
                const movie = movies.find((movie) => movie.id === movieid);
                return (
                    <MovieCard 
                        key={movieid} 
                        movie={movie} 
                        isWatchlisted={true} 
                        toggleWatchlist={toggleWatchlist} 
                    />
                );
            })}
        </div>
    );
}
