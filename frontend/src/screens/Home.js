import React, { useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import Quest from "./Quest";
import axios from "axios";
import "./home.css";
import "./admin.css";
import { Store } from '../Store';
import { Link } from "react-router-dom";
export default function Home() {

    const params = useParams();
    const navigate = useNavigate();
    function myFunction() {
        this.setState(<div className="home-instruction">
            <h4>During the test</h4>
            <ul>

                <li>Keep up with the time.</li>
                <li>Avoid switching tabs on web.</li>
            </ul>
        </div>)
    }

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const [warningCount, setWarningCount] = useState(() => {
        const count = Number(localStorage.getItem('warningCount'))
        return count > 0 ? count : 0
    });
    const signoutHandler = () => {
        ctxDispatch({ type: 'DELETE_USERINFO' });
        localStorage.removeItem('userInfo');

        window.location.href = '/';
    }
    return (
        <div className="home-body">
            <div className="nav-board">
                <ul>
                    <div class="user-actions home-div">
                    <h3>{params.name}</h3>
                        Logout
                        <button onClick={signoutHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z" />
                                <path d="M11 2h2v10h-2z" />
                            </svg>
                        </button>
                    </div>
                </ul>
            </div>
            <div className="home-content">
                <div className="heading">
                    <h2>Instructions</h2>
                </div>
                <div className="home-box">
                    <h3>Duration: 90mins</h3>
                    <h3>Questions: 3</h3>
                </div>
                <div className="home-instruction">
                    <h4>About the test </h4>
                    <ul>

                        <li>Language supported for the test is Python.</li>
                        <li>Each submission will be tested based on the private test cases.</li>
                        <li>The test will be auto-submitted when the time exceeds.</li>
                    </ul>
                </div>
                <div className="home-instruction">
                    <h4>Before the test </h4>
                    <ul>

                        <li>Make sure you have stable internet connection.</li>
                        <li>Ensure the device is fully charged.</li>
                    </ul>
                </div>
                <div className="home-instruction">
                    <h4>During the test</h4>
                    <ul>

                        <li>Keep up with the time.</li>
                        <li>Avoid switching tabs on web.</li>
                    </ul>
                </div>
                <button className="btn btn-success" onClick={() => { navigate(`/home/${params.name}/quest`) }}>Start</button>{' '}
                {/* <button onClick={myFunction}>Next</button> */}
            </div>
        </div>
    )
}
