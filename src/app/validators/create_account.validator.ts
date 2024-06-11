import { Patient } from "../models/Patient";
import { validateEmail } from "../utils/validate_email.util";

export const createAccountValidator = (values: Patient)=>{
    const errors : any = {};
    if(values.identificationType.length==0){
        errors.identificationType = 'Debe seleccionar un tipo de identificación'
    }
    if(values.firstName.length==0){
        errors.firstName = 'Campo requerido'
    }
    if(values.lastName.length==0){
        errors.lastName = 'Campo requerido'
    }
    if(values.phone.length==0){
        errors.phone = 'Campo requerido'
    }
    if(values.identificationNumber.toString().length<8){
        errors.identificationNumber = 'Debe ingresar un número valido'
    }
    if(values.password.length < 8){
        errors.password = 'Debe ingresar una contraseña de minimo 8 caracteres'
    }else if(values.password != values.confirmPassword){
        errors.confirmPassword = 'Las contraseñas no coinciden'
    }
    if(!validateEmail(values.email)){
        errors.email = 'Email no valido'
    }else if(values.email != values.confirmEmail){
        errors.confirmEmail = 'Los correos no coinciden'
    }
    return errors;
}