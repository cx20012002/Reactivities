import React, {Fragment} from 'react';
import {Header, Item, Segment} from "semantic-ui-react";
import ActivityListItem from "./ActivityListItem";
import {useAppSelector} from "../../../app/store/store";
import {activityByGroup} from "../activitySlice";


function ActivityList() {
    const {activities} = useAppSelector(state => state.activities);
    const groupedActivities = activityByGroup(activities);    
    
    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color={'teal'}>
                        {group}
                    </Header>
                    <Segment clearing>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem
                                    activity={activity}
                                    key={activity.id}
                                />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
    )
  
}

export default ActivityList;