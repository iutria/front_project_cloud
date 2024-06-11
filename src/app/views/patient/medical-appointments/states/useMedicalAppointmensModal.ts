import { create } from "zustand";

interface useMedicalAppointmensModalProps{
    visible: boolean;
    showModal: ()=>void;
    closeModal: ()=>void;
}

const useMedicalAppointmensModal = create<useMedicalAppointmensModalProps>((set)=>({
    visible: false,
    showModal: ()=>set({visible: true}),
    closeModal: ()=>set({visible: false})
}))

export default useMedicalAppointmensModal;