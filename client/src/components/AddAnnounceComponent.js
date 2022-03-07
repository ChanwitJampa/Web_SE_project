import NavbarComponent from "./NavbarComponent";
import "./AddAnnounceComponent.css";
import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const AddAnnounceComponent=()=>{
    const [state,setState]=useState({
        hospitalID:"621a99528503e41d702f31f0",
        hospitalName:"โรงพยาบาลกำแพงแสน",
        vaccinationSite:"",
    })
    const inputValue=name=>event=>{
        setState({...state,[name]:hospitalID,hospitalName,vaccinationSite})
        
    }
    const {hospitalID,hospitalName,vaccinationSite,DateStart,DateEnd,numberPeople,vaccine,registrationType,linkRegistration,image,more}=state
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>เขียนประกาศ</h1>
                <div className="content-box">
                    <h4>โรงพยาบาล</h4>
                    <div className="form-group">
                        <input type="text" value={hospitalName} className="form-control" disabled/>
                    </div>
                    <div className="form-group">
                    <label>สถานที่ฉีดวัคซีน</label>
                    <input type="text" className="form-control" placeholder="ex มหาวิทยาลัยเกษตรศาสตร์" onChange={inputValue("vaccinationSite")}/>
                    </div>
                    <div className="form-group">
                    <label>จำนวนวัน</label>
                    <select class="form-select" searchable="Search here.." >
                              <option value="1" disabled selected>เลือกจำนวนวัน</option>
                              <option value="1">1 วัน</option>
                              <option value="2">หลายวัน</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label>ระยะเวลา</label>
                    <input type="date" className="form-control" onChange={inputValue("DateStart")}/>
                        ถึงวันที่
                    <input type="date" className="form-control" onChange={inputValue("DateEnd")}/>
                    </div>
                    <div className="form-group">
                    <label>จำนวนคนน</label>
                    <input type="number" className="form-control" placeholder="ex 500, 3000" onChange={inputValue("numberPeople")}/>
                    </div>
                    <div className="form-group">
                    <label>เวลารอบเช้า</label>
                    <input type="time"  onChange={inputValue("vaccinationSite")}/>
                    </div>
                    <div className="form-group">
                    <label>เวลารอบบ่าย</label>
                    <input type="time"  onChange={inputValue("vaccinationSite")}/>
                    </div>
                    
                    <div className="text-line">
                        <p>วัคซีน</p>
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
                    </div>
                    <button type="button" className="button-vaccine"><FontAwesomeIcon icon={faAdd}/>Add vaccine</button>
                    </div>
                    <div className="form-group">
                    <label>ประเภทการลงทะเบียน</label>
                    <select class="form-select" searchable="Search here.." onChange={inputValue("registrationType")}>
                              <option value="1" disabled selected>เลือกเภท</option>
                              <option value="1">Register</option>
                              <option value="2">Walk in</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label>ลิงค์ลงทะเบียน (สำหรับแบบลงทะเบียน)</label>
                    <input type="url"  className="form-control" onChange={inputValue("linkRegistration")} placeholder= "ex http://hospitalnakornpathom.com"/>
                    </div>
                    <div className="form-group">
                    <label>เพิ่มไฟล์รูปคิวอาโค้ด (สำหรับแบบลงทะเบียน)</label>
                    <input type="file"  className="form-control" onChange={inputValue("image")} />
                    </div>
                    <div className="form-group">
                    <label>ประกาศเพิ่มเติม</label>
                    <input type="text" className="form-control" onChange={inputValue("more")} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default AddAnnounceComponent;