import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import "./CheckStatusForNisitComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";


import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ClockCircleOutlined,
  NotificationOutlined,
  PhoneOutlined,
  MailOutlined,
  DeleteOutlined,
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  FormOutlined,
  CheckOutlined
  
} from "@ant-design/icons";

const CheckStatusForNisitComponent = () => {
  
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

  const deleteItem = (id) => {
    //askbeforeDelete
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่?',
      text: "ข้อมูลที่ลบจะไม่สามารถกู้คืนได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'ลบข้อมูลสำเร็จ',
          'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
          'success'
        )
        //delete
        axios
          .delete(`http://localhost:5000/api/requests/${id}`)
          .then((res) => {
            console.log("DELETE SUCCESS");
            console.log(res);
            fetchData();
            Swal.fire(
              'Alert',
              'บันทึกข้อมูลเรียบร้อย',
              'success'
          ).then(()=>{
              window.location.href = "/"
          })
          })
          .catch((err) => {
            console.log("DELETE NOT SUCCESS");
            console.log(err);
          });
      }
    })
  }

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        
      <h1
                style={{
                  marginTop: "7rem",
                  marginBottom: "2rem",
                  fontWeight: "bold",
                  color: "#FF6464",
                  fontSize:"2.5rem"
                }}
              >
                ตรวจสอบสถานะ
              </h1>

              <Link to="/addreq">
              <button
                to=""
                type="submit"
                className="btn btn-success"
                // onClick={}
                style={{
                  backgroundColor: "#02BC77",
                  width: "4rem",
                  height: "3rem",
                  marginLeft: "76rem",

                }}
              >
                <PlusOutlined
                  style={{
                    // marginLeft: "0rem",
                    // marginRight: "1rem",
                    fontSize: "1.5rem",
                    color: "#FFFFF",
                  }}
                />
                
              </button>

            </Link>
        {requests.filter(request => request.studentID.includes('6220504640')).map((filteredRequest) => {
          return (
            <div>
              

              <div className="contentBox">
                <div className="leftBoxC">
                  <h1 className="btextStatus">สถานะ </h1>

                  {/* <h1 className="btextStatus2" style={{marginTop:"3rem"}}>รายละเอียด</h1> */}
                  <h1 className="btextStatus2" style={{marginTop:"3rem"}}>บริษัท</h1>
                  <h1 className="btextStatus2">ประเภท </h1>
                  <h1 className="btextStatus2">ระยะเวลา </h1>
                  <h1 className="btextStatus2">ตำแหน่ง </h1>
                  <h1 className="btextStatus2">เหตุผล </h1>
                </div>

                <Divider
                  type="vertical"
                  className="divider1"
                  style={{ height: "100%", marginLeft: "2rem" }}
                />

                <div className="rightBoxC">
                  <h1 className="textStatus">{filteredRequest.status}</h1>

                  
                  <h1 className="textStatus2" style={{marginTop:"2.7rem"}}>{filteredRequest.companyName}</h1>
                  <h1 className="textStatus2">{filteredRequest.typeRequest}</h1>
                  <h1 className="textStatus2">
                    {filteredRequest.dateStart} ถึง {filteredRequest.dateEnd}
                  </h1>
                  <h1 className="textStatus2">{filteredRequest.jobTitle}</h1>
                  <h1 className="textStatus2">{filteredRequest.detail}</h1>
                </div>
                <DeleteFilled
                                              onClick={() => {
                                                deleteItem(filteredRequest._id);
                                              }}
                                              style={{
                                                marginLeft: "53rem",
                                                marginTop: "17rem",
                                                color: "#B33030",
                                                fontSize: "1.5rem",
                                              }}
                                            />
                
              </div>

              <div className="buttonBox">
                
                <Link 
                    to="/form_internship2565.pdf"
                    target="_blank"
                    download
                >
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ marginRight: "2rem" }}
                    download
                    >
                    <DownloadOutlined
                      style={{ fontSize: "1rem", marginRight: "1rem" }}
                      />{" "}
                    ใบคำร้อง
                  </button>
                </Link>

                <button type="submit" className="btn btn-success"
                >
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
export default CheckStatusForNisitComponent;

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
