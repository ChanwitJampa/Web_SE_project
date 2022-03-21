import {Link,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBullhorn, faHome, faHospital, faMap, faPlus, faRegistered, faSyringe, faList, faUser, faPowerOff, faNewspaper, faIndustry, faBuilding, faClipboardCheck, faFileContract, faChartLine, faBuildingColumns, faCircleCheck, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
//import { getUser,logout } from "../servies/authorize";
import './NavbarComponent.css';
const NavbarComponent=(props)=>{
    return(
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <h1 className="navbar-logolink">
                        ระบบจัดการการฝึกงาน มหาวิทยาลัยเกษตรศาสตร์
                    </h1>
                </div>
                <ul>
                    <li>
                        <h3 className="userName">คุณชายเจ้าละเอียด ละเมียดละไม 6220504640</h3> 

                    </li>
                <li>
                    <Link to="/login" className="navbar-link"><FontAwesomeIcon icon={faPowerOff} className="navbar-icon"/><span></span></Link>
                </li>
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
    <div class="sidenav">
        {/* <div className="roleBar">
            <FontAwesomeIcon icon={faUser} className="listIcon"/>
            <h2 className="roleText">ROLE : NISIT </h2>
        </div> */}

        {/* <div className="space1"></div> */}
        <div to="" className="sidenav-link2"><FontAwesomeIcon icon={faUser} className="sidenav-iconRole"/><h1 className="roleText">role : Nisit</h1></div>
        <div to="" className="sidenav-link2"><FontAwesomeIcon icon={faUser} className="sidenav-icon2"/></div>
        <Link to="/addreq" className="sidenav-link2"><FontAwesomeIcon icon={faList} className="sidenav-icon3"/></Link>
        <Link to="/" className="sidenav-link"><FontAwesomeIcon icon={faNewspaper} className="sidenav-icon"/>ข่าวสารประกาศ</Link>
        <Link to="/organization1" className="sidenav-link"><FontAwesomeIcon icon={faBuilding} className="sidenav-icon"/>สถานประกอบการ</Link>
        <Link to="/req" className="sidenav-link"><FontAwesomeIcon icon={faEnvelopeOpen} className="sidenav-icon"/>คำร้องฝึกงาน</Link>
        {/*<Link to="/organization" className="sidenav-link"><FontAwesomeIcon icon={faBuilding} className="sidenav-icon"/>สถานประกอบการ</Link>*/}
        <Link to="/checkstatusfornisit" className="sidenav-link"><FontAwesomeIcon icon={faClipboardCheck} className="sidenav-icon"/>ตรวจสอบสถานะ forNisit</Link>
        <Link to="/checkstatusforsuper" className="sidenav-link"><FontAwesomeIcon icon={faClipboardCheck} className="sidenav-icon"/>ตรวจสอบสถานะ forSuper</Link>
        <Link to="/documents" className="sidenav-link"><FontAwesomeIcon icon={faFileContract} className="sidenav-icon"/>เอกสารที่เกี่ยวข้อง</Link>
        <Link to="/result" className="sidenav-link"><FontAwesomeIcon icon={faChartLine} className="sidenav-icon"/>ผลการฝึกงาน</Link>
    </div>
    </div>
        
    );
}
export default withRouter(NavbarComponent);