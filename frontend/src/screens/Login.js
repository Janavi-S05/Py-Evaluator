import React from 'react';
import { Navigate, renderMatches, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { BsFillSunFill } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import Home from './Home';
import Axios from 'axios';
import axios from 'axios';
import "./login.css";
import { Store } from '../Store';
import { useContext } from 'react';
export default function Login()
{

  const navigate= useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const{state,dispatch}=useContext(Store);

// const {search}=useLocation();
// console.log(search);
// const redirectInUrl =new URLSearchParams(search).get('redirect');
// console.log(redirectInUrl);
// const redirect=redirectInUrl? redirectInUrl:'/';
// console.log(redirect);


  const submitHandler=async(e)=>{
      e.preventDefault();
      try{
        const {data}=await axios.post('/api/users/signin',{
          email,
          password
        });
        console.log(data);
        const [{name:firstname}]=data;
        console.log(firstname);
        localStorage.setItem('userInfo',JSON.stringify( data))
        dispatch({
          type:'ADD_USERINFO',
          payload:{data}
        })
        navigate(`/home/${firstname}`);
        // navigate(`/home/${data.name}`)
      }
      catch(err){
        console.log(err);
      }
      
    }
    
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = `theme-${theme}`;
    }, [theme]);
  
    const handleThemeChange = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };   
  
 
return ( 
  <div class="login-content">
<div class="login-container">
  {/* <div class="logo"></div> */}
  <h2>Python Evaluator</h2>
  <form onSubmit={submitHandler}>
    <label for="username">Username</label>
    <input type="text" id="username" name="email" placeholder="Enter your username" required onChange={(e)=>setEmail(e.target.value)}></input>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" required onChange={(e)=>setPassword(e.target.value)}></input>
    <input type="submit" value="Login"></input>
  </form>
</div>
</div>
  )
  
}
