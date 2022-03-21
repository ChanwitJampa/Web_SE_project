import React from 'react';
import NavbarComponent from './NavbarComponent';
import "./OrganizationComponent1.css";
import { Link, withRouter } from "react-router-dom";

const OrganizationComponent1 = () => {

    return ( 
      <div>
           <NavbarComponent />
            
              <div className={"content-box"}>
                <h1> สถานประกอบการ</h1>
                  <input id="disabledInput" type="text" placeholder="ค้นหาสถานประกอบการ" onChange={""} ></input>
                 <button type="submit" className="btn btn-color">ยืนยัน</button> 
              </div>
              <div className='content1-box'>
                 <button class="button button1">ข้อมูลสถานประกอบการ</button>
                 <button class="button button2">จัดการข้อมูลสถานประกอบการ</button>
                    <Link to="/organization">
                      <button  class="button button3">+ เพิ่มสถานประกอบการ</button>
                   </Link>
                   <div className="content2-box" onClick={" "}></div>
                   <div className="content3-box" onClick={" "}></div>
                   <div className="content4-box" onClick={" "}></div>
                   <div className="content5-box" onClick={" "}></div>
                   <div className="content6-box" onClick={" "}></div>
              </div>    
      </div>
    );
  };
  export default OrganizationComponent1;
  