import React, { useEffect, useState } from 'react';
import { Navigate, renderMatches, useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import {render} from 'react-dom';
// import { toast } from 'react-toastify';
import clgicon from './images/clgicon.png';
import depticon from './images/depticon.png';
import regnum from './images/regnum.png';
import './filter.css';
import "./sidebar.css";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Filter() {
  //   const[count,setCount]= useState(0);

  const navigate = useNavigate();
  const [testName, settestName] = useState('');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [duration, setDuration] = useState('');

  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedquestions, setSelectedquestions] = useState([]);
  const [selectedstudents, setSelectedstudents] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get('/api/users/student');
      const questionSet = await axios.get('/api/users/questset');
      setStudents(result.data);
      setQuestions(questionSet.data);
    };
    fetchData();
  }, []);

  // console.log(students);

  const [constraints, setConstraints] = useState({});

  const [levels, setLevels] = useState({ level: "" });

  const filteredStudents = filterStudents(students, constraints);
  const filteredQuestions = filterQuestions(questions, levels)

  function filterStudents(students, constraints) {
    return students.filter(student => {
      return Object.entries(constraints).every(([key, value]) => student[key] === value)
    });
  }

  function filterQuestions(questions, levels) {
    return questions.filter(question => {
      return Object.entries(levels).every(([key, value]) => question[key] === value)
    });
  }


  const handleChangeQuestions = (item) => {
    if (selectedquestions.includes(item)) {
      setSelectedquestions(selectedquestions.filter(i => i !== item));
    } else {
      setSelectedquestions([...selectedquestions, item]);
    }
  };


  const handleChangeStudents = (item) => {
    if (selectedstudents.includes(item)) {
      setSelectedstudents(selectedstudents.filter(i => i !== item));
    } else {
      setSelectedstudents([...selectedstudents, item]);
    }
  };
  // console.log(filteredStudents);
  // console.log(filteredQuestions);
  console.log(selectedquestions);
  console.log(selectedstudents);


  return (
    <div>
    <div class="wrapper">
        <div class="section">
          <div class="top_navbar">
            <h3>Admin Dashboard</h3>
          </div>
        </div>
        <div class="sidebar">
          <div class="profile">
            <p>Python Evaluator</p>
          </div>
          <ul>
            <li>
              <Link to='/Admin' >
                <span class="item">Upload Student details</span>
              </Link>
            </li>
            <li>
              <Link to="/Filter" class="active">
                <span class="item">Assign test</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    <form className='filter-content'>
      <div className="filter1">
      <div className="neomorph-container">
        <label className="neomorph-title">Test Name:</label>
        <input type="text" name="testName" className="neomorph-input" placeholder="Test name" required onChange={(e) => settestName(e.target.value)} />
      {/* </div>
      <div className="form-group"> */}
        <label className="neomorph-title">Start Time:</label>
        <input type="datetime-local" className="neomorph-input" name="startTime" required onChange={(e) => setstartTime(e.target.value)} />
      {/* </div>
      <div className="form-group"> */}
        <label className="neomorph-title">End Time:</label>
        <input type="datetime-local" className="neomorph-input" name="endTime" required onChange={(e) => setendTime(e.target.value)} />
      {/* </div>
      <div className="form-group"> */}
        <label className="neomorph-title">Duration:</label>
        <input type="time" className="neomorph-input" name="duration" placeholder="Duration (in minutes)" required onChange={(e) => setDuration(e.target.value)} />
      </div>
      <button className="btn btn-danger"type="submit">Submit</button>
      </div>
      <div className="filter2">
      <div className="neomorph-container">
      <div className='neomorph-filter'>
        {/* <label>Filter by college:</label> */}
        <div className='clg-image'>
        <input value={constraints.college} placeholder="filter by college" onChange={(e) => setConstraints({ ...constraints, college: e.target.value })} />
        <img src={clgicon} ></img>
        </div>
    {/* <div> */}
        {/* <label>Filter by department:</label> */}
        <div className='clg-image'>
        <input value={constraints.department} placeholder="filter by department" onChange={(e) => setConstraints({ ...constraints, department: e.target.value })} />
        <img src={depticon} ></img>
        </div>
        {/* </div>
    <div> */}
        {/* <label>Filter by Registration Number:</label> */}
        <div className='clg-image'>
        <input value={constraints.regNumb} placeholder="filter by register number" onChange={(e) => setConstraints({ ...constraints, regNumb: e.target.value })} />
        <img src={regnum} ></img>
        </div>
      </div>
    
      <div className="filter-checkbox">
      <ul className="reg-box">
        {filteredStudents.map(student => {
          return (
            <label key={student.id}>
              <input
                type="checkbox"
                checked={selectedstudents.includes(student)}
                onChange={() => handleChangeStudents(student)}
              />
              {student.regNumb}
            </label>
            
          );
        })}
      </ul>
      </div>
      <div>
        <label>Filter by level:</label>
        <input value={setQuestions.level} onChange={(e) => setLevels({ ...levels, level: e.target.value })} />
      </div>
      <ul>
        {/* {filteredQuestions.map(question=> (
        <li >{question.questdesc}</li>
      ))} */}

        {filteredQuestions.map((q) => {
          {/* console.log(q); */ }
          return (

            <label key={q.qnum}>
              <input
                className="email-box" type="checkbox"
                checked={selectedquestions.includes(q)}
                onChange={() => handleChangeQuestions(q)}
              // checked={

              //  selectedquestions.includes(q) ? 
              //  setSelectedquestions(selectedquestions.filter(i =>i !=q))
              //  : setSelectedquestions([...selectedquestions,q])

              // }
              />
              {q.questdesc}
            </label>

          );
        }
        )}
      </ul>
   </div>
    
   </div>
   </form>
   </div>
  
  )

}
