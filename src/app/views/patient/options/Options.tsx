import { Form, Formik } from "formik"
import FormFields from "../../create-account/components/forms/FormFields"
import { Patient } from "../../../models/Patient";
import { Card, Container, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PATIENT_API } from "../../../routes/ApiRoutes";
import axios from "axios";
import { createAccountValidator } from "../../../validators/create_account.validator";
import Swal from "sweetalert2";

const Options = () => {

    const [initialValues, setInitialValues] = useState<Patient | null>(null);

    const getData = async () => {
        try {
            const id = localStorage.getItem('id');
            const resp = await axios.get(PATIENT_API + '/Patients/user/' + id)
            setInitialValues(resp.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los datos de usuario'
            })
        }
    }

    useEffect(
        () => {
            getData()
        }, []
    )

    return (
        initialValues && <Container css={{ padding: '$20' }}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: Patient) => { console.log(values) }}
                validate={createAccountValidator}
            >
                <Form>
                    <Card >
                        <Card.Header>
                            <Text h2>Información</Text>
                        </Card.Header>
                        <Card.Body>
                            <FormFields isEdith={true}/>
                        </Card.Body>
                        <Card.Footer>
                            {/* <Button css={{width: '100%'}} type='submit'>Actualizar</Button> */}
                        </Card.Footer>
                    </Card>
                </Form>
            </Formik>
        </Container>
    )
}

export default Options
