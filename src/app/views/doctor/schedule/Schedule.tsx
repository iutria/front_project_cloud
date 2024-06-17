import axios from "axios";
import { useEffect, useState } from "react";
import { SCHEDULES_API } from "../../../routes/ApiRoutes";
import Swal from "sweetalert2";
import { Button, Card, Container, Grid, Input, Spacer, Table, Text } from "@nextui-org/react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useFormik } from "formik";
import { Schedule } from "../../../models/Schedule";

const DoctorSchedule = () => {

  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const initialValues = {
    id: '',
    dia: '',
    hora: '',
    idMedico: ''
  }

  const deleteDate = async(data: Schedule)=>{
    try {
      const resp = await axios.delete(SCHEDULES_API + '/Horario/' + data.id);
      if (resp.status == 204) {
        Swal.fire({
          icon: 'success',
          text: 'Eliminado correctamente',
          title: 'OK'
        })
        getsChedule();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Ocurrio un error al eliminar el horario.',
        title: 'error'
      })
    }
  }

  const confirmDeleteDate = async (data: Schedule) => {
    Swal.fire({
      title: "Eliminar",
      text: `¿El horario de los dias ${data.dia.split('T')[0]} y la hora ${data.hora}?`,
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

  const putInfo = async (values: Schedule) => {
    try {
      const resp = await axios.put(SCHEDULES_API + '/Horario/' + values.id, values);
      if (resp.status == 200) {
        getsChedule();
        formik.setValues(initialValues)
        Swal.fire({
          icon: 'success',
          text: 'Modificado correctamente',
          title: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Ocurrio un error al editar el horario.',
        title: 'error'
      })
    }
  }

  const saveInfo = async (values: Schedule) => {
    try {
      const idMedico = localStorage.getItem('id');
      const data: any = { ...values, idMedico };
      delete data.id;
      const resp = await axios.post(SCHEDULES_API + '/Horario', data)
      if (resp.status == 200) {
        getsChedule();
        formik.setValues(initialValues)
        Swal.fire({
          icon: 'success',
          text: 'Guardado correctamente',
          title: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Ocurrio un error al guardar el horario.',
        title: 'error'
      })
    }
  }

  const formik = useFormik<Schedule>({
    initialValues,
    onSubmit: (values: Schedule) => {
      if (values.id == '') {
        saveInfo(values);
      } else {
        putInfo(values);
      }
    }
  })

  const getsChedule = async () => {
    try {
      const id = localStorage.getItem('id');
      const resp = await axios.get(SCHEDULES_API + '/Horario/medico/' + id);
      setSchedules(resp.data ?? []);
    } catch (error: any) {
      if(error.response.status!=404){
        Swal.fire({
          icon: 'error',
          text: 'No se ha podido cargar la lista de horarios',
          title: 'error'
        })
      }
    }
  }

  useEffect(
    () => {
      getsChedule();
    }, []
  )

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Card.Header>
            <Text h2>Horarios</Text>
          </Card.Header>
          <Card.Body>
            <Grid.Container gap={1}>
              <Grid xs={6}>
                <Input
                  css={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.dia}
                  label="Dia"
                  type="date"
                  name="dia"
                  required
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  css={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.hora.trim()}
                  label="Hora"
                  type="time"
                  name="hora"
                  required
                />
              </Grid>
            </Grid.Container>
          </Card.Body>
          <Card.Footer>
            <Button type='button' color='error' onPress={() => formik.setValues(initialValues)}>Cancelar</Button>
            <Spacer />
            <Button type='submit' color={formik.values.id == '' ? 'primary' : 'success'}>{formik.values.id == '' ? 'Guardar' : 'Editar'}</Button>
          </Card.Footer>
        </Card>
      </form>
      <Spacer />
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>HORA</Table.Column>
          <Table.Column>DIA</Table.Column>
          <Table.Column>ACCIONES</Table.Column>
        </Table.Header>
        <Table.Body>
          {
            schedules.map(
              (item: Schedule, index: number) =>
                <Table.Row key={index}>
                  <Table.Cell>{item.dia.split('T')[0]} </Table.Cell>
                  <Table.Cell>{item.hora} </Table.Cell>
                  <Table.Cell css={{ display: 'flex', gap: '$10' }}>
                    <Button auto icon={<FaPencil />} onPress={
                      () => {
                        const dia = item.dia.split('T')[0]
                        formik.setValues({ ...item, dia })
                      }
                    } />
                    <Button onPress={()=>confirmDeleteDate(item)} color='error' auto icon={<FaTrash />} />
                  </Table.Cell>
                </Table.Row>

            )
          }
        </Table.Body>
      </Table>
    </Container>
  );
}

export default DoctorSchedule