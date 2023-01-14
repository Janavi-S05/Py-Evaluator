import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import Quest from "./Quest";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
export default function Home(){

    const params=useParams();

    const navigate=useNavigate();
    return(
        <div className="home-body">
        <div className="nav-board">
        <ul>
            <li><a>{params.name}</a></li>
            <li><a href="profile.html">Profile</a></li>
            {/* <h3 ><Link to="/home/:name/leaderboard" className='ques-board'>Leaderboard</Link></h3> */}
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
            <ul>
                <h4>About the test </h4>
                <li>Language supported for the test is Python.</li>
                <li>Each submission will be tested based on the private test cases.</li>
                <li>The test will be auto-submitted when the time exceeds.</li>
                <li>The results will auto-appear once test is over.</li>
            </ul>
        </div>
        <div className="home-instruction">
            <ul>
                <h4>Before the test </h4>
                <li>Make sure you have stable internet connection.</li>
                <li>Ensure the device is fully charged.</li>
            </ul>
        </div>
        <div className="home-instruction">
            <ul>
                <h4>During the test</h4>
                <li>Keep up with the time.</li>
                <li>Avoid switching tabs on web.</li>
            </ul>
        </div>
        <button className="btn-danger" onClick={()=>{navigate(`/home/${params.name}/quest`)}}>Start</button>{' '}

    </div>
    </div>
    )
}
