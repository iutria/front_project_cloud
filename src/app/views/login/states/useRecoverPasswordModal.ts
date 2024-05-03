import { create } from "zustand";

interface useRecoverPasswordModalProps{
    visible: boolean;
    showModal: ()=>void;
    closeModal: ()=>void;
}

const useRecoverPasswordModal = create<useRecoverPasswordModalProps>((set)=>({
    visible: false,
    showModal: ()=>set({visible: true}),
    closeModal: ()=>set({visible: false})
}))

export default useRecoverPasswordModal;