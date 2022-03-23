import React from 'react';
import NavbarComponent from "./NavbarComponent";
import "./ReqComponent.css";

import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link, withRouter } from "react-router-dom";
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


const ReqComponent=()=>{
   
    return ( 
        <div>
            <NavbarComponent /> 
             <div className={"wallpaper"}>

                <div className={"ReqComponent-box"}>
                    <h1>คำร้อง</h1>
                </div> 

                

                <table class="table">
                    <thead class="thead-dark">
                     <tr>
                       <th scope="col">คำร้องที่ยื่นมา</th>
                       <th scope="col">ฝึกงาน/สหกิจ</th>
                       <th scope="col">สถานะ</th>
                       <th scope="col">วันที่</th>
                       <th scope="col">
                           
                           <Link to="/addreq">
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
            
            </th>
                    </tr>
                    </thead>
                <tbody>
                     <tr>
                        <th scope="row">นายสมชาย ขายน้ำท่อม</th>
                        <td>ฝึกงาน</td>
                        <td>อนุมัติแล้ว</td>
                        <td >12/12/2565</td>
                        <td ><button>เปลี่ยนสถานะ</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายชะอม ขมคอ</th>
                        <td>ฝึกงาน</td>
                        <td>อนุมัติแล้ว</td>
                        <td>15/2/2565</td>
                        <td ><button>เปลี่ยนสถานะ</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายพชร หนอนไม้งาม</th>
                        <td>สหกิจ</td>
                        <td>รอพิจารณา</td>
                        <td>15/5/2565</td>
                        <td ><button>เปลี่ยนสถานะ</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายบรรจง ไม่ได้นอน</th>
                        <td>ฝึกงาน</td>
                        <td>รอพิจารณา</td>
                        <td>14/01/2565</td>
                        <td ><button>พิจารณา</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายม่อนน้อย ตบบอส </th>
                        <td>ฝึกงาน</td>
                        <td>รอพิจารณา</td>
                        <td>29/02/2565</td>
                        <td ><button>เปลี่ยนสถานะ</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายพอร์ช อยากโดมโถม</th>
                        <td>ฝึกงาน</td>
                        <td>รอพิจารณา</td>
                        <td>31/02/2565</td>
                        <td ><button>พิจารณา</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายปลาย โคตรขยัน</th>
                        <td>ฝึกงาน</td>
                        <td>รอพิจารณา</td>
                        <td>03/03/2565</td>
                        <td ><button>พิจารณา</button></td>
                    </tr>
                    <tr>
                        <th scope="row">นายเตซี่ มีแต่สาว</th>
                        <td>ฝึกงาน</td>
                        <td>รอพิจารณา</td>
                        <td>02/03/2565</td>
                        <td ><button>เปลี่ยนสถานะ</button></td>
                    </tr>
                        </tbody>
                </table>

                {/* <div className={"ReqComponent2-box"}>
                    <div className='groupRe3'>
                            <div className={"ReqComponent3-box"}>
                                 <h4>คำร้องที่ยื่นมา</h4>
                            </div>
                             <div className={"ReqComponent3-box"}>
                                <h4>ฝึกงาน/สหกิจ</h4>
                            </div>
                            <div className={"ReqComponent3-box"}>
                                <h4>สถานะ</h4>
                            </div>
                            <div className={"ReqComponent3-box"}>
                                <h4>วันที่</h4>
                            </div>/
                            

                    </div>

                   <div className="contents-box">
                       <div className='groupReport'>
                            <div className='report1'>นายชะอม  ผสมใบท่อม</div>
                                
                            <div className='report2'>สหกิจ</div>
                                
                            <div className='report3'>ไม่ผ่านการอนุมัติ</div>
                                
                            <div className='report4'>04/12/2565</div>
                                
                            <div className='report5'></div>            
                       </div>
                   </div>
                   <div className="contents-box">
                       <div className='groupReport'>
                            <div className='report1'> นายชะอม  ผสมใบท่อม</div>
                               
                            <div className='report2'> สกกิจ</div>
                               
                            <div className='report3'>ไม่ผ่านการอนุมัติ</div>
                                
                            <div className='report4'> 04/12/2565</div>
                               
                            <div className='report5'></div>            
                       </div>
                   </div>


                  
                </div> */}
             </div>     
        </div>
      );
};
export default ReqComponent;