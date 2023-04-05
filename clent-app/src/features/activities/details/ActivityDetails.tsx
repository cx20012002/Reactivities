import React from 'react';
import {Button, Card, Image} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    selectedActivity: Activity
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
    
}

function ActivityDetails({selectedActivity: activity, cancelSelectedActivity, openForm}: Props) {
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
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => cancelSelectedActivity()} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails;