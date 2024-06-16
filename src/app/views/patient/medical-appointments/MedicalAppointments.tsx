import { Button, Container, Table, Text } from "@nextui-org/react";
import useMedicalAppointmensModal from "./states/useMedicalAppointmensModal";
import MedicalAppointmensModal from "./components/modals/MedicalAppointmensModal";
import AppoimentRegisterModal from "./components/modals/AppoimentRegisterModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { DATES } from "../../../routes/ApiRoutes";
import Swal from "sweetalert2";
import { Date } from "../../../models/Date";
import useAppoimentRegisterModal from "./states/useAppoimentRegisterModal";
import { FaTrash } from "react-icons/fa6";

const MedicalAppointments = () => {
    
    const { showModal } = useMedicalAppointmensModal();
    const { visible } = useAppoimentRegisterModal();
    const [ dates, setDates ] = useState<Date[]>([]);

    const getData = async()=>{
        try {
            const id = localStorage.getItem('id');
            const resp = await axios.get(DATES+'/Cita/por-paciente/'+id)
            if(resp.status==200){
                setDates(resp.data)
            }
        } catch (error: any) {
            if(error.response.status == "404"){
                setDates([]);
                return;
            }else{
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

    const deleteDate = async(data: Date)=>{
        try {
            const resp = await axios.delete(DATES+'/Cita/'+data.id);
            if(resp.status!=200){
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

    const confirmDeleteDate = async(data: Date)=>{
        Swal.fire({
            title: "Eliminar",
            text: `¿Quieres eliminar la cita ${data.especialidad} del dia ${data.dia.split('T')[0]}?`,
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
        ()=>{
            getData()
        },[visible]
    )

    return (
        <div>
            <MedicalAppointmensModal />
            <AppoimentRegisterModal />
            <Container>
                <Text h2>Citas medicas</Text>
                <Button onPress={showModal}>Nueva cita</Button>
                <Table
                    aria-label="Example table with static content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>Especialidad</Table.Column>
                        <Table.Column>Dia</Table.Column>
                        <Table.Column>Hora</Table.Column>
                        <Table.Column>Estado</Table.Column>
                        <Table.Column>Eliminar</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            dates.map(
                                (item: Date, index: number)=>(
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.especialidad}</Table.Cell>
                                        <Table.Cell>{item.dia.split('T')[0]}</Table.Cell>
                                        <Table.Cell>{item.hora}</Table.Cell>
                                        <Table.Cell>{item.estado}</Table.Cell>
                                        <Table.Cell>
                                            {item.estado=='Confirmada' && <Button auto onPress={()=>confirmDeleteDate(item)} icon={<FaTrash />} color='error'/>}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            )
                        }
                    </Table.Body>
                </Table>
            </Container>
        </div>
    );
};

export default MedicalAppointments;
