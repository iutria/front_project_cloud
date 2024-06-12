import { Button, Modal, Table, Text } from '@nextui-org/react';
import useMedicalAppointmensModal from '../../states/useMedicalAppointmensModal';
import { useEffect, useState } from 'react';
import { DOCTOR_API } from '../../../../../routes/ApiRoutes';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Doctor } from '../../../../../models/Doctor';
import { FaRegCalendarPlus } from 'react-icons/fa6';
import useAppoimentRegisterModal from '../../states/useAppoimentRegisterModal';

const MedicalAppointmensModal = () => {

  const { closeModal, visible } = useMedicalAppointmensModal();
  const { showModal } = useAppoimentRegisterModal();

  const [ doctors, setDoctors ] = useState<Doctor[]>([]);

  const getAllDoctors = async()=>{
    try {
      const resp = await axios.get(DOCTOR_API + '/all');

      if(resp.status!=200){
        throw '';
      }

      setDoctors(resp.data)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Error al consultar los medicos'
      })
    }
  }

  useEffect(
    ()=>{
      getAllDoctors()
    },[visible]
  );

  return (
    <>
      <Modal
        blur
        scroll
        fullScreen
        preventClose
        closeButton
        open={visible}
        width={'100%'}
        onClose={closeModal}
        aria-labelledby="modal-recovery"
      >
        <Modal.Header>
          <Text h2>Medicos</Text>
        </Modal.Header>
          <Modal.Body>
          <Table
              aria-label="Example table with static content"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                <Table.Column>MEDICO</Table.Column>
                <Table.Column>ESPECIALIDAD</Table.Column>
                <Table.Column>ACCIONES</Table.Column>
              </Table.Header>
              <Table.Body>
                {
                  doctors.map(
                    (item: Doctor, index: number)=>(
                      <Table.Row key={index}>
                        <Table.Cell>{item.nombre} {item.apellido}</Table.Cell>
                        <Table.Cell>{item.especialidades.map(
                            (especialidad:string)=>(especialidad + ' ' )
                          )}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onPress={()=>{showModal(item)}}
                            auto
                            icon={<FaRegCalendarPlus />}
                            title='Apartar cita'
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  )
                }
              </Table.Body>
                </Table>
          </Modal.Body>
              <Modal.Footer>
                <Button
                  onPress={closeModal}
                  color='error'
                >
                  Cancelar
                </Button>
              </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicalAppointmensModal
