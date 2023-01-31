import axios from 'axios';
import React from 'react';
import { Navigate, renderMatches, useNavigate, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import "./quest.css";
// import QuestComponent from '../components/QuestComponent';
import ReportComponent from '../components/ReportComponent';
// import "./leaderboard.css";
import "./Report.css"
export default function ViewReport(props) {

  const navigate = useNavigate();
  const [question, setQuestion] = useState([])
  const [testReport, setTestReport] = useState([])
  const params = useParams();
  console.log(params.id);
  console.log(params);
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get(`/api/users/viewreport/${params.id}`);
      setTestReport(result.data);
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
        <div className="myblock">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th colspan="2">Name</th>
                <th className="finish-time">Finish Time</th>
                <th>Score</th>
              </tr>
            </thead>

            {/* <div> */}
            {/* <div className="inner-quest"> */}
            {testReport.map((q) => {
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



            )}
            {/* </div> */}
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
          </table>
        </div>
      </div>
    </div>
</div>
  )

}
