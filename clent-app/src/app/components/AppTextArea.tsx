import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import {FormField, TextArea} from "semantic-ui-react";

interface Props extends UseControllerProps {
    placeholder?: string;
    rows?: number;
}
function AppTextArea(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormField error={!!fieldState.error}>
            <TextArea
                {...props}
                {...field}
            />
            <p>{fieldState.error?.message}</p>
        </FormField>

    )
}

export default AppTextArea;