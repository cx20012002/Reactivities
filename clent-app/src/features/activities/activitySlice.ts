import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Activity} from "../../app/models/activity";
import agent from "../../app/api/agent";
import {RootState} from "../../app/store/store";

const activityRegistry = new Map<string, Activity>();

// fetch activities async thunk
export const fetchActivitiesAsync = createAsyncThunk<Activity[]>('activities/fetchActivitiesAsync', async (_, thunkAPI) => {
    try {
        if (activityRegistry.size > 1) return Array.from(activityRegistry.values());
        return await agent.Activities.list();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})

// fetch single activity async thunk
export const fetchActivityAsync = createAsyncThunk<Activity | undefined, string, { state: RootState }>('activities/fetchActivityAsync', async (id, thunkAPI) => {
    try {
        if (activityRegistry.has(id)) return activityRegistry.get(id);
        return await agent.Activities.details(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})

// create activity async thunk
export const createActivityAsync = createAsyncThunk<Activity, Activity>('activities/createActivityAsync', async (activity, thunkAPI) => {
    try {
        await agent.Activities.create(activity);
        return activity;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})

// update activity async thunk
export const updateActivityAsync = createAsyncThunk<Activity, Activity>('activities/updateActivityAsync', async (activity, thunkAPI) => {
    try {
        await agent.Activities.update(activity);
        return activity;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})

// delete activity async thunk
export const deleteActivityAsync = createAsyncThunk<string, string>('activities/deleteActivityAsync', async (id, thunkAPI) => {
    try {
        await agent.Activities.delete(id);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})

interface ActivityState {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: boolean;
    initialLoad: boolean;
    loading: boolean;
    status: string;
}

const initialState: ActivityState = {
    activities: [],
    selectedActivity: undefined,
    editMode: false,
    initialLoad: true,
    loading: false,
    status: 'idle',
}

// sort activities by date
const activityByDate = (activities: Activity[]) => {
    return Array.from(activities.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

// sort activities by group sorted by date
export const activityByGroup = (activities: Activity[]) => {
    const sortedActivities = activityByDate(activities);
    return Object.entries(sortedActivities.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
    }, {} as { [key: string]: Activity[] }));
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState: initialState,
    reducers: {
        selectActivity: (state, action) => {
            state.selectedActivity = state.activities.find(a => a.id === action.payload);
            state.editMode = false;
        },
        cancelSelectedActivity: (state) => {
            state.selectedActivity = undefined;
        },
        setEditMode: (state, action) => {
            state.editMode = action.payload;
        },
        openForm: (state, action) => {
            state.selectedActivity = action.payload.id ? state.selectedActivity : undefined;
            state.editMode = true;
        },
        closeForm: (state) => {
            state.editMode = false;
        },
    },
    extraReducers: builder => {
        builder
            // fetch activities async thunk
            .addCase(fetchActivitiesAsync.pending, (state) => {
                state.status = 'pending';
                state.initialLoad = true;
            })
            .addCase(fetchActivitiesAsync.fulfilled, (state, action) => {
                if (activityRegistry.size > 1) {
                    state.activities = Array.from(activityRegistry.values());
                } else {
                    action.payload.forEach(activity => {
                        activity.date = activity.date.split('T')[0];
                        activityRegistry.set(activity.id, activity);
                    })
                    state.activities = Array.from(activityRegistry.values());
                }
                state.status = 'fulfilled';
                state.initialLoad = false;
            })
            .addCase(fetchActivitiesAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.initialLoad = false;
            })

            // fetch single activity async thunk
            .addCase(fetchActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.initialLoad = true;
            })
            .addCase(fetchActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                if (action.payload) {
                    if (activityRegistry.has(action.payload.id)) {
                        state.selectedActivity = activityRegistry.get(action.payload.id);
                    } else {
                        action.payload.date = action.payload.date.split('T')[0];
                        activityRegistry.set(action.payload.id, action.payload!);
                        state.selectedActivity = action.payload;
                    }
                }
                state.initialLoad = false;
            })
            .addCase(fetchActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.initialLoad = false;
            })

            // create activity async thunk
            .addCase(createActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(createActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loading = false;
                state.editMode = false;
                activityRegistry.set(action.payload.id, action.payload);
                state.activities.push(action.payload);
            })
            .addCase(createActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })

            // update activity async thunk
            .addCase(updateActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(updateActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.activities = [...state.activities.filter(a => a.id !== action.payload.id), action.payload]
                activityRegistry.set(action.payload.id, action.payload);
                state.selectedActivity = action.payload;
                state.loading = false;
                state.editMode = false;
            })
            .addCase(updateActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })

            // delete activity async thunk
            .addCase(deleteActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(deleteActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                activityRegistry.delete(action.payload);
                state.activities = [...state.activities.filter(a => a.id !== action.payload)];
                state.loading = false;
            })
            .addCase(deleteActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })
    }
});

export const {selectActivity, openForm} = activitySlice.actions;
