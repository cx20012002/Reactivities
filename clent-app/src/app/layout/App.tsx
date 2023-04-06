import React, {useEffect} from 'react';
import NavBar from "./NavBar";
import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {Container} from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent";
import {useAppDispatch, useAppSelector} from "../store/store";
import {fetchActivitiesAsync} from "../../features/activities/activitySlice";

function App() {
    const dispatch = useAppDispatch();
    const {initialLoad} = useAppSelector(state => state.activities);

    useEffect(() => {
        dispatch(fetchActivitiesAsync());
    }, [dispatch])

    if (initialLoad) return <LoadingComponent content='Loading Activities...'/>

    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard />
            </Container>
        </>
    );
}

export default App;
