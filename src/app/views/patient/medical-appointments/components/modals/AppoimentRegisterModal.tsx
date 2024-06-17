import { Button, Input, Modal, Text } from '@nextui-org/react'
import useAppoimentRegisterModal from '../../states/useAppoimentRegisterModal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { DATES } from '../../../../../routes/ApiRoutes';
import { PostDate } from '../../../../../models/Date';

const AppoimentRegisterModal = () => {

    const { visible, closeModal, body } = useAppoimentRegisterModal();
    const [ date, setDate ] = useState<string>('');

    useEffect(
        ()=>{
            setDate('')
        },[visible]
    )

    const saveAppoiment = async()=>{
        
        if(!date){
            Swal.fire({
                text: 'Debe seleccionar una fecha',
                title: 'Error',
                icon: 'error',
                customClass: {
                    container: 'toFront'
                }
            })
            return;
        }
        
        const [day, hour] = date.split('T');
        const id = localStorage.getItem('id');

        const name = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')

        const newDate: PostDate = {
            dia: day,
            especialidad: body?.especialidades[0] ?? '',
            estado: '',
            hora: hour,
            medicoId: body!.id,
            pacienteId: id!,
            nombrePaciente: name
        }

        try {
            const resp = await axios.post(DATES+'/Cita', newDate)
            if(resp.status==200){
                Swal.fire({
                    text: 'Se asigno la cita',
                    title: 'Ok',
                    icon: 'success',
                    customClass: {
                        container: 'toFront'
                    }
                })
                closeModal();
            }else{
                throw '';
            }
        } catch (error) {
            Swal.fire({
                text: 'Error al solicitar la cita',
                title: 'Error',
                icon: 'error',
                customClass: {
                    container: 'toFront'
                }
            })
        }
    }

    return (
        body && <>
            <Modal
                blur
                closeButton
                open={visible}
                onClose={closeModal}
                width='50%'
            >
                <Modal.Header>
                    <div>
                    <Text h2>Nueva cita medica, {body.especialidades.map(item => (item + ' '))}</Text>
                    <Text p>Doctor: {body.nombre} {body.apellido}</Text>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Input 
                        type='datetime-local' 
                        value={date}
                        onChange={
                            (e)=>{
                                setDate(e.target.value);
                            }
                        } 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onPress={closeModal}
                        color='error'
                        css={{ widt: '100%' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        css={{ widt: '100%' }}
                        onPress={saveAppoiment}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AppoimentRegisterModal
