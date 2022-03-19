import { BrowserRouter,Switch,Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import AnnounceComponent from "./components/AnnounceComponent";
import AddHospitalComponent from "./components/AddHospitalComponent";
import App from "./App"
import HospitalComponent from "./components/HospitalComponent";
import AddAnnounceComponent from "./components/AddAnnounceComponent";
import TestComponent from "./components/TestComponent";
import EditHospitalComponent from "./components/EditHospitalComponent";
import NewsComponent from "./components/NewsComponent";
import OrganizationComponent from "./components/OrganizationComponent";
import CheckStatusComponent from "./components/CheckStatusComponent";
import DocumentComponent from "./components/DocumentComponent";
import ResultComponent from "./components/ResultComponent";
const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/announce" exact component={AnnounceComponent}/>
                <Route path="/login" exact component={LoginComponent}/>
                <Route path="/register" exact component={RegisterComponent}/>
                <Route path="/addhospital" exact component={AddHospitalComponent}/>
                <Route path="/hospital" exact component={HospitalComponent}/>
                <Route path="/addannounce" exact component={AddAnnounceComponent}/>
                <Route path="/test" exact component={TestComponent}/>
                <Route path="/edithospital/:_id" exact component={EditHospitalComponent}/>


                <Route path="/news" exact component={NewsComponent}/>
                <Route path="/organization" exact component={OrganizationComponent} />
                <Route path="/checkstatus" exact component={CheckStatusComponent} />
                <Route path="/documents" exact component={DocumentComponent} />
                <Route path="/result" exact component={ResultComponent} />
            </Switch>
        </BrowserRouter>
    );
}
export default MyRoute;