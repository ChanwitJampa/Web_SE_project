import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./AddHospitalComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const AddHospitalComponent = () => {
  const [allprovinces, setAllProvinces] = useState([]);
  const [alldistrict, setAllDistrict] = useState([]);
  const fetchData = () => {
    axios
      .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces`)
      .then((res) => {
        console.log(res.data.data);
        setAllProvinces(res.data.data);
      });
  };
  const fetchDistrict = (pro) => {
    axios
      .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}`)
      .then((res) => {
        console.log(res.data.data);
        setAllDistrict(res.data.data);
      });
  };
  useEffect(() => {
    fetchData();
    fetchDistrict("กระบี่");
  }, []);
  const [state, setState] = useState({
    hospitalName: "",
    address: "",
    latitude: "0",
    longitude: "0",
    district: "",
  });
  const [province,setProvince] =useState('');
  const {
    hospitalName,
    address,
    latitude,
    longitude,
    district,
  } = state;
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    console.table({
      hospitalName,
      address,
      latitude,
      longitude,
      province,
      district,
    });
    axios.post(`http://localhost:5000/api/hospitals`, {
        hospitalName,
        address,
        latitude,
        longitude,
        province,
        district,
      })
      .then(response => {
        Swal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
        setState({
          ...state,
          hospitalName: "",
          address: "",
          latitude: "0",
          longitude: "0",
          district: "",
        });
        setProvince("");
      })
      .catch(error=> {
        Swal.fire(
          "Alert",
          error.response.data.error,
          "error"
        );
      });
  };
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>Add hospital</h1>
        <div className="content-box">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label>ชื่อโรงพยาบาล</label>
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อโรงพยาบาล"
                value={hospitalName}
                onChange={inputValue("hospitalName")}
              />
            </div>
            <div className="form-group">
              <label>ที่อยู่</label>
              <input
                type="text"
                className="form-control"
                placeholder="ที่อยู่"
                value={address}
                onChange={inputValue("address")}
              />
            </div>
            <div className="form-group">
              <label>จังหวัด</label>
              <select
                class="mdb-select "
                searchable="Search here.."
    
                onChange={(event) => {
                  console.log("province = "+event.target.value);
                  setProvince(event.target.value);
                  fetchDistrict(event.target.value);
                }}
              >
                {allprovinces.map((provinces) => (
                  <option value={provinces.province}>{provinces.province}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>อำเภอ</label>
              <select 
                class="mdb-select" 
                searchable="Search here.."
                value={district}
                onChange={inputValue("district")}>
                {alldistrict.map((district) => (
                  <option value={district.district}>{district.district}</option>
                ))}
              </select>
            </div>
            <br />
            <button type="submit" className="button-addnew">
              <FontAwesomeIcon icon={faAdd} />
              Add New
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddHospitalComponent;