import React, {useEffect, useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {createActivityAsync, fetchActivityAsync, updateActivityAsync} from "../activitySlice";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Activity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';


function ActivityForm() {
    const {loading} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect( () => {
        if (id) dispatch(fetchActivityAsync(id)).then(activity=> setActivity(activity.payload as Activity));
    }, [dispatch, id]);
    


    async function handleSubmit() {
        if (!activity.id){
            activity.id = uuid();
            await dispatch(createActivityAsync(activity));
            navigate(`/activities/${activity.id}`)
        } else {
            await dispatch(updateActivityAsync(activity));
            navigate(`/activities/${activity.id}`)
        }
    }

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
   
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete={'off'}>
                <Form.Input placeholder='Title' onChange={handleInputChange} value={activity.title} name={'title'}/>
                <Form.TextArea rows={2} onChange={handleInputChange} value={activity.description} name={'description'}
                               placeholder='Description'/>
                <Form.Input onChange={handleInputChange} value={activity.category} name={'category'}
                            placeholder='Category'/>
                <Form.Input onChange={handleInputChange} value={activity.date} type={'date'} name={'date'}
                            placeholder='Date'/>
                <Form.Input onChange={handleInputChange} value={activity.city} name={'city'} placeholder='City'/>
                <Form.Input onChange={handleInputChange} value={activity.venue} name={'venue'} placeholder='Venue'/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )

}

export default ActivityForm;