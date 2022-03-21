import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const NewsComponent=()=>{
    const [state,setState]=useState({
        organizationID:"621a99528503e41d702f31f0",
        organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
        detail:"",
    })
    /*const[user,setUser]=useUser({
        phoneNumber : "",
        email : "",
        type : "",
    })*/

    const inputValue=name=>event=>{
        // setState({...state,[name]:organizationID,organizationName,phoneNumber,detial,type})
        /*setUser({...user,[name]:phoneNumber,email})*/
    }
    const {organizationID,organizationName,image,topic,detial}=state
    /*const{phoneNumber,email,type}=user*/
    /*const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{organizationName,detail,phoneNumber,email,type}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                organizationName: "",
                detial:"",
                phoneNumber: "",
                email:"",
                type:"",
                })
                Swal.fire(
                    'อัพโหลดประกาศสำเร็จ',
                )
        })
        .catch((error)=>{
            Swal.fire(
                'อัพโหลดประกาศไม่สำเร็จ',
               )
        })
    }*/
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>กรอกข้อมูลประกาศ</h1>
                <div className="content-boxnews">
                    <div className="formnews">
                    <label>ชื่อสถานประกอบการ</label>
                    <input type="text" className="form-control" onChange={inputValue("organizationName")} />
                    </div>
                    <div className="formnews">
                    <label>รายละเอียด</label>
                    <input type="text" className="form-control" placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("detial")}/>
                    </div>
                    <div className="formnews">
                    <label>เบอร์โทรศัพท์ของสถานประกอบการ</label>
                    <input type="text" className="form-control" placeholder="xxxxxxxxxx" onChange={inputValue("phoneNumber")}/>
                    </div>
                    <div className="formnews">
                    <label>email</label>
                    <input type="text" className="form-control"  onChange={inputValue("email")}/>
                    </div>
                    <div className="formnews">
                    <label>ประเภท(ฝึกงาน/สหกิจ)</label>
                    <input type="text" className="form-control"  placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("type")}/>
                    </div>
                    

                <button type="submit" className="btn btn-color" >อัพโหลดประกาศ</button> 
                </div>
            </div>
        </div>
    );
};
export default NewsComponent;