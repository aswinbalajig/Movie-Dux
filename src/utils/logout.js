export default function logOut(setCurrentUser,setLoggedIn,setWatchList)
{
    setCurrentUser("");
    setLoggedIn(false);
    localStorage.clear();
    setWatchList([]);
}