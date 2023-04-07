import React from 'react';
import NavBar from "./NavBar";
import 'semantic-ui-css/semantic.min.css'
import {Container} from "semantic-ui-react";
import {Outlet, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import {ToastContainer} from "react-toastify";

function App() {
    const location = useLocation();

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar theme={"colored"}/>
            {location.pathname === '/' ? <HomePage/> : (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Outlet/>
                    </Container>
                </>
            )}
        </>
    );
}

export default App;
