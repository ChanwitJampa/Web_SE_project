import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";


const NewsComponent=()=>{

    const [state,setState]=useState({
        companyName: "",
        typeRequest: "",
        studentID:"6220504640",
        jobTitle: "",
        assistanceName: "",
        assistanceRole : "",
        address: "",
        HRName: "",
        HRPhoneNumber: "",
        HREmail: "",
        dateStart: "",
        dateEnd: "",
        budget: "",
        accommodation: "",
        time: "",
    })
    /*const[user,setUser]=useUser({
        phoneNumber : "",
        email : "",
        type : "",
    })*/


    // const inputValue=name=>event=>{
    //     // setState({...state,[name]:organizationID,organizationName,phoneNumber,detial,type})
    //     /*setUser({...user,[name]:phoneNumber,email})*/
    // }

    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);

        setState({ ...state, [name]: event.target.value }); 
    };
    const {companyName,
        typeRequest,
        studentID,
        jobTitle,
        assistanceName,
        assistanceRole,
        address,
        HRName,
        HRPhoneNumber,
        HREmail,
        dateStart,
        dateEnd,
        budget,
        accommodation,
        time,}=state
    /*const{phoneNumber,email,type}=user*/

    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/requests`,{companyName,
        typeRequest,
        studentID,
        jobTitle,
        assistanceName,
        assistanceRole,
        address,
        HRName,
        HRPhoneNumber,
        HREmail,
        dateStart,
        dateEnd,
        budget,
        accommodation,
        time,}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                companyName: "",
                typeRequest: "",
                studentID:"6220504640",
                jobTitle: "",
                assistanceName: "",
                assistanceRole,
                address: "",
                HRName: "",
                HRPhoneNumber: "",
                HREmail: "",
                dateStart: "",
                dateEnd: "",
                budget: "",
                accommodation: "",
                time: "",
                })
                Swal.fire(
                    'อัพโหลดคำร้องสำเร็จ',
                    'กดตกลงเพื่อไปยังหน้าหลัก',
                    
                    
                ).then(()=>{
                    window.location.href = "/checkstatusfornisit"
                })
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire(
                'อัพโหลดคำร้องไม่สำเร็จ',
               )
        })
    }


    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1
                style={{
                    marginBottom: "2rem",
                    fontWeight: "bold",
                    color: "#FF6464",
                  }}
                  >กรอกคำร้อง</h1>

                <form onSubmit={signinForm} >
                    <div className="ra1">
                        <div className="formnews">
                        <label>ชื่อสถานประกอบการ/หน่วยงาน</label>
                        <input type="text" className="form-control" placeholder="ชื่อสถานประกอบการ/หน่วยงาน" onChange={inputValue("companyName")} />
                        </div>
                        <div className="formnews">
                        <label>ประเภทที่ยื่นคำร้อง(ฝึกงาน/สหกิจ)</label>
                        <input type="text" className="form-control" placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("typeRequest")}/>
                        </div>
                        <div className="formnews">
                        <label>ตำแหน่งที่ยื่นร้องขอ</label>
                        <input type="text" className="form-control" placeholder="กรอกตำแหน่งของคุณ" onChange={inputValue("jobTitle")}/>
                        </div>
                        <div className="formnews">
                        <label>ระบุชื่อของผู้ที่จะให้ภาควิชาฯ ออกหนังสือขอความอนุเคราะห์</label>
                        <input type="text" className="form-control" placeholder="ชื่อผู้อนุเคราะห์" onChange={inputValue("assistanceName")}/>
                        </div>
                        <div className="formnews">
                        <label>ระบุตำแหน่งของผู้ที่จะให้ภาควิชาฯ ออกหนังสือขอความอนุเคราะห์</label>
                        <input type="text" className="form-control"  placeholder="ชื่อผู้อนุเคราะห์" onChange={inputValue("assistanceRole")}/>
                        </div>
                        <div className="formnews">
                        <label>ที่อยู่</label>
                        <input type="text" className="form-control"  placeholder="ที่อยู่ของสถานที่ฝึกงาน" onChange={inputValue("address")}/>
                        </div>
                        <div className="formnews">
                        <label>ชื่อผู้ประสานงานของทางบริษัท</label>
                        <input type="text" className="form-control"  placeholder="ชื่อผู้ประสานงานของทางบริษัท" onChange={inputValue("HRName")}/>
                        </div>
                        <div className="formnews">
                        <label>เบอร์โทรผู้ประสานงาน</label>
                        <input type="text" className="form-control"  placeholder="เบอร์โทรผู้ประสานงานของทางบริษัท" onChange={inputValue("HRPhoneNumber")}/>
                        </div>
                        <div className="formnews">
                        <label>อีเมลผู้ประสานงาน</label>
                        <input type="text" className="form-control"  placeholder="อีเมลผู้ประสานงาน" onChange={inputValue("HREmail")}/>
                        </div>
                        <div className="formnews">
                        <label>เวลาเริ่มต้นฝึกงาน</label>
                        <input type="text" className="form-control"  placeholder="ว/ด/ป เริ่มต้น" onChange={inputValue("dateStart")}/>
                        </div>
                        <div className="formnews">
                        <label>เวลาสิ้นสุดการฝึกงาน</label>
                        <input type="text" className="form-control"  placeholder="ว/ด/ป สิ้นสุด" onChange={inputValue("dateEnd")}/>
                        </div>
                        <div className="formnews">
                        <label>จำนวนค่าตอบเเทน</label>
                        <input type="text" className="form-control"  placeholder="จำนวนค่าตอบเเทน บ/วัน" onChange={inputValue("budget")}/>
                        </div>
                        <div className="formnews">
                        <label>มีที่พักให้หรือไม่</label>
                        <input type="text" className="form-control"  placeholder="มีที่พักหรือไม่" onChange={inputValue("accommodation")}/>
                        </div>
                        
                        <button type="submit" className="btn btn-color" style={{marginLeft:"40rem",marginTop:"1rem",marginBottom:"5rem"}} >อัพโหลดคำร้อง</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default NewsComponent;