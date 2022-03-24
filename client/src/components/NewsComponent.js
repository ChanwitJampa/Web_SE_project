import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const NewsComponent=()=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     detail:"",
    // })

  const [announces, setannounces] = useState([]);


    const fetchData = () => {
        axios
          .get(`http://localhost:5000/api/announces`)
          .then((response) => {
            console.log(response.data)
            setannounces(response.data);
    
          })
          .catch((err) => console.log(err));
      };
    
      //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
      useEffect(() => {
        fetchData();
      }, []);
    
    const [state,setState]=useState({
        titleName: "",
        detail: "",
        phoneNumber: "",
        email: "",
        type: "",
      })
    
    
      const {titleName,
        detail,
        phoneNumber,
        email,
        type,}=state

    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/announces`,{
            titleName,
            detail,
            phoneNumber,
            email,
            type,}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                titleName: "",
                detail: "",
                phoneNumber: "",
                email: "",
                type: "",
                
                })
                Swal.fire(
                    'เพิ่มคำร้องร้องสำเร็จ',
                    'กดตกลงเพื่อไปยังหน้าหลัก',
                    
                    
                ).then(()=>{
                    window.location.href = "/"
                })
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire(
                'เพิ่มคำร้องไม่สำเร็จ',
               )
        })

        
    }


    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };


    // const inputValue=name=>event=>{
    //   /*  setState({...state,[name]:organizationID,organizationName,phoneNumber,detial,type})*/
    //     /*setUser({...user,[name]:phoneNumber,email})*/
    // }
    // const {organizationID,organizationName,image,topic,detial}=state
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

                <form onSubmit={signinForm}>

                    <div className="b1">
                        <div className="formnews">
                        <label>ชื่อสถานประกอบการ</label>
                        <input type="text" id="disabledInput" className="form-control" placeholder="กรอกชื่อของสถานประกอบการ" onChange={inputValue("titleName")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control" placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("detail")}/>
                        </div>
                        <div className="formnews">
                        <label>เบอร์โทรศัพท์ของสถานประกอบการ</label>
                        <input type="text" id="disabledInput" className="form-control" placeholder="0xx-xxxxxxx" onChange={inputValue("phoneNumber")}/>
                        </div>
                        <div className="formnews">
                        <label>E-mail</label>
                        <input type="text" id="disabledInput" className="form-control"  placeholder="กรอก Email ของคุณ" onChange={inputValue("email")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภท(ฝึกงาน/สหกิจ)</label>
                        <input type="text" id="disabledInput" className="form-control"  placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("type")}/>
                        </div>
                        

                        <button type="submit" className="btn btn-color"  style={{marginLeft:"35rem",marginTop:"2rem",color:"#F5F5F5"}}>อัพโหลดประกาศ</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default NewsComponent;