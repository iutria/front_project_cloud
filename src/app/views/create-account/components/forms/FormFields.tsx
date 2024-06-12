import { Grid } from '@nextui-org/react'
import Select, { Option } from '../../../../components/select/Select'
import { Patient } from '../../../../models/Patient'
import { Input, InputProps, Password } from '../../../../components/input/Inputs'

const FormFields = ({ isEdith = false }: { isEdith?: boolean }) => {
    const inputs: InputProps<Patient>[] = [
        { type: 'number', label: 'Número de documento', field: 'identificationNumber' },
        { type: 'date', label: 'Fecha de nacimiento', field: 'dateOfBirth' },
        { type: 'number', label: 'Número de telefono', field: 'phone' },
        { type: 'text', label: 'Nombres', field: 'firstName' },
        { type: 'text', label: 'Apellidos', field: 'lastName' },
        { type: 'email', label: 'Correo', field: 'email' },
        { type: 'email', label: 'Confirmación de correo', field: 'confirmEmail' },
    ]

    const options: Option[] = [
        { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
        { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad' },
        { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
        { value: 'Pasaporte', label: 'Pasaporte' }
    ]

    return (
        <Grid.Container gap={1}>
            <Grid xs={6} css={{ flexDirection: 'column' }}>
                <Select<Patient> isDisabled={isEdith} text='Tipo de documento' field='identificationType' options={options} />
            </Grid>
            {
                inputs.map((item, index) => (
                    <Grid xs={6} key={index}>
                        <Input<Patient> disabled={isEdith} field={item.field} label={item.label} type={item.type} />
                    </Grid>
                ))
            }
            <Grid xs={6}>
                <Password<Patient> disabled={isEdith} field='password' clearable label='Contraseña' />
            </Grid>
            <Grid xs={6}>
                <Password<Patient> disabled={isEdith} field='confirmPassword' clearable label='Confirmación de Contraseña' />
            </Grid>
        </Grid.Container>
    )
}

export default FormFields
