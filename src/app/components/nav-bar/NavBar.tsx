import { Avatar, Button, Container, Divider, Spacer, Text } from '@nextui-org/react'
import './styles/nav-bar.css'
import { useNavigate } from 'react-router-dom';
import { Option, medicalOptions, patientOptions } from '../../utils/navbar.util';
import { useEffect, useState } from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { PageRoutes } from '../../routes/PageRoutes';
import icon from '../../../assets/user.svg'

const NavBar = () => {

    const [ options, setOptions ] = useState<Option[]>([]);
    const [ name, setName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');

    const navigate = useNavigate();

    useEffect(
        ()=>{
            const rol = localStorage.getItem('rol');
            if(!rol){
                navigate(PageRoutes.ROOT);
                return;
            } 
            
            const nameLS = localStorage.getItem('name') ?? '';
            const lastNameLS = localStorage.getItem('lastName') ?? '';

            setName(nameLS);
            setLastName(lastNameLS);

            if(rol=='paciente'){
                setOptions(patientOptions)
            }else if(rol=='medico'){
                setOptions(medicalOptions)
            }
        },[]
    )

    return (
        <nav className='navbar'>
            <Avatar
                src={icon}
                css={{size: '150px', background: '#000000'}}
            />
            <Spacer/>
            <Text color='white' b>{name} {lastName}</Text>
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
                    onPress={()=>{
                        localStorage.clear();
                        navigate('/');
                    }} 
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
