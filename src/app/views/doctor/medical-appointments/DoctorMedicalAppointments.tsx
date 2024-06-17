import Swal from "sweetalert2";
import { DateResponseSpanish } from "../../../models/Date";
import axios from "axios";
import { DATES } from "../../../routes/ApiRoutes";
import { useEffect, useState } from "react";
import { Button, Container, Table, Text, Tooltip } from "@nextui-org/react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import useDetailsMedicalHistoryModal from "./states/useDetailsMedicalHistoryModal";
import MedicalStory from "./components/MedicalStory";

export const DoctorMedicalAppointments = () => {

  const [dates, setDates] = useState<DateResponseSpanish[]>([]);
  const { showModal } = useDetailsMedicalHistoryModal()

  const getData = async () => {
    try {
      const id = localStorage.getItem('id');
      const resp = await axios.get(DATES + '/Cita/por-medico/' + id);
      if (resp.status == 200) {
        setDates(resp.data)
      }
    } catch (error: any) {
      if (error.response.status == "404") {
        setDates([]);
        return;
      } else {
        Swal.fire({
          text: `Error al cargar las cita ${JSON.stringify(error, null, 2)}`,
          title: 'Error',
          icon: 'error',
          customClass: {
            container: 'toFront'
          }
        })
      }
    }
  }

  const deleteDate = async (data: DateResponseSpanish) => {
    try {
      const resp = await axios.delete(DATES + '/Cita/' + data.id);
      if (resp.status != 200) {
        throw ''
      }

      getData();

      Swal.fire({
        text: 'Se Eliminó la cita',
        title: 'Ok',
        icon: 'success',
        customClass: {
          container: 'toFront'
        }
      })
    } catch (error) {
      Swal.fire({
        text: 'Error al eliminar la cita',
        title: 'Error',
        icon: 'error',
        customClass: {
          container: 'toFront'
        }
      })
    }
  }

  const confirmDeleteDate = async (data: DateResponseSpanish) => {
    Swal.fire({
      title: "Eliminar",
      text: `¿Quieres eliminar la cita del paciente ${data.nombrePaciente} del dia ${data.dia.split('T')[0]}?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar",
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDate(data)
      }
    });
  }

  useEffect(
    () => {
      getData();
    }, []
  )

  return (
    <div>
      <MedicalStory />
      
      <Container>
      <Text h2>Citas medicas</Text>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Acciones</Table.Column>
          <Table.Column>Paciente</Table.Column>
          <Table.Column>Dia</Table.Column>
          <Table.Column>Hora</Table.Column>
          <Table.Column>Estado</Table.Column>
          <Table.Column>Eliminar</Table.Column>
        </Table.Header>
        <Table.Body>
          {
            dates.map(
              (item: DateResponseSpanish, index: number) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {
                    // item.estado == 'Confirmada' && 
                    <Container css={{ display: 'flex', gap: '$5', padding: '$0' }}>
                      <Tooltip content='Tratamientos'>
                        <Button onPress={() => showModal(item)} auto icon={<FaPencil />} />
                      </Tooltip>
                    </Container>}
                  </Table.Cell>
                  <Table.Cell>{item.nombrePaciente}</Table.Cell>
                  <Table.Cell>{item.dia.split('T')[0]}</Table.Cell>
                  <Table.Cell>{item.hora}</Table.Cell>
                  <Table.Cell>{item.estado}</Table.Cell>
                  <Table.Cell>
                    {item.estado == 'Confirmada' && <Button auto onPress={() => confirmDeleteDate(item)} icon={<FaTrash />} color='error' />}
                  </Table.Cell>
                </Table.Row>
              )
            )
          }
        </Table.Body>
      </Table>
    </Container></div>
  )
}