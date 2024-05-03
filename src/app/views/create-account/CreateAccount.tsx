import { Button, Grid, Input, Spacer, Text } from '@nextui-org/react'
import './styles/create-account.css'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes/Routes';

const CreateAccount = () => {

  const navigate = useNavigate();

  const options = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'PC', label: 'Pasaporte Colombiano' },
    { value: 'RC', label: 'Registro Civil de Nacimiento' },
  ]

  const inputs = [
    { type: 'number', label: 'Número de documento' },
    { type: 'date', label: 'Fecha de nacimiento', mt: true },
    { type: 'number', label: 'Número de telefono', mt: true },
    { type: 'text', label: 'Nombres', mt: true },
    { type: 'text', label: 'Apellidos', mt: true },
    { type: 'email', label: 'Correo', mt: true },
    { type: 'email', label: 'Confirmación de correo', mt: true },
    { type: 'password', label: 'Contraseña', mt: true },
    { type: 'password', label: 'Confirmación de contraseña', mt: true },
  ]

  return (
    <div className="create-account-container ">
      <div className="create-account-card">
        <div style={{ width: '100%' }}>
          <Text css={{ fontSize: '20px', margin: '$0' }} h1>
            Pulsar<Text css={{ color: '$primary' }} span>care</Text>
          </Text>
          <Text css={{ fontSize: '60px', margin: '$0' }} h2>
            Crear cuenta<Text css={{ color: '$primary' }} span>!</Text>
          </Text>
          <Text>
            Justos somos más fuertes.
          </Text>
        </div>
        <Spacer />
        <Grid.Container gap={1}>
          <Grid xs={6} css={{ flexDirection: 'column' }}>
            <Text>Tipo de documento</Text>
            <Select
              isClearable
              styles={{
                container: (base)=>({
                  ...base,
                }),
                control: (base) => ({
                  ...base,
                  borderRadius: 10,
                  border: 'none',
                  background: '#f1f3f5'
                }),
              }}
              placeholder='Tipo de documento'
              options={options}
              className="react-select-container"
            />
          </Grid>
          {
            inputs.map((item, index) => (
              <Grid xs={6} key={index}>
                <Input type={item.type} clearable css={{ width: '100%' }} label={item.label} />
              </Grid>
            ))
          }
        </Grid.Container>
        <Spacer />
        <div style={{width: '100%'}}>
          <Button css={{ width: '100%' }}>Crear Cuenta</Button>
          <Spacer />
          <Button type='button' onPress={() => navigate(Routes.ROOT)} css={{ width: '100%' }} auto ghost>
            Ya tengo cuenta
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
