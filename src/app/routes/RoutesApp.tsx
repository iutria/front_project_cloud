import { Routes as ReactRoutes, Route, BrowserRouter  } from "react-router-dom"
import Login from "../views/login/Login"
import CreateAccount from "../views/create-account/CreateAccount"
import { Routes } from "./Routes"
import Home from "../views/home/Home"
import MedicalAppointments from "../views/medical-appointments/MedicalAppointments"
import MedicalStories from "../views/medical-stories/MedicalStories"

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path={Routes.ROOT} element={<Login />}/>
        <Route path={Routes.HOME} element={<Home/>}/>
        <Route path={Routes.MEDICAL_APPOINTMENTS} element={<Home><MedicalAppointments/></Home>} />
        <Route path={Routes.MEDICAL_STORIES} element={<Home><MedicalStories/></Home>} />
        <Route path={Routes.CREATE_ACCOUNT} element={<CreateAccount/>}/>
      </ReactRoutes>
    </BrowserRouter>
  )
}

export default RoutesApp