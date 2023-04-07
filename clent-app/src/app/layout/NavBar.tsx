import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {useAppDispatch} from "../store/store";
import {openForm} from "../../features/activities/activitySlice";
import {NavLink} from "react-router-dom";

function NavBar() {
    
    const dispatch = useAppDispatch();
    
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <Menu.Item as={NavLink} to={'/'} header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/activities'} name="Activities"/>
                <Menu.Item>
                    <Button as={NavLink} to={'/createActivity'} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar;