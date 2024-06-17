import { Button, Container, Modal, Spacer, Table, Text, Textarea } from '@nextui-org/react'
import useDetailsMedicalHistoryModal from '../states/useDetailsMedicalHistoryModal'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MEDICAL_HISTORIES_API } from '../../../../routes/ApiRoutes';
import { Diagnostic, MedicalHistories } from '../../../../models/medicalStories';
import { useFormik } from 'formik';
import { obtenerFechaActual } from '../../../../utils/date';
import Swal from 'sweetalert2';

const MedicalStory = () => {

  const { visible, closeModal, data } = useDetailsMedicalHistoryModal();

  const [find, setFind] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [trateatments, setTrateatments] = useState<Diagnostic[]>([]);
  const [procedures, setProcedures] = useState<Diagnostic[]>([]);

  const [view, setView] = useState<number>(0);

  const getData = async () => {
    try {
      const resp = await axios.get(MEDICAL_HISTORIES_API + '/MedicalHistories/cita/' + data?.id)
      if(resp.status==200){
        const data = resp.data;
        setDiagnostics(data.diagnostics)
        setTrateatments(data.treatments)
        setProcedures(data.procedures)
        setFind(true);
        setId(data.id);
      }
    } catch (error) {
      setFind(false);
      setDiagnostics([])
      setTrateatments([])
      setProcedures([])
    }
  }

  const save = async()=>{

    const name = localStorage.getItem('firstName');
    const medicoEspecialidad = localStorage.getItem('speciality');
    const fechaCreacion = obtenerFechaActual();
    const newData = {
      id:                 '',
      patientId:          data?.pacienteId,
      medicoId:           data?.medicoId,
      medicoNombre:       name,
      medicoEspecialidad,
      diagnostics,
      treatments: trateatments,
      procedures,
      fechaCreacion,
      idCita: data?.id,
      medicalHistory: []
    }

    try {
      if(find){
        await axios.put(MEDICAL_HISTORIES_API + '/MedicalHistories/'+id, { ...newData, id})

      }else{
        await axios.post(MEDICAL_HISTORIES_API + '/MedicalHistories', newData)
      }
      Swal.fire({
        text: 'Guardado correctamente',
        title: 'OK',
        icon: 'success',
        customClass: {
          container: 'toFront'
        }
      })
    } catch (error) {
      Swal.fire({
        text: 'Error al guardar',
        title: 'Error',
        icon: 'error',
        customClass: {
          container: 'toFront'
        }
      })
    }

  }

  useEffect(
    () => {
      setDiagnostics([])
      setTrateatments([])
      setProcedures([])
      data && getData();
    }, [data]
  )

  const formik = useFormik({
    initialValues: { comment: '' },
    onSubmit: (values) => {
      const dateTime = obtenerFechaActual();
      if (view == 0) {
        const diagnosticsCPY: any = [...diagnostics];

        diagnosticsCPY.push({
          id: "string",
          description: values.comment,
          date: dateTime
        })

        setDiagnostics(diagnosticsCPY);
      } else if (view == 1) {
        const trateatmentsCPY: any = [...trateatments];

        trateatmentsCPY.push({
          id: "string",
          description: values.comment,
          date: dateTime
        })

        setTrateatments(trateatmentsCPY);
      } else {
        const proceduresCPY: any = [...procedures];

        proceduresCPY.push({
          id: "string",
          description: values.comment,
          date: dateTime
        })

        setProcedures(proceduresCPY);
      }

      formik.setFieldValue('comment', '');
    }
  })

  const TableBody = ({ data }: { data: Diagnostic[] }) => {
    return <>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Descripción</Table.Column>
          <Table.Column>Fecha</Table.Column>
        </Table.Header>
        <Table.Body>
          {
            data.map(
              (item: Diagnostic, index: number) => {
                return <Table.Row key={index}>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                </Table.Row>
              }
            )
          }
        </Table.Body>
      </Table>
    </>
  }

  return (
    data && <>
      <Modal
        closeButton
        aria-labelledby="modal-recovery"
        open={visible}
        onClose={closeModal}
        blur
        fullScreen
        scroll
      >
        <Modal.Header>
          <Text h2>Gestion de historial medico {data.nombrePaciente}</Text>
        </Modal.Header>
        <Modal.Body>
          <Container css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '$10' }}>
            <Button.Group>
              <Button bordered={view != 0} onPress={() => setView(0)}>Diagnosticos</Button>
              <Button bordered={view != 1} onPress={() => setView(1)}>Tratamientos</Button>
              <Button bordered={view != 2} onPress={() => setView(2)}>Procedimientos</Button>
            </Button.Group>
          </Container>
          <form onSubmit={formik.handleSubmit}>
            <Text h2>
              {
                view == 0 ? 'Dianostico' : view == 1 ? 'Tratamiento' : 'Procedimiento'
              }
            </Text>
            <Textarea
              required
              name='comment'
              value={formik.values.comment}
              onChange={formik.handleChange}
              width='100%'
              label={view == 0 ? 'Dianostico' : view == 1 ? 'Tratamiento' : 'Procedimiento'}
            />
            <Spacer />
            <Button type='submit'>Agregar nuevo {view == 0 ? 'Dianostico' : view == 1 ? 'Tratamiento' : 'Procedimiento'}</Button>
          </form>
          <TableBody data={view == 0 ? diagnostics : view == 1 ? trateatments : procedures} />
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={save}>Guardar Historial</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MedicalStory