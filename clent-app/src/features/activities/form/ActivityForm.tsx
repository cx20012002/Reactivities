import React, {useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    closeForm: () => void;
    activity: Activity | undefined;
    createOrEdit: (activity: Activity) => void;
}

// initial state of activity


function ActivityForm({closeForm, activity: selectedActivity, createOrEdit}: Props) {
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
        createOrEdit(activity);
    }
    
    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete={'off'}>
                <Form.Input placeholder='Title' onChange={handleInputChange} value={activity.title} name={'title'}/>
                <Form.TextArea rows={2} onChange={handleInputChange} value={activity.description} name={'description'} placeholder='Description'/>
                <Form.Input onChange={handleInputChange} value={activity.category} name={'category'} placeholder='Category'/>
                <Form.Input onChange={handleInputChange} value={activity.date} name={'date'} placeholder='Date'/>
                <Form.Input onChange={handleInputChange} value={activity.city} name={'city'} placeholder='City'/>
                <Form.Input onChange={handleInputChange} value={activity.venue} name={'venue'} placeholder='Venue'/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )

}

export default ActivityForm;