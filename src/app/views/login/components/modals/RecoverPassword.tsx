import { Button, Input, Modal, Text } from '@nextui-org/react';
import useRecoverPasswordModal from '../../states/useRecoverPasswordModal';

const RecoverPassword = () => {
  const { closeModal, visible } = useRecoverPasswordModal();

  return (
    <>
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
          <Input aria-label='email-recovery' width='100%' placeholder="Correo" type='email' />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeModal}>
            Cancelar
          </Button>
          <Button auto onPress={closeModal}>
            Recuperar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecoverPassword
