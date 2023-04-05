import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {


    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5148/api/activities').then(response => {
            setActivities(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    
    return (
        <div>
            <h1>Activity List</h1>
            {activities?.map((activity: any) => (
                <div key={activity.id}>{activity.title}</div>
            ))}
        </div>
    );
}

export default App;
