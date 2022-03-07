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
        <h1>Hospital</h1>
        <div className="tap-top-select">
          <div className="tap-top-select-in">
            <div className="tap-select">
              <select class="mdb-select " searchable="Search here.." onChange={(event)=>{                      
                console.log(event.target.value) ;
                fetchDistrict(event.target.value);
                setSearchHospital(event.target.value)  
                }}>
                  <option selected disabled>เลือกจังหวัด</option>
                {provinces.map((provinces) => (
                  <option value={provinces.province}>{provinces.province}</option>
                ))}
              </select>
            </div>
            <div className="tap-select">
              <select class="mdb-select" searchable="Search here.." onChange={(event)=>{
                setSearchHospital(event.target.value)
              }}>
                <option selected disabled>เลือกอำเภอ</option>
                {district.map((district) => (
                  <option value={district.district}>{district.district}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="search">
            <input 
            type="search" 
            placeholder="ค้นหา..." 
            onChange={(event)=>{
              setSearchHospital(event.target.value);
            }}/>
        </div>
        </div>

        <table class="table" style={{ backgroundColor: "#FFFFFF" }}>
          <thead className="table-thead">
            <tr>
              <th scope="col">โรงพยาบาล</th>
              <th scope="col">อำเภอ</th>
              <th scope="col">จังหวัด</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {hospital.filter((hospital)=>{
              if(searchHospital==''){
                return hospital
              }
              else if(hospital.hospitalName.toString().includes(searchHospital)
              ||hospital.district.toString().includes(searchHospital)
              ||hospital.province.toString().includes(searchHospital)){
                return hospital
              }
            }).map((hospital) => (
              <tr>
                <td scope="row">{hospital.hospitalName}</td>
                <td>{hospital.district}</td>
                <td>{hospital.province}</td>
                <td>
                  <Link
                    to={`/edithospital/${hospital._id}`}
                    type="button"
                    class="btn btn-primary"
                  >
                    <FontAwesomeIcon icon={faAdd} />
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => confrimDelete(hospital._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/addhospital" type="button" className="button-addnew">
          <FontAwesomeIcon icon={faAdd} />
          Add New
        </Link>
      </div>
    </div>
  );
};
export default HospitalComponent;
