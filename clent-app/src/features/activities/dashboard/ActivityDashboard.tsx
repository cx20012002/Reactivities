import React from 'react';
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {useAppSelector} from "../../../app/store/store";

function ActivityDashboard() {
    const {selectedActivity, editMode} = useAppSelector(state => state.activities);
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode &&
                    <ActivityDetails/>}
                {editMode &&
                    <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;