import axios from "axios";
import { create } from "zustand";
import { USERS_API } from "../../../routes/ApiRoutes";
import { User } from "../../../models/User";

interface useLoginProps{
    isLoading: boolean;
    user: User | null;
    login: (values: any)=>Promise<boolean>;
}

export const useLogin = create<useLoginProps>((set: any)=>({
    isLoading: false,
    user: null,
    login: async(values: any) : Promise<any>=>{
        try {
            set({isLoading: true})

            let resp : any;

            if(values.type == 'paciente'){
                resp = await axios.post(USERS_API + '/Users/login', values);
            }else{
                resp = await axios.post(USERS_API + '/Users/medico-data', values);
            }

            set({isLoading: false})
            
            if(resp.status!=200){
                return null;
            }

            if(values.type=='paciente'){
                localStorage.setItem('id', resp.data.patient.id)
                localStorage.setItem('identificationType', resp.data.patient.identificationType)
                localStorage.setItem('identificationNumber', resp.data.patient.identificationNumber)
                localStorage.setItem('firstName', resp.data.patient.firstName) 
                localStorage.setItem('lastName', resp.data.patient.lastName) 
                localStorage.setItem('dateOfBirth', resp.data.patient.dateOfBirth)
                localStorage.setItem('phone', resp.data.patient.phone)
                localStorage.setItem('email', resp.data.patient.email)
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('rol', 'paciente') 
            }else if(values.type=='medico'){
                localStorage.setItem('id', resp.data.medico.id)
                localStorage.setItem('firstName', resp.data.medico.nombre) 
                localStorage.setItem('lastName', '') 
                localStorage.setItem('dateOfBirth', '')
                localStorage.setItem('phone', '')
                localStorage.setItem('identificationType', '')
                localStorage.setItem('identificationNumber', '')
                localStorage.setItem('email', resp.data.medico.correo) 
                localStorage.setItem('speciality', resp.data.medico.especialidad) 
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('rol', 'medico') 
            }            
            
            return resp.data;
            
        } catch (error) {
            set({isLoading: false});
            return null;
        }
    }
}))