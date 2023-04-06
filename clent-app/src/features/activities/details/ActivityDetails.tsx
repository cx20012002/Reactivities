import React from 'react';
import {Button, Card, Image} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {cancelSelectedActivity, openForm} from "../activitySlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";

function ActivityDetails() {
    
    const {selectedActivity: activity} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();
    
    if (!activity) return <LoadingComponent/>;
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => dispatch(openForm({id: activity.id}))} basic color='blue' content='Edit'/>
                    <Button onClick={() => dispatch(cancelSelectedActivity())} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails;