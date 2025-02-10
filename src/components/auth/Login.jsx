import { useState,React} from "react";
import { useNavigate } from "react-router-dom";
import login from "../../utils/login";
import { Link } from "react-router-dom";
export default function Login({setLoggedIn,setCurrentUser,isloggedin})
{   const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(`isloggedin when entering login component : ${isloggedin}`)
            const check=login(setCurrentUser, setLoggedIn, username, password,isloggedin);
            check&&navigate('');
          }}
        >
          <div>
            <label>username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>

          <div>
            <label>password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button type="submit">Login</button>
        </form>
        <div>
          <p>new user? then signup..</p>
          <Link to="signup">Sign Up</Link>
        </div>
      </div>
    );
}