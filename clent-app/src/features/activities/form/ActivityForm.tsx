import React, {useEffect} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {createActivityAsync, fetchActivityAsync, updateActivityAsync} from "../activitySlice";
import {useNavigate, useParams} from "react-router-dom";
import {Activity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
import {FieldValues, useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import AppTextInput from "../../../app/components/AppTextInput";
import AppTextArea from "../../../app/components/AppTextArea";
import MySelectInput from "../../../app/components/MySelectInput";
import {categoryOptions} from "../../../app/components/options/categoryOptions";
import MyDateInput from "../../../app/components/MyDateInput";


function ActivityForm() {
    const {loading} = useAppSelector(state => state.activities);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required'),
        city: Yup.string().required('City is required'),
        venue: Yup.string().required('Venue is required')
    });

    const {handleSubmit, reset, getValues, formState: {isValid}, control} = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (id) dispatch(fetchActivityAsync(id)).then(activity => {
            reset(activity.payload as Activity);
            
        });
    }, [dispatch, id, reset]);


    async function onSubmit() {
        const activity = getValues() as Activity;
        if (!activity.id) {
            activity.id = uuid();
            await dispatch(createActivityAsync(activity));
            navigate(`/activities/${activity.id}`)

        } else {
            await dispatch(updateActivityAsync(activity));
            navigate(`/activities/${activity.id}`)
        }
        
        console.log(activity)
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <AppTextInput type={'text'} name={'title'} control={control} placeholder={'Title'}/>
                <AppTextArea rows={3} name={'description'} control={control} placeholder={'Description'}/>
                <MySelectInput options={categoryOptions} name={'category'} control={control} placeholder={'Category'}/>
                <MyDateInput name={'date'} control={control} placeholderText={'Date'} showTimeSelect timeCaption={'time'} dateFormat={'MMMM d, yyyy h:mm aa'}/>
                <AppTextInput type={'text'} name={'city'} control={control} placeholder={'City'}/>
                <AppTextInput type={'text'} name={'venue'} control={control} placeholder={'Venue'}/>

                <Button loading={loading} floated={'right'} positive type="submit" content={'Submit'} disabled={!isValid}/>
                <Button onClick={() => navigate('/activities')} floated={'right'} type="button" content={'Cancel'}/>
            </Form>
        </Segment>
    )

}

export default ActivityForm;