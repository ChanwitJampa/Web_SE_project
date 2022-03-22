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
import Swal from "sweetalert2";

// import MapChart from "./MapChart";

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
  NotificationOutlined,
  PhoneOutlined,
  MailOutlined,
  DeleteOutlined,
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";

import { Button } from "antd";

function App() {

  function consolelog() {
    console.log(announce);
  }

  function swalalert() {
    Swal.fire(
      'ดีจ้า',
  )
  }

  const [announce, setAnnounce] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/announces`)
      .then((res) => {
        setAnnounce(res.data);
        console.log(res.data);
        console.log("ANNOUCE  = ")
        console.log(announce)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
    console.log(searchInput);
  }, []);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = announce.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
        console.log(filteredData);
    }
    else{
        setFilteredResults(announce)
    }
}

  const deleteItem = (id) => {
    //askbeforeDelete
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่?',
      text: "ข้อมูลที่ลบจะไม่สามารถกู้คืนได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'ลบข้อมูลสำเร็จ',
          'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
          'success'
        )
        //delete
        axios
          .delete(`http://localhost:5000/api/announces/${id}`)
          .then((res) => {
            console.log("DELETE SUCCESS");
            console.log(res);
            fetchData();
          })
          .catch((err) => {
            console.log("DELETE NOT SUCCESS");
            console.log(err);
          });
      }
    })

  }


  //EditItemWithAxios

  let d = new Date();

  var monthNamesThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤษจิกายน",
    "ธันวาคม",
  ];

  var dayNames = [
    "วันอาทิตย์",
    "วันจันทร์",
    "วันอังคาร",
    "วันพุทธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์",
  ];


  const thTIme2 =
    dayNames[d.getDay()] +
    ",  " +
    d.getDate() +
    " " +
    monthNamesThai[d.getMonth()] +
    "  " +
    d.getFullYear();

  return (
    <div className="container2">
      <NavbarComponent />

      <div className="container3">
        <h1 className="timeText">{thTIme2}</h1>

        <h1 className="welcomText">ยินดีต้อนรับเข้าสู่ระบบจัดการฝึกงาน</h1>

        <div className="searchArea">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search.."
              aria-label="Search"
              onChange={(e) => searchItems(e.target.value)}
            ></input>
            {/* <button class="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
        </div>

        <div className="box1">
          <div className="headerBox">
            <h1
              style={{
                marginBottom: "2rem",
                fontWeight: "bold",
                color: "#FF6464",
              }}
            >
              ข่าวสารประกาศ
            </h1>
            
            <Link to="/news">
              <button
                to=""
                type="submit"
                className="btn btn-success"
                // onClick={}
                style={{
                  backgroundColor: "#02BC77",
                  width: "10rem",
                  height: "3rem",
                }}
              >
                <FormOutlined
                  style={{
                    marginLeft: "0rem",
                    marginRight: "1rem",
                    fontSize: "1.5rem",
                    color: "#FFFFF",
                  }}
                />
                เพิ่มคำร้อง
              </button>

            </Link>
          </div>


          {searchInput.length > 1 ? (
                    filteredResults.map((announce) => {
                        return (
                            <div className="newBox">
                
                            <div className="topBox">
                              <h1 className="corpName">{announce.titleName}</h1>
                
                              <h1 className="postDate">
                                <NotificationOutlined
                                  style={{
                                    marginRight: "1rem",
                                    fontSize: "1.2rem",
                                    color: "#019267",
                                  }}
                                />
                                {announce.createtime}
                              </h1>
                            </div>
                
                            <div className="middleBox">
                
                            <h1 className="postText">
                                  {announce.detail}
                                </h1>
                
                            </div>
                
                            <div className="bottomBox">
                
                              <div className="leftBotBox">
                                
                
                                <h1 className="postText2">
                                  <PhoneOutlined
                                    style={{
                                      marginLeft: "0rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#488FB1",
                                    }}
                                  />{" "}
                                  {announce.phoneNumber}{" "}
                                  <MailOutlined
                                    style={{
                                      marginLeft: "2rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#019267",
                                    }}
                                  />{" "}
                                  {announce.email}
                                </h1>
                              </div>
                
                              <div className="rightBotBox">
                                
                                <div className="">
                                  <Link to={`/addnews/${announce._id}`}>
                                  
                                  <EditOutlined
                                    onClick={() => {
                                      // deleteItem(announce._id);
                                    }}
                                    style={{
                                      marginRight: "1rem",
                                      color: "#39AEA9",
                                      fontSize: "1.5rem",
                                    }}
                                  />

                                </Link>
                                  <DeleteFilled
                                    onClick={() => {
                                      deleteItem(announce._id);
                                    }}
                                    style={{
                                      marginRight: "3rem",
                                      color: "#B33030",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                
                                </div>
                
                                <div className="">
                
                                  <h1 className="postType">{announce.type}</h1> 
                
                                  
                
                                </div>
                                
                              </div>
                
                            </div>
                            </div>
                          
                        )
                    })
                ) : (
                    announce.map((announce) => {
                        return (
                            <div className="newBox">
                
                            <div className="topBox">
                              <h1 className="corpName">{announce.titleName}</h1>
                
                              <h1 className="postDate">
                                <NotificationOutlined
                                  style={{
                                    marginRight: "1rem",
                                    fontSize: "1.2rem",
                                    color: "#019267",
                                  }}
                                />
                                {announce.createtime}
                              </h1>
                            </div>
                
                            <div className="middleBox">
                
                            <h1 className="postText">
                                  {announce.detail}
                                </h1>
                
                            </div>
                
                            <div className="bottomBox">
                
                              <div className="leftBotBox">
                                
                
                                <h1 className="postText2">
                                  <PhoneOutlined
                                    style={{
                                      marginLeft: "0rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#488FB1",
                                    }}
                                  />{" "}
                                  {announce.phoneNumber}{" "}
                                  <MailOutlined
                                    style={{
                                      marginLeft: "2rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#019267",
                                    }}
                                  />{" "}
                                  {announce.email}
                                </h1>
                              </div>
                
                              <div className="rightBotBox">
                                
                                <div className="">
                                  <Link to={`/addnews/${announce._id}`}>
                                  
                                    <EditOutlined
                                      onClick={() => {
                                        // deleteItem(announce._id);
                                      }}
                                      style={{
                                        marginRight: "1rem",
                                        color: "#39AEA9",
                                        fontSize: "1.5rem",
                                      }}
                                    />

                                  </Link>
                                  <DeleteFilled
                                    onClick={() => {
                                      deleteItem(announce._id);
                                    }}
                                    style={{
                                      marginRight: "3rem",
                                      color: "#B33030",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                
                                </div>
                
                                <div className="">
                
                                  <h1 className="postType">{announce.type}</h1> 
                
                                  
                
                                </div>
                                
                              </div>
                
                            </div>
                            </div>
                          
                        )
                    })
                )}

                
          



          {/* <div className="newBox">
            <div className="topBox">
              <h1 className="corpName">เงินเทอร์โบ</h1>

              <h1 className="postDate">
                <NotificationOutlined
                  style={{
                    marginRight: "1rem",
                    fontSize: "1.2rem",
                    color: "#019267",
                  }}
                />
                วันที่ 10 กุมพาพันธ์ 2565
              </h1>
            </div>

            <div className="bottomBox">
              <div className="leftBotBox">
                <h1 className="postText">
                  เปิดรับนักศึกษาฝึกงานตำแหน่ง frontend, backend, automation
                  engineer ที่เรียนจบมาในสาขาวิชา วิศวกรรมคอมพิวเตอร์
                  จำนวนมากสามารถสมัครมาได้ที่ช่องทางดังนี้ fackbook line
                  เเละทางเว็บไซต์ของทางบริษัท{" "}
                </h1>

                <h1 className="postText2">
                  <PhoneOutlined
                    style={{
                      marginLeft: "0rem",
                      marginRight: "1rem",
                      fontSize: "1.5rem",
                      color: "#488FB1",
                    }}
                  />{" "}
                  066-6666666{" "}
                  <MailOutlined
                    style={{
                      marginLeft: "2rem",
                      marginRight: "1rem",
                      fontSize: "1.5rem",
                      color: "#019267",
                    }}
                  />{" "}
                  artid_yenpram@gmail.com
                </h1>
              </div>

              <div className="rightBotBox">
                <EditOutlined
                  onClick={() => {
                    alert("clicked");
                  }}
                  style={{
                    marginRight: "1rem",
                    color: "#39AEA9",
                    fontSize: "1.5rem",
                  }}
                />
                <DeleteFilled
                  onClick={() => {
                    alert("clicked");
                  }}
                  style={{
                    marginRight: "3rem",
                    color: "#B33030",
                    fontSize: "1.5rem",
                  }}
                />
                <h1 className="postType">ฝึกงาน</h1>
              </div>
            </div>
          </div> */}
          
          {/* // MAPPPPPPPPPPPPPPPPPPP */}


          



        </div>

        <div style={{ padding: "10rem" }}></div>
      </div>
    </div>
  );
}

export default App;
