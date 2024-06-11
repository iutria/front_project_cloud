import axios from "axios";
import { create } from "zustand";
import { Patient } from "../../../models/Patient";

interface useCreateAccountProps{
    isLoading: boolean;
    createAccount: (values: Patient)=>Promise<number>
}

export const useCreateAccount = create<useCreateAccountProps>(
    (set: any)=>({
        isLoading: false,
        createAccount: async(values: Patient) : Promise<number>=>{
            try {
                set({isLoading: true});
                values.identificationNumber = values.identificationNumber.toString();
                values.phone = values.phone.toString();
                const resp = await axios.post(
                    import.meta.env.VITE_PATIENT_API + '/Patients', 
                    values
                );
                set({isLoading: false});
                if(resp.status==201){
                    return 201;
                }else{
                    return resp.status;
                }
            } catch (error: any) {
                set({isLoading: false});
                return error?.response?.status;
            }
        }
    })
)