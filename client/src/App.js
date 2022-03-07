import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";
import { ComposableMap, Geography, Geographies } from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolatePiYG } from "d3-scale-chromatic";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import MapChart from "./MapChart";

import BarLoader from "react-spinners/BarLoader";

import { Table, Header } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { virus-covid } from "@fortawesome/free-solid-svg-icons";
import {
  faAdd,
  faHospital,
  faSkullCrossbones,
  faTrash,
  faVirusCovid,
} from "@fortawesome/free-solid-svg-icons";

import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ClockCircleOutlined,
} from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { faker } from "@faker-js/faker";
import { Button } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "7วันที่่เเล้ว",
  "6วันที่่เเล้ว",
  "5วันที่่เเล้ว",
  "4วันที่่เเล้ว",
  "3วันที่่เเล้ว",
  "2วันที่่เเล้ว",
  "1วันที่่เเล้ว",
];

const labels2 = [
  "30วันที่่เเล้ว",
  "29วันที่่เเล้ว",
  "28วันที่่เเล้ว",
  "27วันที่่เเล้ว",
  "26วันที่่เเล้ว",
  "25วันที่่เเล้ว",
  "24วันที่่เเล้ว",
  "23วันที่่เเล้ว",
  "22วันที่่เเล้ว",
  "21วันที่่เเล้ว",
  "19วันที่่เเล้ว",
  "18วันที่่เเล้ว",
  "17วันที่่เเล้ว",
  "16วันที่่เเล้ว",
  "15วันที่่เเล้ว",
  "14วันที่่เเล้ว",
  "13วันที่่เเล้ว",
  "12วันที่่เเล้ว",
  "11วันที่่เเล้ว",
  "10วันที่่เเล้ว",
  "9วันที่่เเล้ว",
  "8วันที่่เเล้ว",
  "7วันที่่เเล้ว",
  "6วันที่่เเล้ว",
  "5วันที่่เเล้ว",
  "4วันที่่เเล้ว",
  "3วันที่่เเล้ว",
  "2วันที่่เเล้ว",
  "1วันที่่เเล้ว",
];

const labels3 = [
  "7วันที่่เเล้ว",
  "6วันที่่เเล้ว",
  "5วันที่่เเล้ว",
  "4วันที่่เเล้ว",
  "3วันที่่เเล้ว",
  "2วันที่่เเล้ว",
  "1วันที่่เเล้ว",
];

const data = {
  labels,
  datasets: [
    {
      label: "ผู้ติดเชื้อ ",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "ผู้เสียชีวิต ",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const data2 = {
  labels,
  datasets: [
    {
      label: "ผู้ติดเชื้อ ",
      data: labels2.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "ผู้เสียชีวิต ",
      data: labels2.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const data3 = {
  labels,
  datasets: [
    {
      label: "ผู้ติดเชื้อ ",
      data: labels3.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "ผู้เสียชีวิต ",
      data: labels3.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "ยอดผู้ติดเชื้อเเละเสียชีวิตในประเทศไทย",
    },
  },
};

// function generateGdpPerCapita(geographies) {
//   let minGdpPerCapita = Infinity;
//   let maxGdpPercapita = -Infinity;
//   geographies = geographies.map((geography) => {
//     const { GDP_MD_EST, POP_EST } = geography.properties;
//     const gdpPerCapita = Math.round((GDP_MD_EST * 1e6) / POP_EST);
//     if (gdpPerCapita < minGdpPerCapita) {
//       minGdpPerCapita = gdpPerCapita;
//     }
//     if (gdpPerCapita > maxGdpPercapita) {
//       maxGdpPercapita = gdpPerCapita;
//     }
//     geography.properties.gdpPerCapita = gdpPerCapita;
//     return geography;
//   });
//   return { minGdpPerCapita, maxGdpPercapita, modifiedGeographies: geographies };
// }
// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const covidURL =
  "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces";

function App() {
  const [content, setContent] = useState("");

  const [hospital, setHospital] = useState([]);

  const [history, setHistory] = useState([]);

  const [pName, setpName] = useState("กรุณาเลือกจังหวัด");

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [visible, setVisible] = useState(true);

  const onClick = () => {

    setVisible(true);
    console.log("KGFDKLJGDFJLKGFLKJGLKDJFKLGJ");

  }


  const Expire = (props) => {

    const [firstime, setfirstime] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        setVisible(true);
        setfirstime(1);
      }, props.delay);
    }, [history]);


    if (firstime != 0) {
      return visible ? (
        <div className="space2">
          <div className="chartRow">
            <Line options={options} data={data} />;
          </div>
          <div className="chartRow">
            <Line options={options} data={data2} />;
          </div>
          <div className="chartRow">
            <Line options={options} data={data3} />;
          </div>
        </div>
      ) : (
        <h1>test</h1>
      );
    }
    if (firstime === 0)
    {
      return <div></div>;
    }
  };

  const override = `
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

  const fetchData = () => {
    axios
      .get(
        `https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`
      )
      .then((response) => {
        console.log(response.data);
        // setHospital(response.data);

        setHospital(
          response.data.slice(
            response.data.length - 78,
            response.data.length - 1
          )
        );

        // const filterItem = hospital.filter(filtername => {
        //   if(filtername)
        // });

        // console.log(filterItem);

        // console.log(hospital);
        // hospital.forEach( (e) => {
        //   console.log(e.province);
        // })
      })
      .catch((err) => alert(err));

    const provinceName = "ตาก";

    // axios
    //     .get(
    //       // `http://localhost:5000/api/province`,{provinceName}
    //       // `http://localhost:5000/api/map/${provinceName}`
    //       `http://localhost:5000/api/map/${pName}`
    //     )
    //     .then((response) => {
    //       console.log("TEST API ==== === = = = ")
    //       console.log(response.data);
    //       console.log(response.data[0].new_total_1);

    //       // setHistory(response.data);
    //       setHistory(response.data);

    //       // console.log(history.new_total_1)
    //       // setHospital(response.data);

    //       // setHospital((response.data).slice(response.data.length-78,response.data.length-1));

    //       // const filterItem = hospital.filter(filtername => {
    //       //   if(filtername)
    //       // });

    //       // console.log(filterItem);

    //       // console.log(hospital);
    //       // hospital.forEach( (e) => {
    //       //   console.log(e.province);
    //       // })

    //     })
    //     .catch((err) => alert(err));
  };

  const pullHistory = (pName) => {
    if (pName != "กรุณาเลือกจังหวัด") {
      axios
        .get(
          // `http://localhost:5000/api/map/${provinceName}`
          `http://localhost:5000/api/map/${pName}`
        )
        .then((response) => {
          console.log("TEST API ==== === = = = ");
          console.log(response.data);
          console.log(response.data[0].new_total_1);

          setHistory(response.data);
        });
      // .catch((err) => alert(err));
    }
  };

  //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchData();
    console.log("Hello");
  }, []);

  useEffect(() => {
    // setHospital(hospital.filter(hospital.province == pName))
    pullHistory(pName);
    // console.log(history[0])

    if (pName != "กรุณาเลือกจังหวัด") {
      setHistory([]);
      console.log("HISTORY");
      console.log(history[0]);
      console.log("end");
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [pName]);

  return (
    <div className="container2">
      <NavbarComponent />
      <div className="mapBox">
        {/* <MapChart setTooltipContent={setContent} onChange={ value => setpName(value)} /> */}
        {/* <MapChart setTooltipContent={setContent} changeWord={ word => setpName(word)} /> */}
        <MapChart setTooltipContent={setContent} props={setpName} />
        <ReactTooltip class='mySepecialClass' backgroundColor={"crimson"} fontSize={"2rem"}>{content}</ReactTooltip>
        <div className="informationBox">
          <h1 className="headerInformation">
            ยอดข้อมูลผู้ติดเชื้อโควิดในแต่ละจังหวัด
          </h1>

          {/* <Button color="red" basic icon>
            <Icon name="log out">
              Logout
            </Icon>
          </Button> */}

          <h1 className="provinceName">{pName}</h1>
          {/* <h1 className="provinceName">{hospital.province[0]}</h1> */}

          {/* <h1 className="provinceName">{content}</h1> */}

          {/* <h2 className="infoText">new case: +  </h2>
          <h2 className="infoText">total case: </h2>
          <h2 className="infoText">newcase excludeabroad: </h2>
          <h2 className="infoText">total case excludeabroad: </h2>
          <h2 className="infoText">new death: </h2>
          <h2 className="infoText">total death: </h2>
          <h2 className="infoText">update date: </h2> */}

          <table
            class="table"
            className="tableprovince"
            style={{
              backgroundColor: "#FFFFFF",
              paddingRight: "50rem",
              paddingLeft: "50rem",
            }}
          >
            <thead className="table-thead">
              <tr>
                <th scope="col">ชื่อจังหวัด</th>
                <th scope="col">วันที่ลงประกาศ</th>
                <th scope="col">เคสใหม่</th>
                <th scope="col">เคสทั้งหมด</th>
                <th scope="col">ผู้ป่วยจากต่างประเทศ</th>
                <th scope="col">ยอดตายล่าสุด</th>
                <th scope="col">ยอดตายสะสม</th>
                <th scope="col">วันที่อัพเดต</th>
                <th scope="col">ปุ่ม</th>
              </tr>
            </thead>
            <tbody className="table-tbody">
              {hospital
                .filter((province) => province.province === pName)
                .map((hospital) => (
                  // {hospital.filter(hospital.province === "จันทบุรี").map((hospital) => (

                  <tr>
                    <td>{hospital.province}</td>
                    <td>{hospital.txn_date}</td>
                    <td>{hospital.new_case}</td>
                    <td>{hospital.total_case}</td>

                    <td>
                      {hospital.new_case - hospital.new_case_excludeabroad}{" "}
                    </td>

                    <td>{hospital.new_death}</td>
                    <td>{hospital.total_death}</td>
                    <td>{hospital.update_date}</td>
                    <td>
                      <Link
                        to={`/hospital`}
                        type="button"
                        class="btn btn-primary"
                        // style={{marginTop:"2rem"}}
                      >
                        <FontAwesomeIcon icon={faHospital} />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="space3">
            <ClockCircleOutlined
              style={{
                fontSize: "3rem",
                color: "#FFF",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            />
            <h1 className="historyHeader">ยอดย้อนหลัง</h1>
            {/* <h1 style={{fontSize:"1rem",color:"#FFF",marginBottom:"2rem"}}>ประวัติย้อนหลัง</h1> */}

            <BarLoader
              className="loadingbar"
              color={color}
              loading={loading}
              css={override}
              size={150}
            />
          </div>

          {/* <div className="space1"></div> */}

          {history.map((history) => (
            <div className="history">
              <div className="box1">
                <h1 className="historyHeader">ยอดวันนี้</h1>
                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faVirusCovid}
                    style={{ marginRight: "1rem", color: "#74de49" }}
                  />
                  ติดเชื้อ = {history.new_total_1}
                </h1>
                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    style={{ marginRight: "1rem" }}
                  />
                  เสียชีวิต = {history.death_total_1}
                </h1>
                {/* <Link
                        to={`/`}
                        type="button"
                        class="btn btn-primary"
                        onClick={onClick}
                        // style={{marginTop:"2rem"}}
                      >
                        <FontAwesomeIcon icon={faHospital} />
                      </Link> */}
              </div>

              <div className="box2">
                <h1 className="historyHeader">ยอดย้อนหลัง 7 วัน</h1>

                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faVirusCovid}
                    style={{ marginRight: "1rem", color: "#74de49" }}
                  />
                  ติดเชื้อ = {history.new_total_7}
                </h1>
                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    style={{ marginRight: "1rem" }}
                  />
                  เสียชีวิต = {history.death_total_7}
                </h1>
              </div>

              <div className="box3">
                <h1 className="historyHeader">ยอดย้อนหลัง 30 วัน</h1>

                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faVirusCovid}
                    style={{ marginRight: "1rem", color: "#74de49" }}
                  />
                  ติดเชื้อ = {history.new_total_30}
                </h1>
                <h1 className="textHistory">
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    style={{ marginRight: "1rem" }}
                  />
                  เสียชีวิต = {history.death_total_30}
                </h1>
              </div>

              <div></div>
            </div>
          ))}

          <div className="chartBox">
            <Expire delay="2000">Hooks are awesome!</Expire>
          </div>

          {/* <div className="newTable">
            {history.map((history) => (
              <Table basic="very" celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>หัวข้อ</Table.HeaderCell>
                    <Table.HeaderCell>จำนวน</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Lena
                          <Header.Subheader>Human Resources</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{history.new_total_1}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Matthew
                          <Header.Subheader>Fabric Design</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>15</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Lindsay
                          <Header.Subheader>Entertainment</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>12</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Mark
                          <Header.Subheader>Executive</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>11</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ))}


          </div> */}
        </div>
      </div>

      {/* <div className="informationBox">
        <h1>HELLO</h1>
      </div> */}

      {/* <div className="container">
        <ComposableMap projectionConfig={{ scale: 200 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              const { minGdpPerCapita, maxGdpPercapita, modifiedGeographies } =
                generateGdpPerCapita(geographies);

              const chromaticScale = scaleSequential()
                .domain([minGdpPerCapita, maxGdpPercapita])
                .interpolator(interpolatePiYG);

              return modifiedGeographies.map((geography) => {
                const { gdpPerCapita, rsmKey } = geography.properties;
                return (
                  <Geography
                    key={rsmKey}
                    geography={geography}
                    stroke="grey"
                    strokeWidth={0.5}
                    fill={chromaticScale(gdpPerCapita)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div> */}
      {/* <h1>ยินดีต้อนรับ</h1> */}
    </div>
  );
}

export default App;
