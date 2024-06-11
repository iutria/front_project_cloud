import axios from "axios";
import { create } from "zustand";
import { USERS_API } from "../../../routes/ApiRoutes";

interface useLoginProps{
    isLoading: boolean;
    login: (values: any)=>Promise<boolean>;
}

export const useLogin = create<useLoginProps>((set: any)=>({
    isLoading: false,
    login: async(values: any) : Promise<boolean>=>{

        set({isLoading: true})
        const resp = await axios.post(USERS_API + '/Users/login', values);
        set({isLoading: false})

        console.log(resp)

        return false;
    }
}))