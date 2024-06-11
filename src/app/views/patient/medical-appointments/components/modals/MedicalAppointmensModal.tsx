import { Button, Grid, Input, Modal, Text } from '@nextui-org/react';
import useMedicalAppointmensModal from '../../states/useMedicalAppointmensModal';
import Select from 'react-select'

const MedicalAppointmensModal = () => {
  const { closeModal, visible } = useMedicalAppointmensModal();

  const options = [
    { value: '', label: 'Medicina general' },
    { value: '', label: 'Odontologia' },
    { value: '', label: 'Psicologia' },
  ]

  return (
    <>
      <Modal
        blur
        scroll
        preventClose
        closeButton
        open={visible}
        width={'100%'}
        onClose={closeModal}
        aria-labelledby="modal-recovery"
      >
        <Modal.Header>
          <Text h2>Nueva cita medica</Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={1}>
            <Grid sm={6}>
              <Select
                isClearable
                styles={{
                  container: (base) => ({
                    ...base,
                  }),
                  control: (base) => ({
                    ...base,
                    borderRadius: 10,
                    border: 'none',
                    background: '#f1f3f5'
                  }),
                }}
                placeholder='Tipo de cita'
                options={options}
                className="react-select-container"
              />
            </Grid>
            <Grid sm={6}>
              <Select
                isClearable
                styles={{
                  container: (base) => ({
                    ...base,
                  }),
                  control: (base) => ({
                    ...base,
                    borderRadius: 10,
                    border: 'none',
                    background: '#f1f3f5'
                  }),
                }}
                placeholder='Profesional'
                options={options}
                className="react-select-container"
              />
            </Grid>
            <Grid sm={6}>
              <Input type='datetime-local' clearable css={{ width: '100%' }} label='Fecha y Hora' />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeModal}>
            Cancelar
          </Button>
          <Button auto onPress={closeModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicalAppointmensModal
