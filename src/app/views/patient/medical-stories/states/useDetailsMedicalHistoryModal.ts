import { create } from "zustand";

interface useDetailsMedicalHistoryModalProps{
    id: string | null;
    visible: boolean;
    showModal: (id: string)=>void;
    closeModal: ()=>void;
}

const useDetailsMedicalHistoryModal = create<useDetailsMedicalHistoryModalProps>((set)=>({
    id: null,
    visible: false,
    showModal: (id: string)=>set({visible: true, id}),
    closeModal: ()=>set({visible: false, id: null})
}))

export default useDetailsMedicalHistoryModal;