import { Button, Spacer } from '@nextui-org/react'
import { Form, Formik } from 'formik'
import { Input, Password } from '../../../../components/input/Inputs'
import { useLogin } from '../../states/login.state'
import Select from '../../../../components/select/Select'
import { validateEmail } from '../../../../utils/validate_email.util'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { PageRoutes } from '../../../../routes/PageRoutes'

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useLogin();

    const handleSubmmit = async (values: any) => {

        if(values.type.length==0){
            Swal.fire({
                title: 'Error',
                text: 'Debe seleccionar el rol',
                icon: 'error'
            })
            return;
        }

        const resp = await login(values);

        if(resp){
            navigate(PageRoutes.HOME)
        }else{
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido iniciar sesion',
                icon: 'error'
            })
        }
    }

    return (
        <Formik
            initialValues={{email: '', password: '', type: ''}}
            onSubmit={handleSubmmit}
            validate={
                (values: any)=>{
                    const errors: any = {};
                    if(!validateEmail(values.email)){
                        errors.email = 'debe ingresar un correo valido'
                    }
                    if(values.password.length == 0){
                        errors.password = 'debe ingresar una clave valida'
                    }
                    return errors;
                }
            }
        >
            <Form style={{ width: '100%' }}>
                <Select<any> text='Rol' options={[
                    {value: 'paciente', label: 'Paciente'},                    
                    {value: 'medico', label: 'Medico'},
                ]} field='type' />
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
