import React from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import {useLocation} from "react-router-dom";

function ServerError() {
    const {state} = useLocation();

    return (
        <Container>
            {state?.error ? (
                <>
                    <Header as='h1' content='Server Error'/>
                    <Header sub as={'h5'} color={'red'} content={state.error.message}/>
                    <Segment>
                        <Header as='h4' content={'Stack trace'} color={'teal'}/>
                        <code style={{marginTop: '10px'}}>{state.error.details}</code>
                    </Segment>
                </>
            ) : (
                <Header as='h1' content='Server Error'/>
            )}

        </Container>
    )
}

export default ServerError;