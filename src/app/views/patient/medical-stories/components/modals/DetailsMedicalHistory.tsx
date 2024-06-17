import { Modal, Table, Text } from "@nextui-org/react"
import useDetailsMedicalHistoryModal from "../../states/useDetailsMedicalHistoryModal";
import { useEffect, useState } from "react";
import { Diagnostic } from "../../../../../models/Date";

const DetailsMedicalHistoryModal = () => {

    const { visible, closeModal, date, diagnostic } = useDetailsMedicalHistoryModal();

    const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

    useEffect(
        () => {
            switch (diagnostic) {
                case 'diagnostics': setDiagnostics(date?.diagnostics ?? []); break;
                case 'treatments': setDiagnostics(date?.treatments ?? []); break;
                case 'procedures': setDiagnostics(date?.procedures ?? []); break;
                default: setDiagnostics([]); break;
            }
        }, [diagnostic]
    )

    return (
        date && <>
            <Modal
                closeButton
                aria-labelledby="modal-recovery"
                open={visible}
                onClose={closeModal}
                blur
                fullScreen
            >
                <Modal.Header>
                    <Text h2>Historial</Text>
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
                            <Table.Column>DESCRIPCIÓN</Table.Column>
                            <Table.Column>FECHA</Table.Column>
                        </Table.Header>
                        <Table.Body>
                           {
                            diagnostics.map((item: Diagnostic, index: number)=>(
                                <Table.Row key={index}>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell>{item.date}</Table.Cell>
                                </Table.Row>
                            ))
                           }
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DetailsMedicalHistoryModal
