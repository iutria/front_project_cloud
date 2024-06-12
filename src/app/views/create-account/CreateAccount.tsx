import { Spacer, Text } from '@nextui-org/react'
import CreateAccountForm from './components/forms/CreateAccountForm'
import './styles/create-account.css'


const CreateAccount = () => {
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
            Juntos somos más fuertes.
          </Text>
        </div>
        <Spacer />
        <CreateAccountForm />
      </div>
    </div>
  )
}

export default CreateAccount