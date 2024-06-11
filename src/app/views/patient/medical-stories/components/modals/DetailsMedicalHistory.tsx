import { Modal, Text } from "@nextui-org/react"
import useDetailsMedicalHistoryModal from "../../states/useDetailsMedicalHistoryModal";

const DetailsMedicalHistoryModal = () => {

    const { visible, closeModal, id } = useDetailsMedicalHistoryModal();

    return (
        id && <>
            <Modal
                closeButton
                aria-labelledby="modal-recovery"
                open={visible}
                onClose={closeModal}
                blur
            >
                <Modal.Header>
                    <Text>Ingresa tu correo de recuperación</Text>
                </Modal.Header>
                <Modal.Body>
                    {id}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailsMedicalHistoryModal
