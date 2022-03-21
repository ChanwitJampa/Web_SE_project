import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import "./CheckStatusComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined } from "@ant-design/icons";

const CheckStatusComponent = () => {
  
  const [searchAnnounce, setSearchAnnounce] = useState("");
  const [requests, setRequest] = useState([]);

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
  };

  useEffect(() => {
    fetchData();
    console.log(requests);
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        {requests.filter(request => request.studentID.includes('6220504888')).map((filteredRequest) => {
          return (
            <div>
              <h1
                style={{
                  fontWeight: "bold",
                  marginTop: "4rem",
                  marginLeft: "2rem",
                }}
              >
                ตรวจสอบสถานะ
              </h1>
              <div className="contentBox">
                <div className="leftBoxC">
                  <h1 className="btextStatus">สถานะ </h1>

                  <h1 className="btextStatus2">รายละเอียด</h1>
                  <h1 className="btextStatus2">บริษัท</h1>
                  <h1 className="btextStatus2">ประเภท </h1>
                  <h1 className="btextStatus2">ระยะเวลา </h1>
                  <h1 className="btextStatus2">ตำแหน่ง </h1>
                </div>

                <Divider
                  type="vertical"
                  className="divider1"
                  style={{ height: "100%", marginLeft: "2rem" }}
                />

                <div className="rightBoxC">
                  <h1 className="textStatus">{filteredRequest.status}</h1>

                  <br />
                  <h1 className="textStatus2">{filteredRequest.companyName}</h1>
                  <h1 className="textStatus2">{filteredRequest.typeRequest}</h1>
                  <h1 className="textStatus2">
                    {filteredRequest.dateStart} - {filteredRequest.dateEnd}
                  </h1>
                  <h1 className="textStatus2">{filteredRequest.jobTitle}</h1>
                </div>

                {/* <h1 className="textStatus">สถานะ  : อณุมัติเเล้ว</h1>

            <h1 className="textStatus2">รายละเอียด</h1>
            <h1 className="textStatus2">บริษัท : กรุงไทย  ประเภท : ฝึกงาน</h1>
            <h1 className="textStatus2">ระยะเวลา :  14 เมษายน 2565 - 30 มิถุนายน 2565</h1>
            <h1 className="textStatus2">ตำแหน่ง : FULLSTACK DEVELOPER</h1> */}
              </div>

              <div className="buttonBox">
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ marginRight: "2rem" }}
                >
                  <DownloadOutlined
                    style={{ fontSize: "1rem", marginRight: "1rem" }}
                  />{" "}
                  หนังสือขอความอนุเคราะห์
                </button>
                <button type="submit" className="btn btn-outline-primary">
                  <DownloadOutlined
                    style={{ fontSize: "1rem", marginRight: "1rem" }}
                  />{" "}
                  หนังสือส่งตัว
                </button>
              </div>
            </div>
          );
        })}

        {/* <button type="submit" className="btn btn-color">Download หนังสือขอความอนุเคราะห์</button> 
            <button2 type="submit" className="btn btn-color">Download หนังสือส่งตัว</button2>  */}
      </div>
    </div>
  );
};
export default CheckStatusComponent;

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
