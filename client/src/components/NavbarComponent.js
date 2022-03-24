import {Link,withRouter} from "react-router-dom";
import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBullhorn, faHome, faHospital, faMap, faPlus, faRegistered, faSyringe, faList, faUser, faPowerOff, faNewspaper, faIndustry, faBuilding, faClipboardCheck, faFileContract, faChartLine, faBuildingColumns, faCircleCheck, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
//import { getUser,logout } from "../servies/authorize";
import { getRole, getUser,logout,getStudentID,getLastName,getFirstName } from "../servies/authorize";
import './NavbarComponent.css';
import Swal from "sweetalert2";

const NavbarComponent=(props)=>{

    const logOut = () => {

        // logout(()=>props.history.push("/login"))
        Swal.fire(
            'ออกจากระบบสำเร็จ',
        ).then(()=>{
            logout(()=>props.history.push("/login"))
        })

        // Swal.fire(
        //     'ออกจากระบบสำเร็จ',
        // ).then(()=>{
        //     window.location.href = "/login"
        // })

    }

    //useEffect
    useEffect(()=>{
        console.log(getUser())
        console.log(getRole())
        console.log(getStudentID())
        console.log(getLastName())
        console.log(getFirstName())
    },[])

    return(
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <h1 className="navbar-logolink">
                        ระบบจัดการการฝึกงาน มหาวิทยาลัยเกษตรศาสตร์
                    </h1>
                </div>
                <ul>

                {getRole() &&(
                    <li>
                        <h3 className="userName">{getFirstName() + "   " +  getLastName()}</h3> 

                    </li>
                )}

                {/* <li>
                    <div onClick={logOut} className="navbar-link" style={{cursor:"pointer"}}><FontAwesomeIcon icon={faPowerOff} className="navbar-icon"/><span></span></div>
                </li> */}

                
                {!getUser() &&(
                    <li>
                        <Link to="/login" className="navbar-link"><FontAwesomeIcon icon={faUser} className="navbar-icon"/>Login</Link>
                    </li>
                    )
                }

                {getUser() &&(
                    <li>
                        <a onClick={logOut} className="navbar-link" style={{cursor:"pointer"}}><FontAwesomeIcon icon={faPowerOff} className="navbar-icon"/>Logout</a>
                    </li>
                )
                }

            

                {/* <li>
                    <Link to="/announce" className="navbar-link"><FontAwesomeIcon icon={faBullhorn} className="navbar-icon"/>Announce</Link>
                </li>
                <li>
                    <Link to="/login" className="navbar-link"><FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icon"/>Login</Link>
                </li>
                <li>
                    <Link to="/register" className="navbar-link"><FontAwesomeIcon icon={faRegistered} className="navbar-icon"/>Register</Link>
                </li> */}
                {/* 
                    <li className="nav-item pt-3 pb-3">
                        <button onClick={()=>logout(()=>props.history.push("/"))} className="nav-link">Logout</button>
                    </li>
                */}
                </ul>
            </div>

            {getRole() &&(
        <div class="sidenav">
            <div to="" className="sidenav-link2"><FontAwesomeIcon icon={faUser} className="sidenav-iconRole"/><h1 className="roleText">{getRole()}</h1></div>
            <div to="" className="sidenav-link2"><FontAwesomeIcon icon={faUser} className="sidenav-icon2"/></div>
            <div to="" className="sidenav-link2"><FontAwesomeIcon icon={faList} className="sidenav-icon3"/></div>
            <Link to="/" className="sidenav-link"><FontAwesomeIcon icon={faNewspaper} className="sidenav-icon"/>ข่าวสารประกาศ</Link>
            <Link to="/organization1" className="sidenav-link"><FontAwesomeIcon icon={faBuilding} className="sidenav-icon"/>สถานประกอบการ</Link>
            {/*<Link to="/organization" className="sidenav-link"><FontAwesomeIcon icon={faBuilding} className="sidenav-icon"/>สถานประกอบการ</Link>*/}
            {getRole()=='Student' &&(
                <div>
                     <Link to="/checkstatusfornisit" className="sidenav-link"><FontAwesomeIcon icon={faClipboardCheck} className="sidenav-icon"/>ตรวจสอบสถานะ</Link>
                     <Link to="/documents" className="sidenav-link"><FontAwesomeIcon icon={faFileContract} className="sidenav-icon"/>เอกสารที่เกี่ยวข้อง</Link>
                     <Link to="/result" className="sidenav-link"><FontAwesomeIcon icon={faChartLine} className="sidenav-icon"/>ผลการฝึกงาน</Link>
                        
                    </div> 
                )
            }
            {getRole()=='Professor' &&(
                <div>
                        <Link to="/checkstatusforsuper" className="sidenav-link"><FontAwesomeIcon icon={faClipboardCheck} className="sidenav-icon"/>ตรวจสอบสถานะ</Link>
                        {/* <Link to="/req" className="sidenav-link"><FontAwesomeIcon icon={faEnvelopeOpen} className="sidenav-icon"/>คำร้องฝึกงาน</Link> */}
                        
                    </div> 
                )
            }

        </div>
)
}


    </div>
        
    );
}
export default withRouter(NavbarComponent);