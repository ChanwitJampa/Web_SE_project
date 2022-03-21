import React from 'react';
import NavbarComponent from "./NavbarComponent";
import "./ReqComponent.css";

import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ReqComponent=()=>{
   
    return ( 
        <div>
             <NavbarComponent />
             <div className={"wallpaper"}>

                <div className={"ReqComponent-box"}>
                    <h1>คำร้อง</h1>
                </div> 
                <div className={"ReqComponent2-box"}>
                   <table class="table">
                    <thead>
                     <tr>
                         <th scope="co2">คำร้องที่ยื่นมา</th> 
                         <th scope="co2">ฝึกงาน/สหกิจ</th>
                         <th scope="co2">สภานะ</th>
                         <th scope="co2">วันที่</th>
                         <th scope="co2"> - </th>
                     </tr>
                    </thead>
                </table>
                <div></div>

                </div> 



                
             </div>     
        </div>
      );
};
export default ReqComponent;