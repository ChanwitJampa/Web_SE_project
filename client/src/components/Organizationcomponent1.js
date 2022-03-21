import React from 'react';
import NavbarComponent from './NavbarComponent';
import "./OrganizationComponent1.css";
import { Link, withRouter } from "react-router-dom";

const OrganizationComponent1 = () => {

    return ( 
      <div>
           <NavbarComponent />
              <div className={"contenthead-box"}>
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
                   <div className="content2-box" onClick={" "}>
                      <div className='companyName'>
                              gofive
                      </div>
                      <div className='buttonGroup'>

                         <button class="button-correct" ></button>
                         <button class="button-delete"></button>
                      </div>
                   </div>

                   <div className="content2-box" onClick={" "}>
                      <div className='companyName'>
                              gofive
                      </div>
                      <div className='buttonGroup'>
                         <button class="button-correct"></button>
                         <button class="button-delete"></button>
                      </div>
                   </div>

                   <div className="content2-box" onClick={" "}>
                      <div className='companyName'>
                              gofive
                      </div>
                      <div className='buttonGroup'>
                         <button class="button-correct"></button>
                         <button class="button-delete"></button>
                      </div>
                   </div>

                   <div className="content2-box" onClick={" "}>
                      <div className='companyName'>
                              gofive
                      </div>
                      <div className='buttonGroup'>
                         <button class="button-correct"></button>
                         <button class="button-delete"></button>
                      </div>
                   </div>

                   <div className="content2-box" onClick={" "}>
                      <div className='companyName'>
                              gofive
                      </div>
                      <div className='buttonGroup'>
                         <button class="button-correct"></button>
                         <button class="button-delete"></button>
                      </div>
                   </div>

              </div>    
      </div>
    );
  };
  export default OrganizationComponent1;
  