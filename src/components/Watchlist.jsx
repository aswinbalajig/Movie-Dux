import React from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
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
