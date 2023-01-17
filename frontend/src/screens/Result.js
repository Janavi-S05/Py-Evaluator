import React, { Fragment } from 'react';
import { Navigate, renderMatches, useNavigate } from 'react-router-dom';
import {render} from 'react-dom';

import axios from 'axios'; 
import { useEffect,useState } from 'react'; 
import ResultComponent from '../components/ResultComponent';


export default function Result()
{

    const navigate= useNavigate();
    const[result,setResult]= useState([])
    useEffect(()=>{

        const fetchData=async()=>{
            const result=await axios.get('/api/users/result');
            setResult(result.data);
      };
      fetchData();
    },[]);
    const newresult=result.slice(0,3);
    const res=result.slice(3);
   
  return (

    <div className="nav-board">
    <ul>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="/leaderboard">Leaderboard</a></li>
    </ul>
<div className="result-block" style={{display:'flex'}}>
<div class="myblock1">
<h2>Overall Analysis</h2>
{res.map((q)=>{
    return(
      <div>
      <p className="timeDiv1">Total time: {q.time}</p>
      <p className="timeDiv1">Alloted time: 3:00:00</p>
      </div>
    )
  })}
<table>
<thead>
  <tr>
    <th>Questions</th>
    <th>Passed</th>
  </tr>
</thead>
 {newresult.map((q)=>{
     console.log(q);
 return(
     <ResultComponent
 questnum={q.questnum}
 passed={q.passed}
 />
 );
 }
 )}
  </table>
</div>
</div>
</div>
    )
    
}
