import { Button, Container, Table, Text, Tooltip } from "@nextui-org/react";
import useDetailsMedicalHistoryModal from "./states/useDetailsMedicalHistoryModal";
import DetailsMedicalHistoryModal from "./components/modals/DetailsMedicalHistory";
import { useEffect, useState } from "react";
import { DateResponse } from "../../../models/Date";
import axios from "axios";
import { MEDICAL_HISTORIES_API } from "../../../routes/ApiRoutes";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa6";
import { PiStepsDuotone } from "react-icons/pi";

const MedicalStories = () => {

    const { showModal } = useDetailsMedicalHistoryModal();

    const [ dates, setDates ] = useState<DateResponse[]>([]);

    const getData = async()=>{
        try {
            const id = localStorage.getItem('id');
            const resp = await axios.get(MEDICAL_HISTORIES_API + '/MedicalHistories/patient/' + id + '?medicoId=%25&medicoNombre=%25&medicoEspecialidad=%25');
            if(resp.status==200){
                setDates(resp.data)
            }
        } catch (error:any) {
            console.log(error)
            if(error.response.status==400 || error.response.status==404){
                setDates([])
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'Ocurrio un error al cargar las historias',
                    title: 'Error'
                })
            }
        }
    }

    useEffect(
        ()=>{
            getData()
        },[]
    )

    return (
        <Container>
            <DetailsMedicalHistoryModal />
            <Text h2>Historias medicas</Text>
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
                    <Table.Column>FECHA</Table.Column>
                    <Table.Column>ACCIONES</Table.Column>
                </Table.Header>
                <Table.Body>
                    {
                        dates.map((item: DateResponse, index: number)=>(
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {item.medicoNombre ?? 'Sin dato'}
                                </Table.Cell>
                                <Table.Cell>{item.medicoEspecialidad ?? 'Sin dato'}</Table.Cell>
                                <Table.Cell>{item.fechaCreacion.split('T')[0]}</Table.Cell>
                                <Table.Cell>
                                    <Container css={{display: 'flex', gap: '$5'}}>
                                        <Tooltip content='Tratamientos'>
                                            <Button onPress={()=>showModal(item, 'treatments')} auto icon={<FaEye />}/>
                                        </Tooltip>
                                        <Tooltip content='Diagnosticos'>
                                            <Button onPress={()=>showModal(item, 'diagnostics')} auto icon={<FaStethoscope />}/>
                                        </Tooltip>
                                        <Tooltip content='Procedimientos'>
                                            <Button onPress={()=>showModal(item, 'procedures')} auto icon={<PiStepsDuotone />} />
                                        </Tooltip>
                                    </Container>
                                </Table.Cell>

                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Container>
    )
}

export default MedicalStories
