import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {useAppDispatch} from "../store/store";
import {openForm} from "../../features/activities/activitySlice";

function NavBar() {
    
    const dispatch = useAppDispatch();
    
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={()=>dispatch(openForm({}))} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar;