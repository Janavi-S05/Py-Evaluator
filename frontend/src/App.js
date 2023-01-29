
import { useEffect,useState } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from "./screens/Home.js";
import Login from './screens/Login.js';
import Quest from './screens/Quest.js';
import Admin from './screens/Admin.jsx';
import Filter from './screens/Filter.js';
import axios  from 'axios';
import Axios from 'axios';
import Leaderboard from './screens/Leaderboard.js';
// import Modal from './screens/Modal.js';
import Result from './screens/Result.js';
import Compiler from './screens/Compiler.js';

function App() {

  const[user,setUser] =useState([]);
  // const[email,setEmail]=useState('');
  // const[password,setPassword]=useState('');
  useEffect(()=>{
    const fetchData = async()=>{
      const result=await axios.get('/api/users');
      setUser(result.data);
    };
    fetchData();
  },[]);
  // const submitHandler=async(e)=>{
  //   e.preventDefault();
  //   try{
  //     const {data}=await Axios.post('/api/users/signin',{
  //       email,
  //       password
  //     });
  //     console.log(data)
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  return (
    <BrowserRouter>
      <div>
      {/* {user.map((users)=>(
        <h3>{users.name}</h3>
      ))} */}
      {/* <div className="login-container">
    <form className="form-1" onSubmit={submitHandler}>
      <h1>Login</h1>
      <label for="email">Email</label>
      <input type="email" name="email" id="email"  required onChange={(e)=>setEmail(e.target.value)}/>
      <label for="password">Password</label>
      <input type="password" name="password" id="password"  required onChange={(e)=>setPassword(e.target.value)}/>
      <span>Forgot Password?</span>
      <button type="submit">Login</button>
    </form>


  </div> */}
      </div>
      <Routes>
          <Route path="/home/:name" element={<Home/>}/>
          <Route path="/home/:name/quest" element={<Quest/>}/>
          <Route path="/home/:name/leaderboard" element={<Leaderboard/>}/>
          <Route path="/home/:name/result" element={<Result/>}/>
          <Route path="/compiler/:id" element={<Compiler/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/filter' element={<Filter/>}/>
          {/* <Route path='/modal' element={<Modal/>}/> */}
          <Route path='/' element={<Login/>}/>
      </Routes>
   
    </BrowserRouter>
  
    
    
  );
}

export default App;
