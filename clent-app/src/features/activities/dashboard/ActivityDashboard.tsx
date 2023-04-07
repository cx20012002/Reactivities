import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {fetchActivitiesAsync} from "../activitySlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

function ActivityDashboard() {
    const {initialLoad} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchActivitiesAsync());
    }, [dispatch])

    if (initialLoad) return <LoadingComponent content='Loading Activities...'/>;
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={'6'}>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;