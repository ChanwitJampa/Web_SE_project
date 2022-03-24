import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./ResultComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
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
        <h1
        style={{
          marginBottom: "2rem",
          fontWeight: "bold",
          color: "#FF6464",
        }}
        >ผลการฝึกงาน</h1>
        <div class="headd">
          <span>ข้อมูลนิสิต</span>
        </div>

        <div className="headerInfo">
          <div>
            <img
              className="catImg"
              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
            ></img>
          </div>
          <div className="nisit">
            <span>
              6220504623
              <br />
              นาย จิตติพล คำอุไร
              <br />
              คณะ วิศวกรรมศาสตร์ สาขา วิศวกรรมคอมพิวเตอร์ E29
            </span>
          </div>

          <div className="pak">
            <span>ภาคปกติ</span>
          </div>

        </div>

        
        <div class="header-table">
          <span>ผลการฝึกงาน/สหกิจ</span>
        </div>

        <div className="result">
          
          <div className="result-table">

          <table class="table">
            <thead>
              <tr>
                <th scope="col">บริษัท</th>
                <th scope="col">ตำแหน่ง</th>
                <th scope="col">ฝึกงานหรือสหกิจ</th>
                <th scope="col">ผลการฝึก</th>
                <th scope="col">ช่วงเวลา</th>
                <th scope="col">อัพโหลดรายงาน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bluebik</th>
                <td>Frontend Developer</td>
                <td>ฝึกงาน</td>
                <td>ผ่าน</td>
                <td>18/04/65 - 18/06/66</td>
                <td>
                  <div className="faArrowUpFromBracket" style={{cursor:"pointer"}}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

            {/* <table
              class="table table-bordered border-primary"
              className="tableRESULT"
            >
              <thead>
                <tr className="colInfo">
                  <th scope="col">บริษัท</th>
                  <th scope="col">ตำแหน่ง</th>
                  <th scope="col">ฝึกงานหรือสหกิจ</th>
                  <th scope="col">ผลการฝึก</th>
                  <th scope="col">ช่วงเวลา</th>
                  <th scope="col">อัพโหลดรายงาน</th>
                </tr>
                <tr className="colInfo">
                  <td>ไทยใจดี จำกัด</td>
                  <td>โปรเเกรมเมอร์</td>
                  <td>ฝึกงาน</td>
                  <td>ผ่าน</td>
                  <td>04/64 - 06/64</td>
                  <td>
                    <div className="faArrowUpFromBracket">
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </div>
                  </td>
                </tr>
              </thead>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultComponent;
