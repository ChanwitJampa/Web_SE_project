import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import "./CheckStatusComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table,Divider  } from 'antd';
// import 'antd/dist/antd.css';
import {
    DownloadOutlined 
  } from '@ant-design/icons';

const CheckStatusComponent = () => {
  const [searchAnnounce, setSearchAnnounce] = useState("");
  const [announce, setAnnounce] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/announces`)
      .then((res) => {
        setAnnounce(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces`)
      .then((res) => {
        console.log(res.data.data);
        setProvinces(res.data.data);
      });
  };
  const fetchDistrict = (pro) => {
    axios
      .get(
        `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}`
      )
      .then((res) => {
        console.log(res.data.data);
        setDistrict(res.data.data);
      });
  };
  useEffect(() => {
    fetchData();
    fetchDistrict("กระบี่");
  }, []);

  // const columns = [
  //     {
  //       title: 'หัวข้อ',
  //       dataIndex: 'name',
  //       render: text => <a>{text}</a>,
  //     },
  //     {
  //       title: 'Cash Assets',
  //       className: 'column-money',
  //       dataIndex: 'money',
  //       align: 'right',
  //     },
  //     {
  //       title: 'Address',
  //       dataIndex: 'address',
  //     },
  //   ];

  //   const data = [
  //     {
  //       key: '1',
  //       name: 'สถานะ',
  //       money: '￥300,000.00',
  //       address: 'New York No. 1 Lake Park',
  //     },
  //     {
  //       key: '2',
  //       name: '',
  //       money: '￥1,256,000.00',
  //       address: 'London No. 1 Lake Park',
  //     },
  //     {
  //       key: '3',
  //       name: 'Joe Black',
  //       money: '￥120,000.00',
  //       address: 'Sidney No. 1 Lake Park',
  //     },
  //   ];

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1 style={{ fontWeight: "bold",marginTop:"4rem",marginLeft:"2rem" }}>ตรวจสอบสถานะ</h1>
        <div className="contentBox">

            <div className="leftBoxC">
                <h1 className="btextStatus">สถานะ  </h1>

                <h1 className="btextStatus2">รายละเอียด</h1>
                <h1 className="btextStatus2">บริษัท</h1>
                <h1 className="btextStatus2">ประเภท </h1>
                <h1 className="btextStatus2">ระยะเวลา </h1>
                <h1 className="btextStatus2">ตำแหน่ง </h1>

            </div>
            
            <Divider type="vertical" className="divider1"  style={{height:"100%",marginLeft:"2rem"}}/>


            <div className="rightBoxC">
                <h1 className="textStatus">อณุมัติเเล้ว</h1>

                <h1 className="textStatus2">รายละเอียด</h1>
                <h1 className="textStatus2">กรุงไทย</h1>
                <h1 className="textStatus2">ฝึกงาน</h1>
                <h1 className="textStatus2">14 เมษายน 2565 - 30 มิถุนายน 2565</h1>
                <h1 className="textStatus2">FULLSTACK DEVELOPER</h1>

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
            <DownloadOutlined style={{fontSize:"1rem",marginRight:"1rem"}}/> หนังสือขอความอนุเคราะห์
          </button>
          <button type="submit" className="btn btn-outline-primary">
          <DownloadOutlined style={{fontSize:"1rem",marginRight:"1rem"}}/> หนังสือส่งตัว
          </button>
        </div>

        {/* <button type="submit" className="btn btn-color">Download หนังสือขอความอนุเคราะห์</button> 
            <button2 type="submit" className="btn btn-color">Download หนังสือส่งตัว</button2>  */}
      </div>
    </div>
  );
};
export default CheckStatusComponent;


{/* <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => 'สถานะของท่าน'}
                    footer={() => 'คุณชายเจ้าละเอียด ละเมียดละไม 6220504640'}
                    style={{backgroundColor:"#ffffff",marginTop:"3rem"}}
                /> */}