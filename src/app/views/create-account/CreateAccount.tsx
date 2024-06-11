import CreateAccountForm from './components/forms/CreateAccountForm'
import './styles/create-account.css'


const CreateAccount = () => {
  return (
    <div className="create-account-container ">
      <div className="create-account-card">
        <CreateAccountForm />
      </div>
    </div>
  )
}

export default CreateAccount