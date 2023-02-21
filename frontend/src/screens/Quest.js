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
        <div className="item quest-header">
            <h3 className="solve">Solved: 0/3</h3>
            <button className="logout "onClick={signoutHandler}>Logout
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z" />
                                <path d="M11 2h2v10h-2z" />
                            </svg>
                            </button>
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

