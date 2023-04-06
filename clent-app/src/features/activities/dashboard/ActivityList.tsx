import React, {useState} from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {deleteActivityAsync, selectActivity} from "../activitySlice";


function ActivityList() {
    const dispatch = useAppDispatch();
    const {activities, loading} = useAppSelector(state => state.activities);
    const [target, setTarget] = useState('');
    
    function handleActivityDelete(id: string) {
        setTarget(id);
        dispatch(deleteActivityAsync(id));
    }
    
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>dispatch(selectActivity(activity.id))} floated={'right'} content={'View'} color={'blue'}/>
                                <Button 
                                    loading={loading && target === activity.id} 
                                    onClick={() => handleActivityDelete(activity.id)} 
                                    floated={'right'} 
                                    content={'delete'} 
                                    color={'red'}
                                />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList;