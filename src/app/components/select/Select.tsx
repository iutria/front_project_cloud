import { Container, Text } from '@nextui-org/react'
import { useFormikContext } from 'formik';
import { useState } from 'react';
import ReactSelect from 'react-select'

export interface Option{
    value: any;
    label: string;
    options?: any;
}

interface SelectProps<T>{
    options: Option[];
    field?: keyof T;
    text: string;
    placeholder?: string;
    isDisabled?: boolean;
}

const Select = <T, >({ options, field, text, placeholder, isDisabled } : SelectProps<T>) => {

    const formik = useFormikContext<T>();

    const [ value, setValue ] = useState<string>('');

    return (
        <Container css={{flexDirection: 'column', padding: '0', margin: '0', }}>
            <Text>{text}</Text>
            <ReactSelect
                isClearable
                isDisabled={isDisabled}
                styles={{
                    container: (base) => ({
                        ...base,
                    }),
                    control: (base) => ({
                        ...base,
                        borderRadius: 10,
                        border: 'none',
                        background: '#f1f3f5',
                    }),
                }}
                placeholder={placeholder}
                //@ts-ignore
                options={options}
                className="react-select-container"
                name={field as string }
                onChange={
                    (value: any)=>{
                        if(field){
                            formik.setFieldValue(field as string, value?.value ?? '');
                            setValue(value);
                        }
                    }
                }
                value={value}
            />
            <Text p css={{fontSize: '10px', marginTop: '5px'}}>
                {
                    //@ts-ignore
                    field && formik.errors[field as string]
                }
            </Text>
        </Container>
    )
}

export default Select
