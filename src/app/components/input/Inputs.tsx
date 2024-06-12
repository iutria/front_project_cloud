import { Input as ReactInput } from '@nextui-org/react'
import { useFormikContext } from 'formik';

export interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement>{
    disabled?: boolean; 
    type?: string;
    clearable?: boolean;
    label: string;
    field?: keyof T;
}

export const Input = <T, >({ type = 'text', clearable, label, field, disabled, ...rest } : InputProps<T>) => {

    const formik = useFormikContext<T>();

    return (
        <div style={{width: '100%'}}>
            <ReactInput 
                disabled={disabled}
                css={{width: '100%'}}
                type={type} 
                clearable={clearable}
                label={label}
                //@ts-ignore
                color={field && formik.errors[field as string] && 'error'}
                {...rest}
                //@ts-ignore
                value={field && formik.values![field]}
                name={field as string}
                onChange={formik.handleChange}
                //@ts-ignore
                helperText={field && formik.errors![field as string]}
            />
        </div>
    )
}

export const Password = <T, >({ clearable, label, field, ...rest } : InputProps<T>) => {

    const formik = useFormikContext<T>();

    return (
        <div>
            <ReactInput.Password 
                css={{width: '100%'}}
                clearable={clearable}
                label={label}
                //@ts-ignore
                color={field && formik.errors[field as string] && 'error'}
                {...rest}
                //@ts-ignore
                value={field ? formik.values![field] : ''}
                name={field as string}
                onChange={formik.handleChange}
                //@ts-ignore
                helperText={field && formik.errors[field as string]}
            />
        </div>
    )
}
