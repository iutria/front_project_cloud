import { FaGear, FaPerson, FaPersonArrowDownToLine } from "react-icons/fa6";
import { PageRoutes } from "../routes/PageRoutes";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";

export interface Option{
    url: string;
    name: string;
    icon: any;
}

export const patientOptions : Option[] = [
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Citas',
        icon: FaCalendarAlt
    },
    {
        url: PageRoutes.MEDICAL_STORIES,
        name: 'Historias',
        icon: FaHistory
    },
    {
        url: PageRoutes.OPTIONS,
        name: 'Opciones',
        icon: FaGear
    },
]

export const medicalOptions : Option[] = [
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Consultar Citas',
        icon: FaCalendarAlt
    },
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Registrar Historial',
        icon: FaHistory
    },
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Horarios',
        icon: FaCalendarAlt
    }
]

export const adminOptions : Option[] = [
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Medicos',
        icon: FaPerson
    },
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Administradores',
        icon: FaPersonArrowDownToLine
    },
    {
        url: PageRoutes.MEDICAL_APPOINTMENTS,
        name: 'Opciones',
        icon: FaGear
    },
]
