import React, {useEffect} from 'react';
import { Grid} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {useParams} from "react-router-dom";
import {fetchActivityAsync} from "../activitySlice";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

function ActivityDetails() {

    const {selectedActivity: activity, initialLoad} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) dispatch(fetchActivityAsync(id));
    }, [dispatch, id]);

    if (initialLoad || !activity) return <LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity }/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDetails;