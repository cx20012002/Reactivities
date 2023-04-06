import React, {useEffect, useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {closeForm, createActivityAsync, updateActivityAsync} from "../activitySlice";



function ActivityForm() {
    const {selectedActivity, loading} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();
    
    const initialFormState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialFormState);

    function handleSubmit() {
        activity.id ? dispatch(updateActivityAsync(activity)) : dispatch(createActivityAsync(activity));
    }

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    
    useEffect(() => {
        setActivity(selectedActivity || initialFormState);
    }, [selectedActivity])
    

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
                <Button onClick={() => dispatch(closeForm())} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )

}

export default ActivityForm;