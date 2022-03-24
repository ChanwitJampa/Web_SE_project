import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import NavbarComponent from "./NavbarComponent";
import "./CheckStatusForSuperComponent.css";
import { faBarChart, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider, Button } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined } from "@ant-design/icons";

const CheckStatusForSuperComponent = () => {
  const [searchAnnounce, setSearchAnnounce] = useState("");
  const [requests, setRequest] = useState([]);
  const [users, setUser] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = requests.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
        console.log(filteredData);
    }
    else{
        setFilteredResults(requests)
    }
}

 
  const setfirstNameAndLastName = async (props) =>{
    var x = []
    for(var i=0;i<props.length ; i++){
      var res = await axios.get(`http://localhost:5000/api/users/${props[i].studentID}`)
        x = [...x,{...props[i],firstName: `${res.data[0].firstName}`+ " "+ `${res.data[0].lastName}`}]
    }
    setRequest(x)
  }

    const fetchData = () => {
     axios
      .get(`http://localhost:5000/api/requests`)
      .then((res) => {
        
        setfirstNameAndLastName(res.data);
        //setRequest(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`http://localhost:5000/api/users`)
      .then((res) => {
      
        setUser(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

     

  };

  useEffect(() => {
    fetchData();

    
    

    // console.log(requests);
  }, []);


  let Button
  if (1) {
    // Button = <Link to="/appstatussuper"><button class="btn btn-danger">เปลี่ยนสถานะ</button></Link>;
    Button = <Link to={`/appstatussuper/${requests._id}`}><button class="btn btn-danger">เปลี่ยนสถานะ</button></Link>;
  }else{
    Button = <button class="btn btn-primary">พิจารณา</button>;
  }
 
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1
        style={{
          marginTop: "5rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: "#FF6464",
          fontSize:"4rem"
        }}
        
        >คำร้อง</h1>

        <div className="">

        <input
              class="form-control me-2"
              type="search"
              placeholder="Search.."
              aria-label="Search"
              style={{
                // marginTop: "7rem",
                marginBottom: "2rem",
                marginLeft: "50rem",
                height:"3rem",
                width:"30rem",
                
              }}

              onChange={(e) => searchItems(e.target.value)}
            ></input>



          {searchInput.length > 1 ? (
            <table class="table table-hover">
            <thead>
            <tr className="organ-head">
                <th scope="col">เลขรหัสนิสิต</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">ชื่อบริษัท</th>
                <th scope="col">ชื่อตำแหน่ง</th>
                <th scope="col">ฝึกงานหรือสหกิจ</th>
                <th scope="col">วันที่ยื่นคำร้อง</th>
                <th scope="col">สถานะ</th>
                <th scope="col"><div className="">
                      <FontAwesomeIcon icon={faBars} />
                    </div></th>
              </tr>
              {filteredResults
                .filter((request) => request.studentID.includes(""))
                .map((filteredRequest) => {
                  return (
                    <tr className="organ-in">
                      <td>{filteredRequest.studentID}</td>
                      <td>{filteredRequest.firstName}</td>
                      <td>{filteredRequest.companyName}</td>
                      <td>{filteredRequest.jobTitle}</td>
                      <td>{filteredRequest.typeRequest}</td>
                      <td>{filteredRequest.createtime}</td>
                      <td>{filteredRequest.status}</td>
                      {/* <td>{Button}</td> */}
                      <td>
                        {<Link to={`/appstatussuper/${filteredRequest._id}`}>
                          <button class="btn btn-danger">เปลี่ยนสถานะ</button>
                        </Link>}
                      </td>
                      {/* <td>{<Link to={`/appstatussuper`}><button class="btn btn-danger">เปลี่ยนสถานะ</button></Link>}</td> */}
                    </tr>
                  );
                })}
            </thead>
          </table>

          ) : ( <table class="table table-hover">
            <thead>
            <tr className="organ-head">
                <th scope="col">เลขรหัสนิสิต</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">ชื่อบริษัท</th>
                <th scope="col">ชื่อตำแหน่ง</th>
                <th scope="col">ฝึกงานหรือสหกิจ</th>
                <th scope="col">วันที่ยื่นคำร้อง</th>
                <th scope="col">สถานะ</th>
                <th scope="col"><div className="">
                      <FontAwesomeIcon icon={faBars} />
                    </div></th>
              </tr>
              {requests
                .filter((request) => request.studentID.includes(""))
                .map((filteredRequest) => {
                  return (
                    <tr className="organ-in">
                      <td>{filteredRequest.studentID}</td>
                      <td>{filteredRequest.firstName}</td>
                      <td>{filteredRequest.companyName}</td>
                      <td>{filteredRequest.jobTitle}</td>
                      <td>{filteredRequest.typeRequest}</td>
                      <td>{filteredRequest.createtime}</td>
                      <td>{filteredRequest.status}</td>
                      {/* <td>{Button}</td> */}
                      <td>
                        {<Link to={`/appstatussuper/${filteredRequest._id}`}>
                          <button class="btn btn-danger">เปลี่ยนสถานะ</button>
                        </Link>}
                      </td>
                      {/* <td>{<Link to={`/appstatussuper`}><button class="btn btn-danger">เปลี่ยนสถานะ</button></Link>}</td> */}
                    </tr>
                  );
                })}
            </thead>
          </table>)}




        </div>
      </div>
    </div>


  );
 
};

export default CheckStatusForSuperComponent;

{
  /* <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => 'สถานะของท่าน'}
                    footer={() => 'คุณชายเจ้าละเอียด ละเมียดละไม 6220504640'}
                    style={{backgroundColor:"#ffffff",marginTop:"3rem"}}
                /> */
}
