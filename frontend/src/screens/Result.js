import React, { Fragment } from 'react';
import { Navigate, renderMatches, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
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
        
        // e.preventDefault();
        // try{
        //   const quest=await Axios.get('/api/users/quest');
        //   const [questobj]=quest.data;
        //   console.log(quest.data)
        //   console.log(questobj);
        //   setQuestion(quest.data)
         
          
        //    navigate(`/home/${params.name}/quest`);
        // }
        // catch(err){
        //   console.log(err);
        // }
        
      };
      fetchData();
    },[]);
   
  return (

    <div className="nav-board">
    <ul>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="/leaderboard">Leaderboard</a></li>
    </ul>
<div className="result-block" style={{display:'flex'}}>
<div class="myblock">
<table>
<thead>
  <tr>
    <th>Questions</th>
    <th>Time</th>
    <th>Passed</th>
  </tr>
</thead>
 {result.map((q)=>{
     console.log(q);
 return(
     <ResultComponent
 questnum={q.questnum}
 time={q.time}
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



// {leaderboard.map((q)=>{
//     console.log(q);
// return(
//     <LeaderboardComponent 
// rank={q.rank}
// name={q.name}
// finishtime={q.finishtime}
// />
// );
// }



// )}



