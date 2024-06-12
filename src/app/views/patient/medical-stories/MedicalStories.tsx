import { Container, Table, Text } from "@nextui-org/react"
import useDetailsMedicalHistoryModal from "./states/useDetailsMedicalHistoryModal";
import DetailsMedicalHistoryModal from "./components/modals/DetailsMedicalHistory";

const MedicalStories = () => {

    const { showModal } = useDetailsMedicalHistoryModal();

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
                    <Table.Column>Descripción</Table.Column>
                    <Table.Column>Fecha</Table.Column>
                </Table.Header>
                <Table.Body>
                    <Table.Row key="1">
                        <Table.Cell>
                            Descripcion
                        </Table.Cell>
                        <Table.Cell>Fecha</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    )
}

export default MedicalStories
