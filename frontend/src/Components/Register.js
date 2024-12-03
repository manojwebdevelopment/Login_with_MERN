import React, { useState } from "react";
import { ToastContainer} from "react-toastify";
import { errorhandle, successhandle } from "../Errorhandle/toast";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
  const [signupinfo, setSignupinfo] = useState({
username:'',
email:'',
password:'',
});

const changehandle = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copysigninfo = {...signupinfo};
    copysigninfo[name] = value;
    setSignupinfo(copysigninfo);
}

  const handleRegister = async (e) => {
    e.preventDefault();
    const {username, email, password} = signupinfo;
    console.log('Request Data:', signupinfo);

    if(!username || !email || !password){
        return errorhandle("All Feield Required!");
    }
    try {
        const url = "http://localhost:5000/api/auth/register";
        
        const response = await fetch(url , {
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(signupinfo)
        });

        const result = await response.json();
        const {success , message , error} = result ;
        if(success){
            successhandle(message);
            setTimeout(()=>{
                navigate('/login')
            },1000)

        }else if(!success){
            errorhandle(message);
        }
        console.log(result);
        
    } catch (err) {
        errorhandle(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupinfo.username}
          onChange={changehandle}
          
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupinfo.email}
          onChange={changehandle}
          
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupinfo.password}
          onChange={changehandle}
          
        />
        <button type="submit">Register</button>
       
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;
