import axios from 'axios';
import React from 'react';
import { Navigate, renderMatches, useNavigate ,Link, useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import "./quest.css";
import QuestComponent from '../components/QuestComponent';
import { useContext } from 'react';


import { Store } from '../Store';
export default function Quest(props)
{

    const navigate= useNavigate();
    const[question,setQuestion]= useState([]);
    const params=useParams();
    const {state , dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const signoutHandler=()=>{
        ctxDispatch({type:'DELETE_USERINFO'});
        localStorage.removeItem('userInfo');
       
        window.location.href='/';
      }
    useEffect(()=>{

                const fetchData=async()=>{
                const result=await axios.get('/api/users/quest');
                setQuestion(result.data);
            
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
        
        <div>
            
        {/* <h1>Inside quest page</h1> */}
        <div className="quest-container">
        <div class="item quest-header">
            <h3 class="quest-header">Solved: 0/3</h3>
            {/* <h3 class="quest-header"><Link to={`/home/${params.name}/leaderboard`} className='ques-board'>Leaderboard</Link></h3> */}
            {/* <img src={require('./change-icon.png')} alt="img" onClick={handleThemeChange}/> */}
            <button class="logout quest-header"onClick={signoutHandler}>Logout</button>
        </div>
        <div className="item quest-sidebar">
            <div id="hover"><a href="/quest"><p class="num">Quests</p></a></div>
            <div id="hover"><a href="/compiler/1"><p class="num">1</p></a></div>
            <div id="hover"><a href="/compiler/2"><p class="num">2</p></a></div>
            <div id="hover"><a href="/compiler/3"><p class="num">3</p></a></div>
        </div>


        <div className="item content-1">
            <div className="question-content">
                <h1>Questions</h1>
                {/* <div className="inner-quest"> */}
                {question.map((q)=>{
                console.log(q);
            return(
                <QuestComponent 
            quest={q.quest}
            id={q.id}
           
            />
            );
        }
           
           

        )}
                {/* </div> */}

                
                
            </div>
            
        </div>
        
        
    </div>
    </div>
    )
    
}

