import { create } from "zustand";
import { DateResponse, DateResponseSpanish } from "../../../../models/Date";

interface useDetailsMedicalHistoryModalProps{
    data: DateResponseSpanish | null;
    diagnostic: string;
    visible: boolean;
    showModal: (diagnostics: DateResponseSpanish)=>void;
    closeModal: ()=>void;
}

const useDetailsMedicalHistoryModal = create<useDetailsMedicalHistoryModalProps>((set)=>({
    data: null,
    diagnostic: '',
    visible: false,
    showModal: (data: DateResponseSpanish)=>set({visible: true, data}),
    closeModal: ()=>set({visible: false, data: null, diagnostic: ''})
}))

export default useDetailsMedicalHistoryModal;