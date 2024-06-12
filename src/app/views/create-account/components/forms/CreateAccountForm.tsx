import { Button, Loading, Spacer } from '@nextui-org/react'
import { Form, Formik, FormikHelpers } from 'formik';
import { Patient } from '../../../../models/Patient';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../../routes/PageRoutes';
import Swal from 'sweetalert2';
import { createAccountValidator } from '../../../../validators/create_account.validator';
import { useCreateAccount } from '../../states/create_account.state';
import FormFields from './FormFields';

const CreateAccountForm = () => {

    const navigate = useNavigate();

    const { createAccount, isLoading } = useCreateAccount();

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
                <FormFields/>
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
