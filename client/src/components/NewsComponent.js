import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const NewsComponent=()=>{
    const [state,setState]=useState({
        organizationID:"621a99528503e41d702f31f0",
        organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
        webSite:"",
        flexRadioDefault : "",
    })
    /*.then(response => {
        Swal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
        setState({
          ...state,
          topic: "",
          webSite: "",
        });
      })
      .catch(error=> {
        Swal.fire(
          "Alert",
          error.response.data.error,
          "error"
        );
    });*/
    
    const inputValue=name=>event=>{
        setState({...state,[name]:organizationID,organizationName,detial})
        
    }
    const {organizationID,organizationName,image,topic,detial}=state
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>กรอกข้อมูลประกาศ</h1>
                <div className="content-box">
                    <div className="form">
                    <label>หัวข้อ</label>
                    <input type="text" className="form-control" onChange={inputValue("topic")} />
                    </div>
                    <div className="form">
                    <label>รายละเอียด</label>
                    <input type="text" className="form-control" placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("detial")}/>
                    </div>
                    <div className="text-line">
                        <div class="form-check1">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">ฝึกงาน</label>
                        </div>
                        <div class="form-check2">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label class="form-check-label" for="flexRadioDefault2">สหกิจ</label>
                        </div>
                    </div>

                <button type="submit" className="btn btn-color" >อัพโหลดประกาศ</button> 
                </div>
            </div>
        </div>
    );
};
export default NewsComponent;