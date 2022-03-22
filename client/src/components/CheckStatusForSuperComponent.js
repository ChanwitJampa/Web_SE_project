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

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/requests`)
      .then((res) => {
        setRequest(res.data);
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
    Button = <Link to="/appstatussuper"><button class="btn btn-danger">เปลี่ยนสถานะ</button></Link>;
  }else{
    Button = <button class="btn btn-primary">พิจารณา</button>;
  }

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>คำร้อง</h1>
        <div className="">
          <table class="table table-hover">
            <thead>
            <tr className="organ-head">
                <th scope="col">คำร้องที่ยื่นมา</th>
                <th scope="col">ฝึกงานหรือสหกิจ</th>
                <th scope="col">สถานะ</th>
                <th scope="col">วันที่</th>
                <th scope="col"><div className="">
                      <FontAwesomeIcon icon={faBars} />
                    </div></th>
              </tr>
              {requests
                .filter((request) => request.studentID.includes(""))
                .map((filteredRequest) => {
                  return (
                    <tr className="organ-in">
                      <td>{filteredRequest.companyName}</td>
                      <td>{filteredRequest.jobTitle}</td>
                      <td>{filteredRequest.typeRequest}</td>
                      <td>{filteredRequest.createtime}</td>
                      <td>{Button}</td>
                    </tr>
                  );
                })}
            </thead>
          </table>
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
