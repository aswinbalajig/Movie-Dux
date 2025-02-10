export default async function signUpUtil(credentials)
{   let check;
    let message;
    const{first_name,last_name,password,email,username}=credentials;
    const url="http://127.0.0.1:8000/auth/users/";
    const options={
        headers:{
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify({first_name,last_name,password,username,email})
    };
    try{
        //console.log('entered try')
        const response=await fetch(url,options)
    if(response.ok)
    {   //console.log('response ok')
        check=true;
        message=`User ${username} created successfully`;
    }
    else
    {   //console.log('response not ok')
        check=false;
        const data=await response.json();
        //console.log(data)
        message=data.detail;
    }
    }
    catch(error)
    {   //console.log('entered catch')
        alert(error);
    }
    return {check,message}
}