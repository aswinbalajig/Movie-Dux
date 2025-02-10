const login=async(setCurrentUser,setLoggedIn,username,password,isloggedin)=>{
    const url='http://127.0.0.1:8000/auth/jwt/create/';
    const options={
        headers:{
            'Content-Type': 'application/json',
        },
        method:"POST",
        body:JSON.stringify({username,password})
    }
    try{
        const response=await fetch(url,options);
        if(response.ok)
        {   //console.log('login response ok')
            const data=await response.json();
            //console.log(data);
                localStorage.setItem('currentUserName',username);   
                setCurrentUser(username);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);                
                //console.log(`isloggedin: ${isloggedin}`);
                setLoggedIn(true);
                //console.log(`isloggedin: ${isloggedin}`);
            return true;
        }
        else
        {
            const error=await response.json();
            alert(error.message);
        }
    }
    catch(error)
    {
        alert(error);
    }
    return false;
}
export default login;