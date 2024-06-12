import { create } from "zustand";
import { Doctor } from "../../../../models/Doctor";

interface useAppoimentRegisterModalProps<T>{
    visible: boolean;
    showModal: (body: T)=>void;
    closeModal: ()=>void;
    body?: T | null
}

const useAppoimentRegisterModal = create<useAppoimentRegisterModalProps<Doctor>>((set)=>({
    visible: false,
    showModal: (body)=>set({visible: true, body}),
    closeModal: ()=>set({visible: false, body: null})
}))

export default useAppoimentRegisterModal;