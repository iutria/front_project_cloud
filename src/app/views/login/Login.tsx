import { Button, Spacer, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../routes/PageRoutes';

import './styles/login.css';
import LoginForm from './components/forms/LoginForm';
import { useEffect } from 'react';

const Login = () => {

  const navigate = useNavigate();

  useEffect(
    ()=>{
      const token: string  | null = localStorage.getItem('token');

      if(token){
        navigate(PageRoutes.HOME);
      }
    },[]
  )

  return (
    <div className='login-container'>
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
        <LoginForm />
        <Spacer/>
        <Button type='button' onPress={()=>navigate(PageRoutes.CREATE_ACCOUNT)} css={{width: '100%'}} color="primary" auto ghost>
          Crear cuenta
        </Button>
        <Spacer/>
      </div>
    </div>
  )
}

export default Login
