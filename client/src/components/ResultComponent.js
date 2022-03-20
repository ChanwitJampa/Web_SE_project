import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./ResultComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faAdd,
  faInfo,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const ResultComponent = () => {
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
      .get(
        `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}`
      )
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
  const [province, setProvince] = useState("");
  const { hospitalName, address, latitude, longitude, district } = state;
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
    axios
      .post(`http://localhost:5000/api/hospitals`, {
        hospitalName,
        address,
        latitude,
        longitude,
        province,
        district,
      })
      .then((response) => {
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
      .catch((error) => {
        Swal.fire("Alert", error.response.data.error, "error");
      });
  };
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>ผลการฝึกงาน</h1>
        <span class="header-info">ข้อมูลนิสิต</span>
        <div className="headerInfo">
          <img
            className="catImg"
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
          ></img>
          <div className="info">
            <p className="info">
              6220504623<br></br>
              นาย จิตติพล คำอุไร<br></br>
              คณะ วิศวกรรมศาสตร์ สาขา วิศวกรรมคอมพิวเตอร์ E29
            </p>
          </div>
        </div>
        <span class="header-table">ผลการฝึกงาน/สหกิจ</span>
        <div className="result-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vaccine Name</th>
                <th scope="col">Dose total</th>
                <th scope="col">Condition</th>
                <th scope="col">Walk-in</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ResultComponent;
