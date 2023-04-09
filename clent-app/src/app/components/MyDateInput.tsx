import React from 'react';
import {Control, useController, UseControllerProps} from "react-hook-form";
import {FormField, Label} from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

//Date picker is a third party component, so we need to use the 'as' prop to tell TS that we are using a third party component
interface Props extends UseControllerProps, ReactDatePickerProps {
    control: Control;
    name: string;
}

function MyDateInput(props: Partial<Props>) {
    const {fieldState, field} = useController({
        name: props.name!,
        control: props.control,
        defaultValue: ''
    })
    return (
        <FormField error={!!fieldState.error}>
            <DatePicker
                {...props}
                {...field}
                selected={(field.value && new Date(field.value)) || null}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>
    )
}


export default MyDateInput;