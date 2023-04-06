import axios, {AxiosResponse} from "axios";
import {Activity} from "../models/activity";

// add 2000 ms delay to all requests
axios.defaults.baseURL = "http://localhost:5148/api";

// make sleep function for delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000)
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

// axios response body
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// axios requests
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

// activities
const Activities = {
    list: () => requests.get<Activity[]>("/activities"),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>("/activities", activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

// export
const agent = {
    Activities
}

export default agent;