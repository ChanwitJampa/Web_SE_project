import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./AddHospitalComponent.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
const EditHospitalComponent=(props)=>{
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/hospitals/${props.match.params._id}`)
        .then(response=>{
            const {_id,hospitalName,address,latitude,longitude,province,district,subDistrict}= response.data
            setState({...state,_id,hospitalName,address,latitude,longitude,province,district,subDistrict})
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    const [allprovinces, setAllProvinces] = useState([]);
    const [state,setState]=useState({
      __id:"",
      hospitalName:"",
      address:"",
      latitude:"0",
      longitude:"0",
      province:"",
      district:"",
      subDistrict:""
    })
    const {_id,hospitalName,address,latitude,longitude,province,district,subDistrict}=state
    const inputValue=name=>event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }
    const submitForm=(event)=>{
      event.preventDefault();
      console.table({_id,hospitalName,address,latitude,longitude,province, district,subDistrict});
      axios.put(`http://localhost:5000/api/hospitals/${_id}`,{_id,hospitalName,address,latitude,longitude,province,district,subDistrict})
      .then(response=>{
        Swal.fire(
            'Alert',
           'บันทึกข้อมูลเรียบร้อย',
           'success'
          )
        const {_id,hospitalName,address,latitude,longitude,province,district,subDistrict}=response.data
        setState({...state,_id,hospitalName,address,latitude,longitude,province,district,subDistrict})
      })
      .catch((error)=>{
        Swal.fire(
            'Alert',
            //err.response.data.error,
           'error'
         )
      }
      )
    }
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>Edit hospital</h1>
                <div className="content-box">
                  <form onSubmit={submitForm}>
                  <div className="form-group">
                    <label>ชื่อโรงพยาบาล</label>
                    <input type="text" className="form-control" placeholder="ชื่อโรงพยาบาล" value={hospitalName} onChange={inputValue("hospitalName")}/>
                </div>
                <div className="form-group">
                    <label>ที่อยู่</label>
                    <input type="text" className="form-control" placeholder="ที่อยู่" value={address} onChange={inputValue("address")}/>
                </div>
                <div className="form-group">
                    <label>จังหวัด</label>
                    <select class="form-select" searchable="Search here.." value={province} onChange={inputValue("province")}>
                              <option value="1" disabled selected>เลือกจังหวัด</option>
                              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                              <option value="นครปฐม">นครปฐม</option>
                              <option value="กาญจนบุรี">กาญจนบุรี</option>
                      </select>
                      
                </div>
                <div className="form-group">
                    <label>อำเภอ</label>
                    <select class="form-select" searchable="Search here.." value={district} onChange={inputValue("district")}>
                              <option value="1" disabled selected>เลือกอำเภอ</option>
                              <option value="เมืองนครปฐม">เมืองนครปฐม</option>
                              <option value="กำแพงแสน">กำแพงแสน</option>
                              <option value="ดอนตูม">ดอนตูม</option>
                              <option value="นครชัยศรี">นครชัยศรี</option>
                              <option value="บางเลน">บางเลน</option>
                              <option value="พุทธมณฑล">พุทธมณฑล</option>
                              <option value="สามพราน">สามพราน</option>
                      </select>
                </div>
                <div className="form-group">
                    <label>ตำบล</label>
                    <select class="form-select" searchable="Search here.." value={subDistrict} onChange={inputValue("subDistrict")}>
                                <option value="1" disabled selected>เลือกตำบล</option>
                                <option value="โพรงมะเดื่อ">โพรงมะเดื่อ</option>
                                <option value="ดอนยายหอม">ดอนยายหอม</option>
                                <option value="ตาก้อง">ตาก้อง</option>
                                <option value="ถนนขาด">ถนนขาด</option>
                                <option value="ทัพหลวง">ทัพหลวง</option>
                                <option value="ทุ่งน้อย">ทุ่งน้อย</option>
                                <option value="ธรรมศาลา">ธรรมศาลา</option>
                                <option value="นครปฐม">นครปฐม</option>
                                <option value="บ่อพลับ">บ่อพลับ</option>
                                <option value="บางแขม">บางแขม</option>
                                <option value="บ้านยาง">บ้านยาง</option>
                                <option value="พระปฐมเจดีย์">พระปฐมเจดีย์</option>
                                <option value="พระประโทน">พระประโทน</option>
                                <option value="14">มาบแค</option>
                                <option value="15">ลำพญา</option>
                                <option value="16">วังเย็น</option>
                                <option value="17">วังตะกู</option>
                                <option value="18">สนามจันทร์</option>
                                <option value="19">สระกะเทียม</option>
                                <option value="20">สวนป่าน</option>
                                <option value="21">สามความยเผือก</option>
                                <option value="22">หนองงูเหลือม</option>
                                <option value="23">หนองดินแดง</option>
                                <option value="24">หนองปากโลง</option>
                                <option value="25">ห้วยจระเข้</option>
                                <option value="26">กระตีบ</option>
                                <option value="27">กำแพงแสน</option>
                                <option value="28">ดอนข่อย</option>
                                <option value="29">ทุ่งกระพังโหม</option>
                                <option value="30">ทุ่งขวาง</option>
                                <option value="31">ทุ่งบัว</option>
                                <option value="32">ทุ่งลูกนก</option>
                                <option value="33">รางพิกุล</option>
                                <option value="34">วังน้ำเขียว</option>
                                <option value="35">สระพัฒนา</option>
                                <option value="36">สระสี่มุม</option>
                                <option value="37">หนองกระทุ่ม</option>
                                <option value="38">ห้วยขวาง</option>
                                <option value="39">ห้วยม่วง</option>
                                <option value="40">ห้วยหมอนทอง</option>
                                <option value="41">ดอนพุทรา</option>
                                <option value="42">ดอนรวก</option>
                                <option value="43">บ้านหลวง</option>
                                <option value="44">ลำเหย</option>
                                <option value="45">ลำลูกบัว</option>
                                <option value="46">สามง่าม</option>
                                <option value="47">ห้วยด้วน</option>
                                <option value="48">ห้วยพระ</option>
                                <option value="49">แหลมบัว</option>
                                <option value="50">โคกพระเจดีย์</option>
                                <option value="51">ไทยาวาส</option>
                                <option value="52">ขุนแก้ว</option>
                                <option value="53">งิ้วราย</option>
                                <option value="54">ดอนแฝก</option>
                                <option value="55">ท่ากระชับ</option>
                                <option value="56">ท่าตำหนัก</option>
                                <option value="57">ท่าพระยา</option>
                                <option value="58">นครชัยศรี</option>
                                <option value="59">บางแก้ว</option>
                                <option value="60">บางแก้วฟ้า</option>
                                <option value="61">บางกระเบา</option>
                                <option value="62">บางพระ</option>
                                <option value="63">บางระกำ</option>
                                <option value="64">พะเนียด</option>
                                <option value="65">ลานตากฟ้า</option>
                                <option value="66">วัดแค</option>
                                <option value="67">วัดละมุด</option>
                                <option value="68">วัดสำโรง</option>
                                <option value="69">ศรีมหาโพธิ์</option>
                                <option value="70">ศรีษะทอง</option>
                                <option value="71">สัมปทวน</option>
                                <option value="72">ห้วยพลู</option>
                                <option value="73">ไทรงาม</option>
                                <option value="74">ไผ่หูช้าง</option>
                                <option value="75">คลองนกกระทุง</option>
                                <option value="76">ดอนตูม</option>
                                <option value="77">นราภิรมย์</option>
                                <option value="78">นิลเพชร</option>
                                <option value="79">บัวปากท่า</option>
                                <option value="80">บางเลน</option>
                                <option value="81">บางไทรป่า</option>
                                <option value="82">บางปลา</option>
                                <option value="83">บางภาษี</option>
                                <option value="84">บางระกำ</option>
                                <option value="85">บางหลวง</option>
                                <option value="86">ลำพญา</option>
                                <option value="87">หินมูล</option>
                                <option value="88">คลองโยง</option>
                                <option value="89">มหาสวัสดิ์</option>
                                <option value="90">ศาลายา</option>
                                <option value="91">ไร่ขิง</option>
                                <option value="92">กระทุ่มล้ม</option>
                                <option value="93">คลองใหม่</option>
                                <option value="94">คลองจินดา</option>
                                <option value="95">ตลาดจินดา</option>
                                <option value="96">ทรงคนอง</option>
                                <option value="97">ท่าข้าม</option>
                                <option value="98">ท่าตลาด</option>
                                <option value="99">บางเตย</option>
                                <option value="100">บางกระทึก</option>
                                <option value="101">บางช้าง</option>
                                <option value="102">บ้านใหม่</option>
                                <option value="103">ยายชา</option>
                                <option value="104">สามพราน</option>
                                <option value="105">หอมเกร็ด</option>
                                <option value="106">อ้อมใหญ่</option>
                    </select>
                </div> 
                    <br/>
                    <button type="submit" className="button-addnew"><FontAwesomeIcon icon={faAdd}/>update</button>
                </form>
              </div>
          </div>
      </div>
    )
}
export default EditHospitalComponent;