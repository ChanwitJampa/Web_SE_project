import React, { useState, useEffect } from "react";
import NavbarComponent from './NavbarComponent';
import "./OrganizationComponent1.css";
import { Link, withRouter } from "react-router-dom";
import { getRole, getUser,logout,getStudentID,getLastName,getFirstName } from "../servies/authorize";

import axios from "axios";
import Swal from "sweetalert2";
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
  PrinterOutlined,
} from "@ant-design/icons";




const OrganizationComponent1 = () => {

   const [companies, setcompanies] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/companies`)
      .then((res) => {
        setcompanies(res.data);
        console.log(res.data);
        console.log("ANNOUCE  = ")
        console.log(companies)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
  }, []);


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
          .delete(`http://localhost:5000/api/companies/${id}`)
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


  const updateItem = (id) => {
    //swalAlert
    Swal.fire({
      title: 'แก้ไขข้อมูลสถานประกอบการ',
      text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'การแก้ไขข้อมูลสำเร็จ',
          'ข้อมูลของคุณถูกแก้ไขเรียบร้อยแล้ว',
          'success'
        )

        //update
        axios
          .put(`http://localhost:5000/api/companies/${companies._id}`, companies)
          .then((res) => {
            console.log("UPDATE SUCCESS");
            console.log(res);
            fetchData();
          })
          .catch((err) => {
            console.log("UPDATE NOT SUCCESS");
            console.log(err);
          });
    // deleteItem(companies._id);
  }})
  }

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = companies.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
        console.log(filteredData);
    }
    else{
        setFilteredResults(companies)
    }
}


    return ( 
      <div className="container2">
      <NavbarComponent />

      <div className="container3">


        <div className="searchAreaO">
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
                fontSize:"2.5rem"
              }}
            >
              สถานประกอบการ
            </h1>
            

            {getRole()=='Professor' &&(
                      <div>
                        <Link to="/organization">
                          <button
                            to=""
                            type="submit"
                            className="btn btn-success"
                            // onClick={}
                            style={{
                              backgroundColor: "#02BC77",
                              width: "15rem",
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
                            เพิ่มสถานประกอบการ
                          </button>

                        </Link>
                        
                          
                      </div> 
                  )
              }
              
          </div>


          {searchInput.length > 1 ? (
                    filteredResults.map((companies) => {
                        return (
                            <div className="newBox">
                
                            <div className="topBox">
                              <h1 className="corpName">{companies.companyName}</h1>
                
                              
                            </div>
                
                            <div className="middleBox">
                
                                <h1 className="postText">
                                  {companies.businessType}
                                </h1>
                                <h1 className="postText">
                                  {companies.address}
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
                                  {companies.phoneNumber}{" "}
                                  <PrinterOutlined 
                                    style={{
                                      marginLeft: "2rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#019267",
                                    }}
                                  />{" "}
                                  {companies.tel}
                                </h1>
                              </div>
                
                              <div className="rightBotBoxO">
                                
                                <div className="">

                                {getRole()=='Professor' &&(
                                        <div>
                                          <EditOutlined
                                            onClick={() => {
                                              deleteItem(companies._id);
                                            }}
                                            style={{
                                              marginRight: "1rem",
                                              color: "#39AEA9",
                                              fontSize: "1.5rem",
                                            }}
                                          />
                                          <DeleteFilled
                                            onClick={() => {
                                              deleteItem(companies._id);
                                            }}
                                            style={{
                                              marginRight: "3rem",
                                              color: "#B33030",
                                              fontSize: "1.5rem",
                                            }}
                                          />
                                          
                                            
                                        </div> 
                                    )
                                }
                

                
                                </div>
                
                                
                                
                              </div>
                
                            </div>
                            </div>
                          
                        )
                    })
                ) : (
                    companies.map((companies) => {
                        return (
                            <div className="newBox">
                
                            <div className="topBox">
                              <h1 className="corpName">{companies.companyName}</h1>
                
                              
                            </div>
                
                            <div className="middleBox">
                
                              <h1 className="postText">
                                {companies.businessType}
                              </h1>
                              <h1 className="postText">
                                {companies.address}
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
                                  {companies.phoneNumber}{" "}
                                  <PrinterOutlined 
                                    style={{
                                      marginLeft: "2rem",
                                      marginRight: "1rem",
                                      fontSize: "1.5rem",
                                      color: "#019267",
                                    }}
                                  />{" "}
                                  {companies.tel}
                                </h1>
                              </div>
                
                              <div className="rightBotBoxO">
                                
                                <div className="">

                                {getRole()=='Professor' &&(
                                        <div>
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
                                          <DeleteFilled
                                            onClick={() => {
                                              deleteItem(companies._id);
                                            }}
                                            style={{
                                              marginRight: "3rem",
                                              color: "#B33030",
                                              fontSize: "1.5rem",
                                            }}
                                          />
                                          
                                            
                                        </div> 
                                    )
                                }
                
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

      // <div>
      //      <NavbarComponent />
      //         <div className={"contenthead-box"}>
      //           <h1> สถานประกอบการ</h1>

      //           <div className="searchArea">
      //             <form class="d-flex">
      //               <input
      //                 class="form-control me-2"
      //                 type="search"
      //                 placeholder="Search.."
      //                 aria-label="Search"
      //                 // onChange={(e) => searchItems(e.target.value)}
      //               ></input>
      //               {/* <button class="btn btn-outline-success" type="submit">
      //                 Search
      //               </button> */}
      //             </form>
      //           </div>


      //         </div>

      //         <div className='box1'>

      //           <div className="headerBox">

      //            <button class="button button1">ข้อมูลสถานประกอบการ</button>
      //            <button class="button button2">จัดการข้อมูลสถานประกอบการ</button>

      //               <Link to="/organization">
      //                 <button  class="button button3">+ เพิ่มสถานประกอบการ</button>
      //               </Link>

      //           </div>

      //              {companies.map((companies) => {
      //                 return (

      //                   <div className="newBox">
                
      //                       <div className="topBox">
      //                         <h1 className="corpName">{companies.companyName}</h1>
                
                              
      //                       </div>
                
      //                       <div className="middleBox">
                
                            
                
      //                         <div className="bottomBox">
                  
                                
                  
                                  
      //                               <div className="">
      //                                 <EditOutlined
      //                                   onClick={() => {
      //                                     // deleteItem(announce._id);
      //                                   }}
      //                                   style={{
      //                                     marginRight: "1rem",
      //                                     color: "#39AEA9",
      //                                     fontSize: "1.5rem",
      //                                   }}
      //                                 />
      //                                 <DeleteFilled
      //                                   onClick={() => {
      //                                     deleteItem(companies._id);
      //                                   }}
      //                                   style={{
      //                                     marginRight: "3rem",
      //                                     color: "#B33030",
      //                                     fontSize: "1.5rem",
      //                                   }}
      //                                 />
                    
      //                               </div>
      //                         </div>  
                
      //                       </div>    
      //                   </div>

                        
      //                 )
      //              }
                     
      //              )}

                   

                   

                   

      //         </div>    
      // </div>

      
    );
  };
  export default OrganizationComponent1;
  