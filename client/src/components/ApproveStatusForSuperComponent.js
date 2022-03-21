import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "./ApproveStatusForSuperComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined,CheckOutlined } from "@ant-design/icons";

const ApproveStatusForSuperComponent = () => {
  
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
                    fontSize:"2rem",
                  fontWeight: "bold",
                  marginTop: "7rem",
                  marginLeft: "2rem",
                  marginBottom: "5rem",
                }}
              >
                ทำการอนุมัติคำร้องของนิสิตนักศึกษา
              </h1>
              <div className="contentBox">

                <div className="leftBoxCApp">
                  <h1 className="btextStatus">สถานะของคำร้อง</h1>

                  <br />
                  <h1 className="btextStatus2">ชื่อสถานประกอบการ</h1>
                  <h1 className="btextStatus2">ประเภทที่ยื่นคำร้อง</h1>
                  <h1 className="btextStatus2">ระยะเวลา</h1>
                  <h1 className="btextStatus2">ตำแหน่ง </h1>
                  <h1 className="btextStatus2">ค่าตอบเเทน / วัน </h1>
                  <h1 className="btextStatus2">มีที่พักหรือไม่ </h1>
                </div>

                <Divider
                  type="vertical"
                  className="divider1"
                  style={{ height: "100%", marginLeft: "2rem" }}
                />

                <div className="rightBoxCAPP">
                    <div>

                        
                    </div>
                  <h1 className="textStatus">{filteredRequest.status}</h1>

                  <br />
                  <h1 className="textStatus2">{filteredRequest.companyName}</h1>
                  <h1 className="textStatus2">{filteredRequest.typeRequest}</h1>
                  <h1 className="textStatus2">
                    {filteredRequest.dateStart} - {filteredRequest.dateEnd}
                  </h1>
                  <h1 className="textStatus2">{filteredRequest.jobTitle}</h1>
                  <h1 className="textStatus2">{filteredRequest.budget}</h1>
                  <h1 className="textStatus2">{filteredRequest.accommodation}</h1>
                </div>

                <div className="buttonBoxApp">
                    <button
                    type="submit"
                    className="btn btn-success"
                    style={{ marginRight: "2rem"}}
                    >
                    <CheckOutlined
                        style={{ fontSize: "1rem", marginRight: "1rem"}}
                    />{" "}
                    อณุมัติ
                    </button>
                    <button type="submit" className="btn btn-outline-primary"
                    style={{ marginRight: "2rem" , backgroundColor:"#B33030", borderColor:"#B33030", color:"#EEEEEE" }}>
                    <CheckOutlined
                        style={{ fontSize: "1rem", marginRight: "1rem" }}
                    />{" "}
                    ไม่อณุมัติ
                    </button>
                </div>
                
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
export default ApproveStatusForSuperComponent;

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
