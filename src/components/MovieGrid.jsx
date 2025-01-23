import {React,useState} from "react";
import MovieCard from "./MovieCard";
export default function MovieGrid({movies , watchlist,toggleWatchlist})
{       const [searchInput,setSearchInput]=useState("");
        const [genre,setGenre]=useState("All Genre");
        const [rating,setRating]=useState("All");
        
        
        
        const filterGenre=movie=>genre==="All Genre"|| genre===movie.genre;

        const filterRating=movie=>{
            switch(rating){
                case "All":
                    return true;
                case "Good":
                    return movie.rating>=8;
                case "Ok":
                    return movie.rating<8 && movie.rating>=5;
                case "Bad":
                    return movie.rating<5;
            }
        }

        const filterSearchTerm=movie=> movie.title.toLowerCase().includes(searchInput.toLowerCase());
        
        
        
        
        let filteredMovies = movies.filter((movie) => 
          filterSearchTerm(movie)&& filterGenre(movie) && filterRating(movie)
    );
        
       
/*

My own try....:
---------------


step 1 filter with searchterm:
------------------------

 let filteredMovies = movies.filter((movie) => 
          movie.title.toLowerCase().includes(searchInput.toLowerCase()));

 step 2 filter with genre:
 ------------------------
        
        if(genre!="All Genre")
        {
            filteredMovies=filteredMovies.filter(movie=>movie.genre===genre)
        }



step 3 filter with rating:
--------------------------

        //rating filter functions
        const filterRating=(from,to)=>{
            filteredMovies=filteredMovies.filter(movie=>movie.rating>=from && movie.rating<to)
        }

        const settingRatingFilterParameters=(rating)=>{
            if (rating==="Good") filterRating(8, 11);
            else if (rating==="Ok") filterRating(5, 8);
            else filterRating(0, 5);
        }


        if(rating!="All")
        {
            settingRatingFilterParameters(rating)
        }


the code which is actually used uses only the filter function to filter the movies which takes the truth values of specfic filter functions like for genre,rating and searchterm
*/




        return (
          <div>
            <input
              type="text"
              className="search-input"
              onChange={(e) => setSearchInput(e.target.value)}      
              placeholder="search movies"
              value={searchInput}
            />
            <div className="filter-bar">
              <div className="filter-slot">
                <label><span className="filter-lable">Genre</span></label>
                <select className="filter-dropdown" value={genre} onChange={(e)=>{setGenre(e.target.value)}}>
                  <option>All Genre</option>
                  <option>action</option>
                  <option>drama</option>
                  <option>fantasy</option>
                  <option>horror</option>
                </select>
              </div>
              <div className="filter-slot">
              <label><span className="filter-lable">Rating</span></label>
                <select className="filter-dropdown" value={rating} onChange={(e)=>{setRating(e.target.value)}}>
                  <option>All</option>
                  <option>Good</option>
                  <option>Ok</option>
                  <option>Bad</option>
                </select>
              </div>
            </div>
            <div className="movies-grid">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)}></MovieCard>
              ))}
            </div>
          </div>
        );
        
}