import NavbarComponent from "./NavbarComponent";
import "./NewsAddComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import {
    SmileTwoTone,
    HeartTwoTone,
    CheckCircleTwoTone,
    ClockCircleOutlined,
    NotificationOutlined,
    PhoneOutlined,
    MailOutlined,
    DeleteOutlined,
    DeleteFilled,
    EditOutlined,
    PlusOutlined,
    FormOutlined,
    CheckOutlined
    
  } from "@ant-design/icons";


import axios from "axios";
import Swal from "sweetalert2";
const NewsAddComponent=(props)=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     detail:"",
    // })

  const [announces, setannounces] = useState([]);


    // const fetchData = () => {
    //     axios
    //       .get(`http://localhost:5000/api/announces`)
    //       .then((response) => {
    //         console.log(response.data)
    //         setannounces(response.data);
    
    //       })
    //       .catch((err) => console.log(err));
    //   };
    
    //   //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
    //   useEffect(() => {
    //     fetchData();
    //   }, []);


      useEffect(()=>{
        axios.get(`http://localhost:5000/api/announces/${props.match.params._id}`)
        .then(response=>{
            const {_id,titleName,detail,phoneNumber,email,type}= response.data
            setState({...state,_id,titleName,detail,phoneNumber,email,type})
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    

    const [state,setState]=useState({
        _id:"",
        titleName: "",
        detail: "",
        phoneNumber: "",
        email: "",
        type: "",
      })
    
    
      const {_id,
        titleName,
        detail,
        phoneNumber,
        email,
        type,}=state
        
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };

    const submitForm=(event)=>{
        event.preventDefault();
        console.table({_id,titleName,detail,phoneNumber,email,type});
        axios.put(`http://localhost:5000/api/announces/${_id}`,{_id,titleName,detail,phoneNumber,email,type})
        .then(response=>{
            Swal.fire(
                'Alert',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            ).then(()=>{
                window.location.href = "/"
            })
            const {_id,titleName,detail,phoneNumber,email,type}=response.data
            setState({...state,_id,titleName,detail,phoneNumber,email,type})
        })
        .catch((error)=>{
            Swal.fire(
                'Alert',
                //err.response.data.error,
                'error'
            )
        }
        )
    }

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
                <h1>แก้ไขข้อมูลประกาศ</h1>

                <form onSubmit={submitForm}>

                    <div className="n1">
                        <div className="formnews">
                        <label>ชื่อสถานประกอบการ</label>
                        <input type="text" id="disabledInput" className="form-control" value={titleName} onChange={inputValue("titleName")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control" value={detail} placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("detail")}/>
                        </div>
                        <div className="formnews">
                        <label>เบอร์โทรศัพท์ของสถานประกอบการ</label>
                        <input type="text" id="disabledInput" className="form-control" value={phoneNumber} placeholder="0xx-xxxxxxx" onChange={inputValue("phoneNumber")}/>
                        </div>
                        <div className="formnews">
                        <label>email</label>
                        <input type="text" id="disabledInput" className="form-control"  value={email} onChange={inputValue("email")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภท(ฝึกงาน/สหกิจ)</label>
                        <input type="text" id="disabledInput" className="form-control"  value={type} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("type")}/>
                        </div>
                        

                        <button type="submit" className="btn btn-color" style={{color:"#F5F5F5",fontWeight:"bold",marginLeft:"30rem",marginTop:"2rem"}}><CheckOutlined style={{color:"#F5F5F5",fontWeight:"bold",marginRight:"1rem"}}/>แก้ไขประกาศ</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default NewsAddComponent;