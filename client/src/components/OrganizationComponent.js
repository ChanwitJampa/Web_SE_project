import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import "./OrganizationComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

import { Link, withRouter } from "react-router-dom";
const OrganizationComponent = () => {
  const [companies, setcompanies] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [subDistrict,setSubDistrict] = useState([]);
  const [searchHospital,setSearchHospital] =useState('');
  const [district, setDistrict] = useState([]);
  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/companies`)
      .then((response) => {
        console.log(response.data)
        setcompanies(response.data);

      })
      .catch((err) => console.log(err));
  };

  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
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

  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);

    setState({ ...state, [name]: event.target.value });
    

};

  const [state,setState]=useState({
    companyName: "",
            typeRequest: "",
            businessType: "",
            address: "",
            phoneNumber: "",
            tel : "",
  })


  const {companyName,
    typeRequest,
    businessType,
    address,
    phoneNumber,
    tel,}=state


  const signinForm=(event)=>{
    event.preventDefault();
    axios.post(`http://localhost:5000/api/companies`,{
      companyName,
      typeRequest,
      businessType,
      address,
      phoneNumber,
      tel ,}).then(res=>{
        console.log(res.data)
        setState(res.data)
        console.log(state)
        setState({...state,
            companyName: "",
            typeRequest: "",
            businessType: "",
            address: "",
            phoneNumber: "",
            tel : "",
            
            })
            Swal.fire(
                'อัพโหลดข้อมูลสถานประกอบการสำเร็จ',
                'กดตกลงเพื่อไปยังหน้าหลัก',
                
                
            ).then(()=>{
                window.location.href = "/organization1"
            })
    })
    .catch((error)=>{
        console.log(error);
        Swal.fire(
            'อัพโหลดคำร้องไม่สำเร็จ',
           )
    })
}


  return ( 
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>กรอกข้อมูลสถานประกอบการ</h1>
        <div className="c1">

        <form onSubmit={signinForm}>

          <div class="form-group">

            <label>ชื่อสถานประกอบการ/หน่วยงาน</label>
              <input class="form-control" id="disabledInput" type="text" placeholder="ชื่อสถานประกอบการ" onChange={inputValue("companyName")} />
            <label>ประเภทธุรกิจ</label>
              <input class="form-control" id="disabledInput" type="text" placeholder="ประเภทของสภานประกอบการ" onChange={inputValue("businessType")} />
            <label>ที่อยู่สถานประกอบการ</label>
              <input class="form-control" id="disabledInput" type="text" placeholder="ที่อยู่ของสถานประกอบการ" onChange={inputValue("address")} />
            <label>เบอร์โทรศัพท์ของสถานประกอบการ/หน่วยงาน</label>
              <input class="form-control" id="disabledInput" type="text"  placeholder="0xx-xxxxxxx" onChange={inputValue("phoneNumber")} />
            <label>เบอร์โทรสาร</label>
              <input class="form-control" id="disabledInput" type="text" placeholder="xxxx-xxxxxxx" onChange={inputValue("tel")} />

            <button type="submit" className="btn btn-color" style={{marginLeft:"30rem",marginTop:"2rem"}}>ยืนยัน</button> 
          </div>
         </form> 

        </div>
      </div>
    </div>
  );
};


export default OrganizationComponent;
