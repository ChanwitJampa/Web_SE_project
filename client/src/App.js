import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";
import { ComposableMap, Geography, Geographies } from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolatePiYG } from "d3-scale-chromatic";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import MapChart from "./MapChart";

import BarLoader from "react-spinners/BarLoader";

import { Table, Header } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { virus-covid } from "@fortawesome/free-solid-svg-icons";
import {
  faAdd,
  faHospital,
  faSkullCrossbones,
  faTrash,
  faVirusCovid,
} from "@fortawesome/free-solid-svg-icons";

import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ClockCircleOutlined,
  NotificationOutlined
} from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { faker } from "@faker-js/faker";
import { Button } from "antd";

function App() {
  const [hospital, setHospital] = useState([]);

  const fetchData = () => {
    axios
      .get(
        `https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`
      )
      .then((response) => {
        console.log(response.data);
        // setHospital(response.data);

        setHospital(
          response.data.slice(
            response.data.length - 78,
            response.data.length - 1
          )
        );

        // const filterItem = hospital.filter(filtername => {
        //   if(filtername)
        // });

        // console.log(filterItem);

        // console.log(hospital);
        // hospital.forEach( (e) => {
        //   console.log(e.province);
        // })
      })
      .catch((err) => alert(err));
  };

  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
    console.log("Hello");
  }, []);

  // const pullHistory = (pName) => {
  //   if (pName != "กรุณาเลือกจังหวัด") {
  //     axios
  //       .get(
  //         // `http://localhost:5000/api/map/${provinceName}`
  //         `http://localhost:5000/api/map/${pName}`
  //       )
  //       .then((response) => {
  //         console.log("TEST API ==== === = = = ");
  //         console.log(response.data);
  //         console.log(response.data[0].new_total_1);

  //         setHistory(response.data);
  //       });
  //     // .catch((err) => alert(err));
  //   }
  // };

  // useEffect(() => {
  //   // setHospital(hospital.filter(hospital.province == pName))
  //   pullHistory(pName);
  //   // console.log(history[0])

  //   if (pName != "กรุณาเลือกจังหวัด") {
  //     setHistory([]);
  //     console.log("HISTORY");
  //     console.log(history[0]);
  //     console.log("end");
  //     setLoading(true);

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }
  // }, [pName]);

  let time = new Date().toLocaleDateString();

  const [ctime, setCtime] = useState(time);
  
  

  return (
    <div className="container2">
      <NavbarComponent />

      <div className="container3">

        <h1 className="timeText">{ctime}</h1>

        <h1 className="welcomText">ยินดีต้อนรับเข้าสู่ระบบจัดการฝึกงาน</h1>

        <div className="searchArea">
          <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>

        <div className="box1">

          <h1 style={{marginBottom:"2rem"}}>ข่าวสารประกาศ</h1>

          <div className="newBox">

            <div className="topBox">
              <h1 className="corpName">เงินเทอร์โบ</h1>

              <h1 className="postDate"><NotificationOutlined style={{marginRight:"1rem",fontSize:"1.2rem",color:"#019267"}} />วันที่ 10 กุมพาพันธ์ 2565</h1>
              
            </div>

            <div className="bottomBox">

              <h1 className="postText">เปิดรับนักศึกษาฝึกงานตำแหน่ง frontend, backend, automation engineer ที่เรียนจบมาในสาขาวิชา วิศวกรรมคอมพิวเตอร์ จำนวนมากสามารถสมัครมาได้ที่ช่องทางดังนี้ 
              fackbook line เเละทางเว็บไซต์ของทางบริษัท  </h1>
              

              <h1 className="postType">ฝึกงาน</h1>


            </div>


          </div>
          <div className="newBox">

            <div className="topBox">
              <h1 className="corpName">เงินเทอร์ไม่โบ</h1>

              <h1 className="postDate"><NotificationOutlined style={{marginRight:"1rem",fontSize:"1.2rem",color:"#019267"}} />วันที่ 5 กุมพาพันธ์ 2565</h1>
              
            </div>

            <div className="bottomBox">

              <h1 className="postText">เปิดรับนักศึกษาฝึกงานตำแหน่ง frontend, backend, automation engineer ที่เรียนจบมาในสาขาวิชา วิศวกรรมคอมพิวเตอร์ จำนวนมากสามารถสมัครมาได้ที่ช่องทางดังนี้ 
              fackbook line เเละทางเว็บไซต์ของทางบริษัท  </h1>
              

              <h1 className="postType">สหกจ</h1>


            </div>


          </div>
          <div className="newBox">

            <div className="topBox">
              <h1 className="corpName">Gofive company</h1>

              <h1 className="postDate"><NotificationOutlined style={{marginRight:"1rem",fontSize:"1.2rem",color:"#019267"}} />วันที่ 1 กุมพาพันธ์ 2565</h1>
              
            </div>

            <div className="bottomBox">

              <h1 className="postText">เปิดรับนักศึกษาฝึกงานตำแหน่ง frontend, backend, automation engineer ที่เรียนจบมาในสาขาวิชา วิศวกรรมคอมพิวเตอร์ จำนวนมากสามารถสมัครมาได้ที่ช่องทางดังนี้ 
              fackbook line เเละทางเว็บไซต์ของทางบริษัท  </h1>
              

              <h1 className="postType">ฝึกงาน</h1>


            </div>


          </div>




        </div>


        <div style={{padding:"5rem"}}>

        </div>





      </div>

     
    </div>
  );
}

export default App;
