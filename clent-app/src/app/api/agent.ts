import axios, {AxiosResponse} from "axios";
import {Activity} from "../models/activity";
import {toast} from "react-toastify";
import {router} from "../router/Routes";

// add 2000 ms delay to all requests
axios.defaults.baseURL = "http://localhost:5148/api";

// make sleep function for delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
    await sleep(1000)
    return response;

}, error => {
    const {data, status, config} = error.response;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/notfound');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error('Bad Request');
            }
            break;
        case 401:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/notfound');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

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