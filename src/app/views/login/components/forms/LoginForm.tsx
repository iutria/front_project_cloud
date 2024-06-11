import { Button, Spacer } from '@nextui-org/react'
import { Form, Formik } from 'formik'
import { Input, Password } from '../../../../components/input/Inputs'
import { useLogin } from '../../states/login.state'

const LoginForm = () => {

    const { login } = useLogin();

    const handleSubmmit = async (values: any) => {
        const resp = await login(values);
        console.log(resp)
    }

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmmit}
        >
            <Form style={{ width: '100%' }}>
                <Input label='Correo' field='email' clearable />
                <Spacer />
                <Password label='Contraseña' field='password' clearable />
                <Spacer />
                <Button type='submit' css={{ width: '100%' }}>Iniciar sesion</Button>
            </Form>
        </Formik>
    )
}

export default LoginForm
