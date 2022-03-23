import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "./LoginComponent.css";
import axios from "axios";
import Swal from "sweetalert2";
import kuLogo2 from "../assets/ku_logo.jpg";
import LOGO from "../assets/img/login_photo.png";
import { authenticate } from "../servies/authorize";


const LoginComponent=(props)=>{
    const [user,setUser]=useState({
        studentID:"",
        password:""
    })
    const {studentID,password}=user
    const inputValue=name=>event=>{
        //console.log(name,"=",event.target.value)
        setUser({...user,[name]:event.target.value});
    }
    
    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{studentID,password}).then(res=>{
            console.log(res.data)
            setUser(res.data)
            console.log(user)
            setUser({...user,
                studentID:"",
                password:""})
                Swal.fire(
                    'เข้าสู่ระบบสำเร็จ',
                ).then(()=>{
                    authenticate(res,()=>props.history.push("/"))
                })
                // ).then(()=>{
                //     window.location.href = "/"
                // })
        })
        .catch((err)=>{
            Swal.fire(
                'เข้าสู่ระบบไม่สำเร็จ',
                'StudentID or Password is wrong',
                'error',
                err.response.data.error,
               )
        })
    }

    return(
        <div>  
            {/* <NavbarComponent/> */}
            <div className="containerLogin">
                <div>
                    <div className="logoImg">
                        <img src={kuLogo2} alt="KULogo" width="250" height="250" />
                        <h3 className="loginText2">ระบบจัดการการฝึกงาน</h3>
                        <h3 className="loginText">Login</h3>
                    </div>
                    
                    <div className="outerLogin">
                        <div className="innerLogin">
                            <form onSubmit={signinForm}>
                                <div className="form-group">
                                    <label>Nontri Account</label>
                                    <input type="text" className="form-control" placeholder="bxxxxxxxxxx" onChange={inputValue("studentID")}/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" id="password" onChange={inputValue("password")}/>
                                </div>

                                {/* <p className="forgot-password text-right">
                                    Don't have an account <Link to="/register" >Register</Link>
                                </p> */}
                                
                                <button type="submit" className="btn btn-success" >Sign in</button>
                                <Link to="/" ><button to="" type="submit" className="btn btn-success" style={{backgroundColor:"#005334"}}>Login as Guest</button></Link>
                                {/* <Link to="" type="submit" className="btn btn-success" style={{backgroundColor:"#005334",marginTop:"3rem"}}>go to app</Link> */}
                                
                            </form>
                        </div>
                    </div>
                </div>
                <img className="logo_login" src={LOGO} alt="Logo" width="700" height="700" />

                <div>

                </div>


            </div>
        </div>
    )
}
export default LoginComponent;
