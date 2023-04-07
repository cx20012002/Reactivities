import React from 'react';
import {Message} from "semantic-ui-react";

interface Props {
    errors: string[] | null;
}

function ValidationError({errors}: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationError;