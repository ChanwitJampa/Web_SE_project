import React, { useState, useEffect } from "react";
import NavbarComponent from './NavbarComponent';
import "./OrganizationComponent1.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
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
                   {companies.map((companies) => {
                      return (

                        <div className="content2-box" onClick={" "}>
                           <div className='companyName'>
                                    {companies.companyName}
                           </div>
                           <div className='buttonGroup'>

                              <button class="button-correct" ></button>
                              <button class="button-delete"></button>
                           </div>
                        </div>

                        
                      )
                   }
                     
                   )}

                   

                   

                   

              </div>    
      </div>
    );
  };
  export default OrganizationComponent1;
  