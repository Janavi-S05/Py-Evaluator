import React, { useContext } from 'react';
import { Navigate, renderMatches, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import "./compiler.css";
import { Link } from 'react-router-dom';
import CompilerComponent from '../components/CompilerComponent';
import OutputComponent from '../components/OutputComponent';
import { Store } from '../Store';
import Modal from '../components/Modal';
import QuestionHamburgerComponent from '../components/QuestionHamburgerComponent';
import { useRef } from 'react';

function useWarningCount() {

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [warningCount, setWarningCount] = useState(() => {
    const count = Number(localStorage.getItem('warningCount'))
    return count > 0 ? count : 0
  });

  useEffect(() => {
    localStorage.setItem('warningCount', warningCount);
    // alert(`Warning count: ${warningCount + 1}`);
    if (warningCount >= 3) {
      ctxDispatch({ type: 'DELETE_USERINFO' });
      localStorage.setItem('warningCount', 0);
      localStorage.removeItem('userInfo');
      navigate('/login')
    }
  }, [warningCount]);

  return [warningCount, setWarningCount];
}




function Compiler() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [compile, setCompile] = useState([])
  const params = useParams()
  const id = params.id;
  const [warnings, setWarnings] = useState(0);
  const [code, setCode] = useState([]);
  const [output, setOutput] = useState([])
  const [question, setQuestion] = useState([]);

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [countDownDate, setCountDownDate] = useState();
  console.log(timerHours);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  let interval = useRef();

  const signoutHandler = () => {
    ctxDispatch({ type: 'DELETE_USERINFO' });
    localStorage.removeItem('userInfo');

    window.location.href = '/';
  }

  const startTimer = () => {
    console.log("startTimer is called")
    const countDownDate = new Date("Feb 5,2023  11:51:00").getTime();

    setCountDownDate(countDownDate);
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const date = new Date(now);
      console.log(date.getFullYear());
      // console.log(now);
      // const duration=countDownDate-now;

      const distance = countDownDate - now;
      // const distance=now +duration;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer

        clearInterval(interval.current);
        navigate("/");
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, [countDownDate]);

  const stop = () => {
    clearInterval(interval.current);

  }

  const getLocalCode = () => {
    let tempcode = localStorage.getItem('tempcode');
    console.log(tempcode)

    if (tempcode) {
      return JSON.parse(localStorage.getItem('tempcode'));
    }
    else {
      return (' ');
    }
  }
  const [tempcode, settempCode] = useState(getLocalCode())



  function handleSaveCode() {
    localStorage.setItem('tempcode', JSON.stringify(tempcode));
  }

  useEffect(() => {
    localStorage.setItem('tempcode', JSON.stringify(tempcode));
  }, [tempcode])

  useEffect(() => {
    window.addEventListener('beforeunload', handleSaveCode);
    return () => {
      window.removeEventListener('beforeunload', handleSaveCode);
    }
  }, [tempcode]);


  console.log(tempcode);



  const [warningCount, setWarningCount] = useWarningCount();

  const submitHandler = async (e) => {
    e.preventDefault();
    // const code=localStorage.getItem('tempcode');
    // console.log(code);
    const { tempcode: code } = tempcode;
    try {
      const result = await Axios.post(`/api/users/output/${id}`, {
        code,
      })
      setOutput(result.data);
      console.log(result.data.output);
    }
    catch (err) {
      console.log(err);
    }

  }




  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        setWarningCount(warningCount + 1);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [warningCount]);


  useEffect(() => {

    const fetchData = async () => {
      const result = await axios.get(`/api/users/compile/${id}`);
      const resultquest = await axios.get('/api/users/quest');
      setCompile(result.data);
      setQuestion(resultquest.data);



    }; fetchData();

    startTimer();

  }, [id]);



  console.log(question);

  return (
    <div class="wrapper">
      <div class="section">
        <div class="topnav">
          {/* <a href="#home" class="active">Python Evaluator</a> */}
          <div className="logout-div">
            <a href="#home" class="active">Python Evaluator</a>
            {/* <a href="/" className="logout-header">Logout</a> */}
            <button class="logout logout-header" onClick={signoutHandler}>Logout</button>
          </div>


          <div id="myLinks">
            {question.map((q) => {
              console.log(q.quest);
              return (
                <QuestionHamburgerComponent
                  qdisp={q.quest}
                  qid={q.id}
                />
              )

            })}
            {/* <a href="/compiler">All</a>
                <a href="/">Question 1</a>
                <a href="/">Question 2</a>
                <a href="/">Question 3</a> */}
            {/* <button type="button" class="quest-btn btn btn-danger" onClick={()=>{navigate(`/compiler/2`)}}>Question 2</button> */}
            {/* {question.map((q)=>{
                  <Link to={`/compiler/1`}>{question.quest}</Link>
                 }

                 )} */}
            {/* <Link to={`/compiler/1`}>Question 1</Link>
                <Link to={`/compiler/2`}>Question 2</Link>
                <Link to={`/compiler/3`}>Question 3</Link>  */}
          </div>
          <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <button onClick={window['myFunction']}><i class="fa fa-bars"></i></button>
          </a>
          {modalOpen && <Modal

            timerDays={timerDays}
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
            setOpenModal={setModalOpen} />}

        </div>
      </div>


      <div class="row">

        <div class="column quest1">
          {compile.map((q) => {
            console.log(q);
            return (
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





        </div>
        <div class="column" >
          <center id="icon-time">
            <i class="fas fa-tachometer-alt" id="icon-space"></i>
            <div class="mobile-container">
              <i class='fas fa-exclamation-triangle'><p className="warning-count">Warning count: {warningCount}</p></i>
              <div id="clockdiv">
                <div className="inner-clock">
                  <span className="hours" id="hour">{timerDays}</span>
                  <h3 className="timer-para">:</h3>
                </div>
                <div className="inner-clock">
                  <span className="hours" id="hour">{timerHours}</span>
                  <h3 className="timer-para">:</h3>
                </div>
                <div className="inner-clock">
                  <span className="minutes" id="minute">{timerMinutes}</span>
                  <h3 className="timer-para">:</h3>
                </div>
                <div className="inner-clock">
                  <span className="seconds" id="second">{timerSeconds}</span>
                </div>
              </div>
              <div className="end-test">
                {/* <button type="submit" >End Test</button> */}
                <button
                  className="openModalBtn"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  End Test
                </button>
                </div>
            </div>
          </center>
          <form onSubmit={submitHandler}>
            <div class="container" >
              <div class="wrap">
                {/* <textarea onChange={(e)=>setCode(e.target.value)} spellcheck="false" placeholder="write your code here..."  required></textarea> */}
                <textarea
                  value={tempcode.tempcode}
                  onChange={(e) => {
                    settempCode(
                      {
                        ...tempcode,
                        tempcode: e.target.value
                      });
                  }}



                  spellcheck="false" placeholder="write your code here..." required></textarea>
              </div>

            </div>
            <div class="col">
              <div id="button">
                {/* <button class="btn btn-success">Run Code</button> */}
                <button className="btn btn-success" type="submit">Run</button>
                <br />
                <button class="btn btn-success">Submit</button>

                <br />
                <pre id="ans"></pre>
              </div>
            </div>
            {/* </div> */}
          </form>

          {output.map((q) => {
            return (
              <OutputComponent
                yourOutput={q.youroutput}
                expectedOutput={q.expected}


              />

            )
          })}
        </div>
      </div>
    </div>


  )

}

export default Compiler;
