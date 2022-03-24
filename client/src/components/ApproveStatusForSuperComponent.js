import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "./ApproveStatusForSuperComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const ApproveStatusForSuperComponent = (props) => {
  const [searchAnnounce, setSearchAnnounce] = useState("");
  const [requests, setRequest] = useState([]);
  const [detail, setDetail] = useState([""]);

  const [num, setNum] = useState(0);

  useEffect(() => {
    // axios.get(`http://localhost:5000/api/requests/${props.match.params._id}`)
    axios
      .get(`http://localhost:5000/api/requests`)
      .then((response) => {
        setRequest(response.data);
        // setNum(response.data._id);
        console.log("response.data");
        console.log(response.data);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line

    axios
      .get(`http://localhost:5000/api/requests/${props.match.params._id}`)
      // axios.get(`http://localhost:5000/api/requests/623c88e00914cfc5184cd739`)
      // axios.get(`http://localhost:5000/api/requests/623c88f10914cfc5184cd73e`)
      .then((response) => {
        // setRequest(response);
        setNum(response.data.studentID);
        console.log("response.data.studentID");
        console.log(response.data.studentID);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line

    console.log("num");
    console.log(num);
  }, []);

  // const fetchData = (props) => {
  //   axios
  //     .get(`http://localhost:5000/api/requests/${props.match.params._id}`)
  //     .then((res) => {
  //       setRequest(res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const approved = (_id) => {
    console.log("-----------test-------------");
    axios
      .put(`http://localhost:5000/api/requests/${_id}`, { status: "อนุมัติ", detail: detail })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        Swal.fire(
          "แก้ไขสถานะเป็น อนุมัติ สำเร็จ",
          "กดตกลงเพื่อไปยังหน้ารวมข้อมูล"
        ).then(() => {
          window.location.href = "/checkstatusforsuper";
        });
      })
      .catch((err) => alert(err));
  };

  const disApproved = (_id) => {
    console.log("-----------test-------------");
    axios
      .put(`http://localhost:5000/api/requests/${_id}`, {
        status: "ไม่อนุมัติ", detail: detail
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        Swal.fire(
          "แก้ไขสถานะเป็น ไม่อนุมัติ สำเร็จ",
          "กดตกลงเพื่อไปยังหน้ารวมข้อมูล"
        ).then(() => {
          window.location.href = "/checkstatusforsuper";
        });
      })
      .catch((err) => alert(err));
  };

  const inputDetail = (event) => {
    console.log(event.target.value);
    setDetail(event.target.value);
  };

  // useEffect(() => {
  //   fetchData();
  //   console.log("GOOO");
  //   console.log(requests);
  // }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        {requests
          .filter((request) => request.studentID.includes(num))
          .map((filteredResults) => {
            return (
              <div>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginTop: "5rem",
                    marginLeft: "2rem",
                    marginBottom: "5rem",
                  }}
                >
                  ทำการอนุมัติคำร้องของนิสิตนักศึกษา
                </h1>
                <div className="contentBoxS">
                  <div className="leftBoxCApp">
                    <h1 className="btextStatus">สถานะของคำร้อง</h1>

                    <br />
                    <h1 className="btextStatus2">เลขนิสิต</h1>
                    <h1 className="btextStatus2">ชื่อสถานประกอบการ</h1>
                    <h1 className="btextStatus2">ประเภทที่ยื่นคำร้อง</h1>
                    <h1 className="btextStatus2">ระยะเวลา</h1>
                    <h1 className="btextStatus2">ตำแหน่ง </h1>
                    <h1 className="btextStatus2">ค่าตอบเเทน / วัน </h1>
                    <h1 className="btextStatus2">มีที่พักหรือไม่ </h1>
                    <h1 className="btextStatus2">ชื่อของผู้ที่ยื่นคำร้องถึง </h1>
                    <h1 className="btextStatus2">ตำแหน่งของผู้ที่ยื่นคำร้องถึง </h1>
                    <h1 className="btextStatus2">ที่อยู่ของสถานที่ฝึกงาน </h1>
                    <h1 className="btextStatus2">ชื่อผู้ประสานงานของทางบริษัท </h1>
                    <h1 className="btextStatus2">เบอร์โทรผู้ประสานงานของทางบริษัท </h1>
                    <h1 className="btextStatus2">อีเมล์ผู้ประสานงานของทางบริษัท </h1>
                    {/* <h1 className="btextStatus2">assistanceRole </h1> */}
                  </div>

                  <Divider
                    type="vertical"
                    className="divider1"
                    style={{ height: "100%", marginLeft: "2rem" }}
                  />

                  <div className="rightBoxCAPP">
                    <div></div>
                    <h1 className="textStatus">{filteredResults.status}</h1>

                    <br />
                    <h1 className="textStatus2">{filteredResults.studentID}</h1>
                    <h1 className="textStatus2">
                      {filteredResults.companyName}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.typeRequest}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.dateStart} ถึง {filteredResults.dateEnd}
                    </h1>
                    <h1 className="textStatus2">{filteredResults.jobTitle}</h1>
                    <h1 className="textStatus2">{filteredResults.budget}</h1>
                    <h1 className="textStatus2">
                      {filteredResults.accommodation}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.assistanceName}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.assistanceRole}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.address}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.HRName}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.HRPhoneNumber}
                    </h1>
                    <h1 className="textStatus2">
                      {filteredResults.HREmail}
                    </h1>
                    {/* <h1 className="textStatus2">
                      {filteredResults.assistanceRole}
                    </h1> */}
                    
                  </div>
                  {/* onSubmit={submitForm} */}
                  {/* <div className="buttonBoxApp">
                    <button
                      onClick={() => approved(filteredResults._id)}
                      // type="submit"
                      className="btn btn-success"
                      style={{ marginRight: "2rem" }}
                    >
                      <CheckOutlined
                        style={{ fontSize: "1rem", marginRight: "1rem" }}
                      />{" "}
                      อนุมัติ
                    </button>

                    <button
                      onClick={() => disApproved(filteredResults._id)}
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{
                        marginRight: "2rem",
                        backgroundColor: "#B33030",
                        borderColor: "#B33030",
                        color: "#EEEEEE",
                      }}
                    >
                      <CheckOutlined
                        style={{ fontSize: "1rem", marginRight: "1rem" }}
                      />{" "}
                      ไม่อนุมัติ
                    </button>
                  </div> */}
                </div>
                <div style={{ height: "100%", width: "100%" }}>
                  <div
                    class="form-control"
                    style={{
                      padding: "15px",
                      borderRadius: "10px",
                      borderColor: "black",
                    }}
                  >
                    <from>
                      <span style={{ fontSize: "1rem", marginRight: "10px" }}>
                          เหตุผล
                      </span>
                      <input
                        type={"text"}
                        style={{ width: "30%",height:"4rem" }}
                        placeholder="กรุณาใส่เหตุผล"
                        // value={detail}
                        onChange={inputDetail}
                      />

                      {/* <div style={{textAlign: "right", display: "flex"}}> */}
                      <button
                        onClick={() => approved(filteredResults._id)}
                        // type="submit"
                        className="btn btn-success"
                        style={{ marginRight: "2rem" }}
                      >
                        <CheckOutlined
                          style={{ fontSize: "1rem", marginRight: "1rem" }}
                        />{" "}
                        อนุมัติ
                      </button>

                      <button
                        onClick={() => disApproved(filteredResults._id)}
                        type="submit"
                        className="btn btn-outline-primary"
                        style={{
                          marginRight: "2rem",
                          backgroundColor: "#B33030",
                          borderColor: "#B33030",
                          color: "#EEEEEE",
                        }}
                      >
                        <CheckOutlined
                          style={{ fontSize: "1rem", marginRight: "1rem" }}
                        />{" "}
                        ไม่อนุมัติ
                      </button>
                    </from>
                    {/* </div> */}
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
