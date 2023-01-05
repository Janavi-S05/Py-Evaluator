import React from 'react';
import { Navigate, renderMatches, useNavigate, useParams } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import axios from 'axios'; 
import { useEffect,useState } from 'react';
import {render} from 'react-dom';
import "./compiler.css";
import { Link } from 'react-router-dom';
import CompilerComponent from '../components/CompilerComponent';
export default function Compiler()
{
    const navigate= useNavigate();
    const[compile,setCompile]= useState([])
    const params=useParams()
    const id=params.id;
    useEffect(()=>{

        const fetchData=async()=>{
            const result=await axios.get(`/api/users/compile/${id}`);
            setCompile(result.data);
        
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
    },[compile]);

    
  return (
    <div class="wrapper">
    <div class="section">
        <div class="topnav">
            <a href="#home" class="active">Python Evaluator</a>
            <div id="myLinks">
                {/* <a href="/compiler">All</a>
                <a href="/">Question 1</a>
                <a href="/">Question 2</a>
                <a href="/">Question 3</a> */}
                {/* <button type="button" class="quest-btn btn btn-danger" onClick={()=>{navigate(`/compiler/2`)}}>Question 2</button> */}
                 <Link to={`/compiler/1`}>Question 1</Link>
                <Link to={`/compiler/2`}>Question 2</Link>
                <Link to={`/compiler/3`}>Question 3</Link> 
            </div>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <button onClick={window['myFunction']}><i class="fa fa-bars"></i></button> 
            </a>
        </div>
    </div>


    <div class="row">
      
      <div class="column quest1">
      {compile.map((q)=>{
                console.log(q);
            return(
                <CompilerComponent
            qnum={q.qnum}
            questdesc={q.questdesc}
            input1={q.input1}
            output1={q.output2}
            input2={q.input2}
            output2={q.output2}
            constraint1={q.constraint1}
            constraint2={q.constraint2}
            />
            );
        }
           
           

        )}
        

        {/* <div>
          <diV class="quest-box">
              <h5>Question 1</h5>
              <p>Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) such that:
                nums[i] * nums[j] is divisible by k.</p>
          </diV>
        </div>
        <diV class="quest-box">
          <div class="quest-content">
            <h5>Sample Input 1</h5>
            <div>
              <p>nums = [1,2,3,4,5]
                  k = 2</p>
            </div>
            <h5>Sample Output 1</h5>
            <div>
              <p>7 Pairs - (0, 1), (0, 3), (1, 2), (1, 3), (1, 4), (2, 3), and (3, 4)</p>
            </div>
          </div>
        </diV>
        <diV class="quest-box">
          <div class="quest-content">
            <h5>Sample Input 2</h5>
            <div>
              <p>nums = [1,2,3,4], k = 5
              </p>
            </div>
            <h5>Sample Output 2</h5>
            <div>
              <p>0 There does not exist any pair of indices whose corresponding product is divisible by 5.</p>
            </div>
          </div>
        </diV>
        <diV class="quest-box">
            <h5>Constraints:</h5>
            <ul>
              <li>1  nums.length  105</li>
              <li>1  nums[i], k 105</li>
            </ul>
        </diV> */}
      </div>
      <div class="column" >
        <center id="icon-time">
          <i class="fas fa-tachometer-alt" id="icon-space"></i>
          <h id="head">5:00</h>
        </center>
        <div class="container" >
          <div class="wrap">
            <textarea spellcheck="false" placeholder="write your code here..."  required></textarea>
          </div>
          
          </div>
          <div class="col">
            <div id="button">
            <button class="btn btn-success">Run Code</button>
            <br />
            <button class="btn btn-success">Submit</button>
            <br />
            <pre id="ans"></pre>
            </div>
          </div>
        </div>
            
        </div>
      </div>
    
    
    
    )
    
}