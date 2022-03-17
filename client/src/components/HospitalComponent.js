import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import "./HospitalComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

import { Link, withRouter } from "react-router-dom";
const HospitalComponent = () => {
  const [hospital, setHospital] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [subDistrict,setSubDistrict] = useState([]);
  const [searchHospital,setSearchHospital] =useState('');
  const [district, setDistrict] = useState([]);
  const fetchData = () => {
    axios
      .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces`)
      .then((res) => {
        console.log(res.data.data);
        setProvinces(res.data.data);
      });
    
    axios
      .get(`http://localhost:5000/api/hospitals`)
      .then((response) => {
        //console.log(response.data)
        setHospital(response.data);

      })
      .catch((err) => alert(err));
  };
  const fetchDistrict=(pro)=>{
    axios
      .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}`)
      .then((res)=>{
        console.log(res.data.data);
        setDistrict(res.data.data);
      })
  }
  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
    fetchDistrict("กระบี่");
  }, []);
  //ลบโรงพยาบาล
  const confrimDelete = (id) => {
    //axios.delete(`${process.env.REACT_APP_API}/blog`)
    Swal.fire({
      title: "คุณต้องการลบโรงพยาบาลหรือไม่?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHospital(id);
      }
    });
  };
  const deleteHospital = (id) => {
    axios
      .delete(`http://localhost:5000/api/hospitals/${id}`)
      .then((response) => {
        Swal.fire("Deleted", response.data.message, "success");
        fetchData();
      })
      .catch((err) => alert(err));
  };
  return ( 
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>กรอกข้อมูลสถานประกอบการ</h1>
        <div className="content-box">
        <form>
          <div class="form-group">
            <label>ชื่อสถานประกอบการ/หน่วยงาน</label>
              <input class="form-control" id="disabledInput" type="text" onChange={""} />
            <label>ประเภทธุรกิจ</label>
              <input class="form-control" id="disabledInput" type="text" onChange={""} />
            <label>ที่อยู่สถานประกอบการ</label>
              <input class="form-control" id="disabledInput" type="text" onChange={""} />
            <label>เบอร์โทรศัพท์ของสถานประกอบการ/หน่วยงาน</label>
              <input class="form-control" id="disabledInput" type="text" onChange={""} />
            <label>เบอร์โทรสาร</label>
              <input class="form-control" id="disabledInput" type="text" onChange={""} />
          <button type="submit" className="btn btn-color">ยืนยัน</button> 
          </div>
         </form> 
        </div>
      </div>
    </div>
  );
};
export default HospitalComponent;
