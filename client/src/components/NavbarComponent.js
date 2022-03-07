import {Link,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBullhorn, faHome, faHospital, faMap, faPlus, faRegistered, faSyringe } from "@fortawesome/free-solid-svg-icons";
//import { getUser,logout } from "../servies/authorize";
import './NavbarComponent.css';
const NavbarComponent=(props)=>{
    return(
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logolink">
                        <FontAwesomeIcon icon={faMap} className="navbar-icon"/>
                        <h2 >CoMap</h2>
                    </Link>
                </div>
                <ul> 
                <li>
                    <Link to="/" className="navbar-link"><FontAwesomeIcon icon={faHome} className="navbar-icon"/><span>Home</span></Link>
                </li>
                <li>
                    <Link to="/announce" className="navbar-link"><FontAwesomeIcon icon={faBullhorn} className="navbar-icon"/>Announce</Link>
                </li>
                <li>
                    <Link to="/login" className="navbar-link"><FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icon"/>Login</Link>
                </li>
                <li>
                    <Link to="/register" className="navbar-link"><FontAwesomeIcon icon={faRegistered} className="navbar-icon"/>Register</Link>
                </li>
                {/* 
                    <li className="nav-item pt-3 pb-3">
                        <button onClick={()=>logout(()=>props.history.push("/"))} className="nav-link">Logout</button>
                    </li>
                */}
                </ul>
            </div>
    <div class="sidenav">
        <Link to="/addannounce" className="sidenav-link"><FontAwesomeIcon icon={faSyringe} className="sidenav-icon"/>เพิ่มประกาศวัคซีน</Link>
        <Link to="/hospital" className="sidenav-link"><FontAwesomeIcon icon={faHospital} className="sidenav-icon"/>จัดการโรงพยาบาล</Link>
        <Link to="/addhospital" className="sidenav-link"><FontAwesomeIcon icon={faPlus} className="sidenav-icon"/>เพิ่มโรงพยาบาล</Link>
    </div>
    </div>
        
    );
}
export default withRouter(NavbarComponent);