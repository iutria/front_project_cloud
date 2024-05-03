import { Avatar, Button, Divider, Spacer, Text } from '@nextui-org/react'
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import './styles/nav-bar.css'
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes/Routes';

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                css={{size: '150px'}}
            />
            <Spacer/>
            <Text color='white' b>Nombre Apellido</Text>
            <Spacer/>
            <Divider/>
            <Spacer/>
            <Button onPress={()=>navigate(Routes.MEDICAL_APPOINTMENTS)} css={{width: '100%'}} icon={<FaCalendarAlt />} color="primary" auto>
                Citas
            </Button>
            <Spacer/>
            <Button onPress={()=>navigate(Routes.MEDICAL_STORIES)} css={{width: '100%'}} icon={<FaHistory />} color="primary" auto>
                Historias
            </Button>
        </nav>
    )
}

export default NavBar
