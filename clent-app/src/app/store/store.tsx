// generate a redux store with redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {activitySlice} from "../../features/activities/activitySlice";



const store = configureStore({
    reducer: {
        activities: activitySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;