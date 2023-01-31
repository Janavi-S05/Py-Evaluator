import React, { Fragment } from 'react';
import { Navigate, renderMatches, useNavigate, useParams } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';
import './Report.css';
import './sidebar.css';
import ReportComponent from '../components/ReportComponent';
//import TestListComponent from '../components/TestListComponent';
import TestListComponent from '../components/TestListComponent';

export default function Report() {

  const params = useParams();
  console.log(params);
  const id = params.id;
  const navigate = useNavigate();
  const [list, setTestlist] = useState([])
  // console.log(report);
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get(`/api/users/testlist`);
      setTestlist(result.data);
      console.log(result);


    };
    fetchData();
  }, []);

  return (

    <div class="report-container">
      <div class="wrapper">
        <div class="section">
          <div class="top_navbar">
            <h3>Admin Dashboard</h3>
            <li ><Link to="/" class="admin-logout">Logout</Link></li>
          </div>
        </div>
        <div class="sidebar">
          <div class="profile">
            <p>Python Evaluator</p>
          </div>
          <ul>
            <li>
              <Link to='/Admin'>
                <span class="item">Upload Student details</span>
              </Link>
            </li>
            <li>
              <Link to="/Filter">
                <span class="item">Assign test</span>
              </Link>
            </li>
            <li>
              <Link to="/report" class="active">
                <span class="item">Report</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="leaderboard">
        <div className="board-container">
          <div class="dropdown">
            <input placeholder="choose"></input>
            <div class="dropdown-content">
              <div class="dropdown-div">

                {list.map((q) => {
                  console.log(q);
                  return (
                    <TestListComponent
                      testid={q.test}

                    />
                  );
                }



                )}
              </div>
            </div>
          </div>
          <div className="myblock">
            {/* <table> */}
            {/* <thead>
              <tr>
                <th>Rank</th>
                <th colspan="2">Name</th>
                <th className="finish-time">Finish Time</th>
                <th>Score</th>
              </tr>
            </thead> */}


            {/* {list.map((q) => {
              console.log(q);
              return (
                <ReportComponent
                 
                  name={q.name}
                  regnum={q.regnum}
                  rank={q.rank}
                  time={q.time}
                  score={q.score}
                />
              );
            }
            )} */}
            {/* </table> */}
          </div>
        </div>
      </div>
    </div>
  )



}
