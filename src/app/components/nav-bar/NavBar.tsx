import { Avatar, Button, Container, Divider, Spacer, Text } from '@nextui-org/react'
import './styles/nav-bar.css'
import { useNavigate } from 'react-router-dom';
import { Option, adminOptions, medicalOptions, patientOptions } from '../../utils/navbar.util';
import { useEffect, useState } from 'react';
import { TbDoorExit } from 'react-icons/tb';

const NavBar = () => {

    const [ options, setOptions ] = useState<Option[]>([]);

    const navigate = useNavigate();

    useEffect(
        ()=>{
            const rol = localStorage.getItem('rol');
            if(rol=='paciente'){
                setOptions(patientOptions)
            }else if(rol=='admin'){
                setOptions(adminOptions)
            }else if(rol=='medico'){
                setOptions(medicalOptions)
            }
        }
    )

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
            
            <Container css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                gap: '$5',
                padding: '0'
            }}>
            {
                options.map(
                    (item : Option, index: number)=>(
                        <Button 
                            key={index} 
                            onPress={()=>navigate(item.url)} 
                            css={{ width: '100%' }} 
                            icon={<item.icon />} 
                            color="primary" 
                            children={
                                item.name
                            }    
                        />
                    )
                )
            }
            </Container>

            <Container css={{display: 'flex',justifyContent: 'center', position: 'absolute', bottom: '10px'}}>
                <Button 
                    onPress={()=>navigate('/')} 
                    icon={<TbDoorExit />} 
                    color="primary" 
                    auto
                    title='Cerrar sesion'
                />
            </Container>
            
        </nav>
    )
}

export default NavBar
