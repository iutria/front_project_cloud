import { Button, Input, Spacer, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes/Routes';
import RecoverPassword from './components/modals/RecoverPassword';
import useRecoverPasswordModal from './states/useRecoverPasswordModal';

import './styles/login.css';

const Login = () => {

  const { showModal } = useRecoverPasswordModal();
  const navigate = useNavigate();

  const handleLogin = ()=>{
    navigate(Routes.HOME);
  }

  return (
    <div className='login-container'>
      <RecoverPassword />
      <div className='card-login'>
        <div style={{width: '100%'}}>
          <Text css={{ fontSize: '20px', margin: '$0'}} h1>
            Pulsar<Text css={{color: '$primary'}} span>care</Text>
          </Text>
          <Text css={{ fontSize: '60px', margin: '$0'}} h2>
            Bienvenido<Text css={{color: '$primary'}} span>!</Text>
          </Text>
          <Text>
            Sincronizando latidos, cuidando vidas.
          </Text>
        </div>
        <Spacer/>
        <Input aria-label='email' width='100%' placeholder="Correo" type='email' clearable/>
        <Spacer/>
        <Input.Password aria-label='password' width='100%' placeholder="Contraseña" clearable/>
        <Spacer/>
        <Button type='submit' onPress={handleLogin} css={{width: '100%'}}>Iniciar sesion</Button>
        <Spacer/>
        <Button type='button' onPress={()=>navigate(Routes.CREATE_ACCOUNT)} css={{width: '100%'}} color="primary" auto ghost>
          Crear cuenta
        </Button>
        <Spacer/>
        <Button type='button' onPress={showModal} light css={{width: '100%'}} color="primary">
          ¡Olvide mi contraseña!
        </Button>
      </div>
    </div>
  )
}

export default Login
