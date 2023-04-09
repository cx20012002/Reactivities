import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import {FormField, Label, Select} from "semantic-ui-react";

interface Props extends UseControllerProps {
    placeholder: string;
    options: any;
    name: string;
}
function MySelectInput(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormField error={!!fieldState.error}>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, data) => field.onChange(data.value)}
                onBlur={field.onBlur}
                placeholder={props.placeholder}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>

    )
}

export default MySelectInput;