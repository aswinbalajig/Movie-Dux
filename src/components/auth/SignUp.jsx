import { use } from "react";
import {React,useState} from "react";
import signUpUtil from "../../utils/signuputil";
import login from "../../utils/login";
export default function SignUp({setCurrentUser,setLoggedIn})
{   const [username,setUserName]=useState("");
    const [first_name,setFirstName]=useState("");
    const [last_name,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const [reTypePassword,setReTypePassword]=useState("");
    const [email,setEmail]=useState("");
    
    const checkPassword=(password,reTypePassword)=>{
        const check=password===reTypePassword&&password.length>6;
        return check;
    }

    const signup = async() => {
      if (checkPassword(password, reTypePassword)) {
        const credentials = {
          username,
          first_name,
          last_name,
          password,
          email,
        };
        const status = await signUpUtil(credentials);
        if (status.check) {
          //console.log(status.message);
          await login(setCurrentUser, setLoggedIn, username, password);
        } else {
          alert(status.message);
        }
      } else {
        alert("password and retype password didnt match or size of password is lesser than 7 characters");
      }
    };

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <div>
            <label>username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label>first_name:</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>last_name:</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label>email:</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div>
            <label>password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Re-Type Password:</label>
            <input
              type="password"
              value={reTypePassword}
              onChange={(e) => setReTypePassword(e.target.value)}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}