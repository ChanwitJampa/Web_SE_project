import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./DocumentComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const DocumentComponent = () => {
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
        >เอกสารที่เกี่ยวข้อง</h1>
        <div className="text-line">
          <i className="faFileLines">
            <FontAwesomeIcon icon={faFileLines} />
          </i>
          <h4>หนังสือขอความอนุเคราะห์การฝึกงาน</h4>
          <i className="faArrowRightLong">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </i>
          <button type="submit" className="btn btn-success">
            Download
          </button>
        </div>

        <div className="text-line">
          <i className="faFileLines">
            <FontAwesomeIcon icon={faFileLines} />
          </i>
          <h4>หนังสือส่งตัว</h4>
          <i className="faArrowRightLong">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </i>
          <button type="submit" className="btn btn-success">
            Download
          </button>
        </div>
        <p>
          _______________________________________________________________________________________________________
        </p>

        <div>
          <form>
            <div className="borderRadiusTop">
              <span>ชื่อเอกสาร</span>
              <br />
              <input type="text" class="form-control"></input>
            </div>
            <br />
            <div className="borderRadiusBottom">
              <br />
              <div class="drop-zone">
                <span class="drop-zone__prompt">
                  Drop file here or click to upload
                </span>
                <input type="file" name="myFile" class="drop-zone__input" />
              </div>
              <div className="upload-button">
                <button type="submit" class="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
<script src="./src/components/scriptDocumentComponent.js"></script>;

export default DocumentComponent;
