import { useState,useEffect } from 'react';
import Cookies from "js-cookie";
import { BrowserRouter as Router,Route,Link,Routes, useNavigate } from 'react-router-dom';
import './styles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGrid from './components/MovieGrid';
import Watchlist from './components/Watchlist';
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp';
import logOut from './utils/logout';
function App() {
  const [movies,setMovies]=useState([]);
  const [watchlist,setWatchlist]=useState([]); //stores the movies as movie id
  const [isloggedin,setLoggedIn]=useState(false);
  const [currentUser,setCurrentUser]=useState('');
  const navigate=useNavigate('')



    useEffect(() => {
      async function fetchMovies() {
        try {
          const response = await fetch("/movies.json");
          if (!response.ok) {
            throw new Error("failed to retrieve moives list ");
          }
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error("Error", error);
        }
      }

      fetchMovies();
    }, []);



    useEffect(()=>{
      const currentUserName=localStorage.getItem("currentUserName");
      if(currentUserName)
        {
          setCurrentUser(currentUserName);
          setLoggedIn(true);
        }
    } ,
      []);


    useEffect(()=>{
      async function fetchWatchList()
      { 
        console.log(`isloggedin in fetch watchlist ${isloggedin}`);
        try {
          const url="http://127.0.0.1:8000/watchlist/";
          const options={
            headers:{
              'Content-Type':'application/json',
              'Authorization' : `JWT ${localStorage.getItem('accessToken')}`
            },
          }
          const response = await fetch(url,options);
          if (!response.ok) {
            throw new Error("failed to retrieve watch list ");
          }
          else{
            const data = await response.json();
            console.log(`fetched movies ids: ${data}`);
            const watchlistmovies=data.map((movie,index)=>{
              return movie.movie
            })
            console.log(watchlistmovies);
            localStorage.setItem("watchListMovies",JSON.stringify(watchlistmovies));
          }
            
          
        } catch (error) {
          if(currentUser!=="")
          {
            console.error("Error", error);
          }
        }
      }
      if(isloggedin===true)
      {
        fetchWatchList();
      }
      },[isloggedin]);



    useEffect(
      ()=>{
        const watchListMovies=localStorage.getItem("watchListMovies");
        if(watchListMovies)
          {
            //setWatchlist(JSON.parse(watchListMovies));
            try {
              const parsedMovies = JSON.parse(watchListMovies);
              if (Array.isArray(parsedMovies)) {
                setWatchlist(parsedMovies);
              } else {
                console.error("watchListMovies is not an array:", parsedMovies);
                setWatchlist([]);
              }
            } catch (error) {
              console.error("Error parsing watchListMovies from localStorage:", error);
              setWatchlist([]);
            }
          }
      }
      
      ,[]);



      async function watchListHandle(movieId,option)
      {
          const url=`http://127.0.0.1:8000/watchlist/${movieId}/`;
          const response=await fetch(url,option)
          if(!response.ok)
          { console.log(response)
            const error=await response.json();
            console.error(error.details);
          }
          return response;
      }




    const toggleWatchlist=async(movieId)=>
    { let option;
      if(watchlist.includes(movieId))
      { 
        option={
          headers:{
            'Content-Type':'application/json',
            'Authorization' : `JWT ${localStorage.getItem('accessToken')}`
          },
          method:'DELETE',
        };
      }
      else{
          option={
              headers:{
                'Content-Type':'application/json',
                'Authorization' : `JWT ${localStorage.getItem('accessToken')}`
              },
              method:'POST',
              body:JSON.stringify({})
          };
      }
      const response=await watchListHandle(movieId,option);
      if(response.ok)
      {
        setWatchlist(prev=>{
          return prev.includes(movieId)?prev.filter(id=>id!=movieId):[...prev,movieId]
        })
      }
      //it checks if the watchlist  already contains the movie we are toggling if so it removes it else it adds it to the list
      //it checks the previous state if it includes the id (checks if the previous state which is an array contains an movieid element)
      //if so then use filter method to remove that element else append it 
      //NOTE: states are immutable u cant change states directly instead u give a new value
      // in this case we are using a new array which contains elements of previous state's array (implemented using spread operator)
      //and also the new id at last
  }





return (
    <>
    <div className="App">
      <div className='container'>
        <Header />
        <div className='main'>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to=''>Home</Link>
              </li>
              <li>
                <Link to='/watchlist'>Watchlist</Link>
              </li>
              <li>
              {
                isloggedin?(<button onClick={()=>{logOut(setCurrentUser,setLoggedIn,setWatchlist);
                  navigate('/login');
                }}>Log out</button>):(<Link to='/login'>Log in </Link>)
              }
              </li>
              
            </ul>
          </nav>
          <Routes>
          <Route path="" element={<MovieGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} isloggedin={isloggedin} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}></MovieGrid>}></Route>
          <Route path="/watchlist" element={<Watchlist movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} isloggedin={isloggedin}></Watchlist>}></Route>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}></Login>}></Route>
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}></SignUp>}></Route>
          <Route path='/logout' element></Route>
          </Routes>
        </Router>
        </div>
      </div>
      <Footer></Footer>
    </div>
    </>
  )
}
export default App;
