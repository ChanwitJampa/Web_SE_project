import NavbarComponent from "./NavbarComponent";
import "./AddAnnounceComponent.css";
import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const AddAnnounceComponent=()=>{
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
        setState({...state,[name]:organizationID,organizationName,webSite})
        
    }
    const {organizationID,organizationName,webSite,DateStart,DateEnd,numberPeople,vaccine,registrationType,linkRegistration,image,topic}=state
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
                    <input type="text" className="form-control" placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("website")}/>
                    </div>
                        {/*<p>วัคซีน</p>
                        <div className="tap-top-select-in">
                            <div className="tap-select">
                            <select aria-label="Default select example">
                            <option disabled selected>เลือกเข็มที่</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                             </div>
                            <div className="tap-select">
                            <select  aria-label="Default select example">
                            <option disabled selected>เลือกช่วงอายุ</option>
                            <option value="1">เด็ก 12-18 ปี</option>
                            <option value="2">18 ปีขึ้นไป</option>
                            <option value="3">สูงกว่า 60 ปี</option>
                            </select> 
                            </div>
                            <div className="tap-select">
                            <select aria-label="Default select example">
                            <option disabled selected>เลือกวัคซีน</option>
                            <option value="1">ไฟเซอร์</option>
                            <option value="2">แอสต้าเซเนก้า</option>
                            <option value="3">โมเดอร์นา</option>
                            <option value="4">ซิโนฟาร์ม</option>
                            <option value="5">ซิโนแวก</option>
                            </select>
                            </div>
                        </div>*/}
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
export default AddAnnounceComponent;