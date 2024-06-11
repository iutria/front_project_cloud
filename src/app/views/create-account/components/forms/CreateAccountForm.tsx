import { Button, Grid, Loading, Spacer, Text } from '@nextui-org/react'
import Select, { Option } from '../../../../components/select/Select'
import { Form, Formik, FormikHelpers } from 'formik';
import { Patient } from '../../../../models/Patient';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../../routes/PageRoutes';
import { Input, InputProps, Password } from '../../../../components/input/Inputs';
import Swal from 'sweetalert2';
import { createAccountValidator } from '../../../../validators/create_account.validator';
import { useCreateAccount } from '../../states/create_account.state';

const CreateAccountForm = () => {

    const navigate = useNavigate();

    const { createAccount, isLoading } = useCreateAccount();

    const options : Option[] = [
        { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
        { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad' },
        { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
        { value: 'Pasaporte', label: 'Pasaporte' }
    ]

    const inputs: InputProps<Patient>[] = [
        { type: 'number', label: 'Número de documento', field: 'identificationNumber' },
        { type: 'date', label: 'Fecha de nacimiento', field: 'dateOfBirth' },
        { type: 'number', label: 'Número de telefono', field: 'phone' },
        { type: 'text', label: 'Nombres', field: 'firstName' },
        { type: 'text', label: 'Apellidos', field: 'lastName' },
        { type: 'email', label: 'Correo', field: 'email' },
        { type: 'email', label: 'Confirmación de correo', field: 'confirmEmail' },
    ]

    const initialValues: Patient = {
        confirmEmail: '',
        confirmPassword: '',
        dateOfBirth: '',
        email: '',
        firstName: '',
        identificationNumber: '',
        identificationType: '',
        lastName: '',
        password: '',
        phone: '',
        userId: '',
    };

    return (
        <Formik<Patient>
            initialValues={initialValues}
            validateOnChange={false}
            onSubmit={
                async(values: Patient, actions: FormikHelpers<Patient>) => { 
                    
                    const resp = await createAccount(values);

                    if(resp==201){
                        Swal.fire({
                            icon: "success",
                            title: "OK",
                            text: `Se ha registrado correctamente`,
                        });
                        actions.setValues(initialValues);
                        actions.setErrors({});
                    }else{
                        Swal.fire({
                            icon: "success",
                            title: "OK",
                            text: `Se ha registrado correctamente`,
                        });
                    }
                    
                }
            }
            validate={createAccountValidator}
        >
            <Form>
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
                        <Select<Patient> field='identificationType' options={options} />
                    </Grid>
                    {
                        inputs.map((item, index) => (
                            <Grid xs={6} key={index}>
                                <Input<Patient> field={item.field} label={item.label} type={item.type} />
                            </Grid>
                        ))
                    }
                    <Grid xs={6}>
                        <Password<Patient> field='password' clearable label='Contraseña' />
                    </Grid>
                    <Grid xs={6}>
                        <Password<Patient> field='confirmPassword' clearable label='Confirmación de Contraseña' />
                    </Grid>
                </Grid.Container>
                <Spacer />
                <div style={{ width: '100%' }}>
                    <Button type='submit' disabled={isLoading} css={{ width: '100%' }}>
                        {
                            isLoading ? 
                            <><Loading style={{marginRight: '10px'}} color="currentColor" size="sm" /> Cargando...</>:
                            'Crear Cuenta'
                        }
                    </Button>
                    <Spacer />
                    <Button type='button' onPress={() => navigate(PageRoutes.ROOT)} css={{ width: '100%' }} auto ghost>
                        Ya tengo cuenta
                    </Button>
                </div>
            </Form>
        </Formik>
    )
}

export default CreateAccountForm
