import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Activity} from "../../app/models/activity";
import agent from "../../app/api/agent";
import {v4 as uuid} from 'uuid';


interface ActivityState {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: boolean;
    initialLoad: boolean;
    loading: boolean;
    status: string
}


const initialState: ActivityState = {
    activities: [],
    selectedActivity: undefined,
    editMode: false,
    initialLoad: true,
    loading: false,
    status: 'idle'
}


export const fetchActivitiesAsync = createAsyncThunk<Activity[]>('activities/fetchActivitiesAsync', async (_, thunkAPI) => {
    try {
        return await agent.Activities.list();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
})


// create activity async thunk
export const createActivityAsync = createAsyncThunk<Activity, Activity>('activities/createActivityAsync', async (activity, thunkAPI) => {
    try {
        activity.id = uuid();
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
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchActivitiesAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchActivitiesAsync.fulfilled, (state, action) => {
                const activityRegistry = new Map<string, Activity>();
                action.payload.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    activityRegistry.set(activity.id, activity);
                });
                state.activities = Array.from(activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
                state.status = 'fulfilled';
                state.initialLoad = false;
            })
            .addCase(fetchActivitiesAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.initialLoad = false;
            })


            .addCase(createActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(createActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loading = false;
                state.editMode = false;
                state.activities = [...state.activities, action.payload];
                state.selectedActivity = action.payload;
            })
            .addCase(createActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })


            .addCase(updateActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(updateActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.activities = [...state.activities.filter(a => a.id !== action.payload.id), action.payload]
                state.selectedActivity = action.payload;
                state.loading = false;
                state.editMode = false;
            })
            .addCase(updateActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })
            
            
            .addCase(deleteActivityAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(deleteActivityAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.activities = [...state.activities.filter(a => a.id !== action.payload)];
                state.loading = false;
            })
            .addCase(deleteActivityAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
            })
    }
});

export const {selectActivity, cancelSelectedActivity, setEditMode, openForm, closeForm} = activitySlice.actions;
