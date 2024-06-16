import { create } from "zustand";
import { DateResponse } from "../../../../models/Date";

interface useDetailsMedicalHistoryModalProps{
    date: DateResponse | null;
    diagnostic: string;
    visible: boolean;
    showModal: (diagnostics: DateResponse, diagnostic: string)=>void;
    closeModal: ()=>void;
}

const useDetailsMedicalHistoryModal = create<useDetailsMedicalHistoryModalProps>((set)=>({
    date: null,
    diagnostic: '',
    visible: false,
    showModal: (date: DateResponse, diagnostic: string)=>set({visible: true, date, diagnostic}),
    closeModal: ()=>set({visible: false, date: null, diagnostic: ''})
}))

export default useDetailsMedicalHistoryModal;