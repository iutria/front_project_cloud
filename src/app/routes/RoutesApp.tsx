import { Routes , Route, BrowserRouter  } from "react-router-dom"
import Login from "../views/login/Login"
import CreateAccount from "../views/create-account/CreateAccount"
import { PageRoutes } from "./PageRoutes"
import Home from "../views/home/Home"
import MedicalAppointments from "../views/patient/medical-appointments/MedicalAppointments"
import MedicalStories from "../views/patient/medical-stories/MedicalStories"
import Options from "../views/patient/options/Options"
import { DoctorMedicalAppointments } from "../views/doctor/medical-appointments/DoctorMedicalAppointments"
import DoctorSchedule from "../views/doctor/schedule/Schedule"
import { Container, Text } from "@nextui-org/react"

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.ROOT} element={<Login />}/>
        <Route path={PageRoutes.HOME} element={<Home>
          <Container css={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Text css={{ fontSize: '60px', margin: '$0'}} h2>
              Bienvenido<Text css={{color: '$primary'}} span>!</Text>
            </Text>
          </Container>
        </Home>}/>
        <Route path={PageRoutes.MEDICAL_APPOINTMENTS} element={<Home><MedicalAppointments/></Home>} />
        <Route path={PageRoutes.MEDICAL_STORIES} element={<Home><MedicalStories/></Home>} />
        <Route path={PageRoutes.CREATE_ACCOUNT} element={<CreateAccount/>}/>
        <Route path={PageRoutes.OPTIONS} element={<Home><Options/></Home>}/>
        <Route path={PageRoutes.DOCTOR_MEDICAL_APPOINTMENTS} element={<Home><DoctorMedicalAppointments/></Home>}/>
        <Route path={PageRoutes.DOCTOR_SCHEDULE} element={<Home><DoctorSchedule/></Home>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp