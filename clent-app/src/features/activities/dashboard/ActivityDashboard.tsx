import React from 'react';
import {Activity} from "../../../app/models/activity";
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

function ActivityDashboard({activities, selectActivity, selectedActivity, cancelSelectedActivity, openForm, closeForm, editMode, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        selectedActivity={selectedActivity} 
                        cancelSelectedActivity={cancelSelectedActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                <ActivityForm 
                    closeForm={closeForm}
                    activity={selectedActivity}
                    createOrEdit={createOrEdit}
                />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;