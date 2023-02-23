import React, { useEffect,useContext} from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
// import Quest from "./Quest";
import excelformat from './images/excelformat.jpg';
import excelicon from './images/excelicon.jpg';
import excelfile from './images/excelfile.jpg';
import axios from "axios";
import "./home.css";
import "./admin.css";
import { Store } from '../Store';
import { Link } from "react-router-dom";
import XLSX from 'xlsx';

export default function Admin() {

    const params = useParams();

    const navigate = useNavigate();
  
  
  
    const [status, setStatus] = useState()
    // const[testName,settestName]=useState('');
    // const[startTime,setstartTime]=useState('');
    // const[endTime,setendTime]=useState('');
    // const[duration,setDuration]=useState('');
  
    const [jsonData, setjsonData] = useState('');
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const result = await Axios.post(`/api/users/email`, {
          jsonData
        })
        setStatus(result.data);
        console.log(jsonData);
      }
      catch (err) {
        console.log(err);
      }
  
    }
  
  
    const [items, setEmail] = useState([])
    // const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
  
      const fetchData = async () => {
        const result = await axios.get('/api/users/studentemail');
        setEmail(result.data);
  
  
  
      };
      fetchData();
    }, []);
    // console.log(items);
  
    // const [selectedItems, setSelectedItems] = useState([]);
  
    // const handleChange = (item) => {
    //   if (selectedItems.includes(item)) {
    //     setSelectedItems(selectedItems.filter(i => i !== item));
    //   } else {
    //     setSelectedItems([...selectedItems, item]);
    //   }
    // };
  
    //console.log(selectedItems);
  
    const [fileName, setfileName] = useState(null);
    const handleFile = async (e) => {
  
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      setfileName(file.name)
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
  
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
      setjsonData(jsonData);
      // console.log(jsonData);
    };
    console.log(jsonData);
  
  
    // console.log(selectedItems);
  
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
    <div class="dashboard">
	<aside class="search-wrap">
		<div class="search">
			<label for="search">
          <h3>Admin Dashboard</h3>
			</label>
		</div>

		<div class="user-actions">
            Logout
			<button onClick={signoutHandler}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z" />
					<path d="M11 2h2v10h-2z" />
				</svg>
			</button>
		</div>
	</aside>

	<header class="menu-wrap">
		 <figure class="user">
		 
            <h2>Python Evaluator</h2>
        </figure>

		<nav>
			<section class="dicover">
				<h3>Discover</h3>

				<ul>
					<li>
						<Link to='/Admin' class="active">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M6.855 14.365l-1.817 6.36a1.001 1.001 0 0 0 1.517 1.106L12 18.202l5.445 3.63a1 1 0 0 0 1.517-1.106l-1.817-6.36 4.48-3.584a1.001 1.001 0 0 0-.461-1.767l-5.497-.916-2.772-5.545c-.34-.678-1.449-.678-1.789 0L8.333 8.098l-5.497.916a1 1 0 0 0-.461 1.767l4.48 3.584zm2.309-4.379c.315-.053.587-.253.73-.539L12 5.236l2.105 4.211c.144.286.415.486.73.539l3.79.632-3.251 2.601a1.003 1.003 0 0 0-.337 1.056l1.253 4.385-3.736-2.491a1 1 0 0 0-1.109-.001l-3.736 2.491 1.253-4.385a1.002 1.002 0 0 0-.337-1.056l-3.251-2.601 3.79-.631z" />
							</svg>
							Student details
						</Link>
					</li>

					<li>
						<Link to="/Filter" >
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.353 2.355-6.049-.002-8.416zm-1.412 7.002L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002 1.563 1.571 1.564 4.025.002 5.588z" />
							</svg>
							Assign test
						</Link>
					</li>

					<li>
						<Link to="/report">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M5.707 19.707L12 13.414l4.461 4.461L14.337 20H20v-5.663l-2.125 2.124L13.414 12l4.461-4.461L20 9.663V4h-5.663l2.124 2.125L12 10.586 5.707 4.293 4.293 5.707 10.586 12l-6.293 6.293z" />
							</svg>
							Report
						</Link>
					</li>
				</ul>
			</section>
		</nav>
	</header>

	<div class="content-wrap">
        <form onSubmit={submitHandler}>
            <div class="admin">
              <form>
                <div class="excel-icon">
                  <img src={excelicon}></img>
                  <div class="excelfile">
                    <h3>Student Details</h3>
                    <input type="file" />
                    <button class="btnfos btnfos-5">Submit</button>
                  </div>
                  <div class="excelfile">
                    <h3>QuestionsUpload</h3>
                    <input type="file"  />
                    <button class="btnfos btnfos-5">Submit</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="file-div">
              <div class="excel-format">
                <h3>Excel File Format Description:</h3>
                <ul>
                  <li>
                    The file should consists of name,register number,college,year,department.
                  </li>
                  <li>
                    Maximum size of the file is 500KB.
                  </li>
                  <li>
                    Students of registered college can use this platform.
                  </li>
                  <div class="excel-final">
                     Email <a href=""> here </a> id must be valid.
                    </div>
                </ul>
              </div>
              <img src={excelfile}></img>
            </div>
            <div class="excel-format-div">
              <img src={excelformat} ></img>
            </div>
          </form>
        </div>
	</div>

  );
}
