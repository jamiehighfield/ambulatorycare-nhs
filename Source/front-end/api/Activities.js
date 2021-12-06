import { AsyncStorage } from 'react-native';

import Api from './Api';


export default class Activities {
    // Api to send the request for a new activity to the databse 
    static AddActivity = async(name, duration) => {
        console.log("sending name: "+name+" duration: "+duration+" now...")
        // Api to Send Request 
        await Api.PerformRequest('api/v1/add/activity?name='+name+'&duration='+duration, 'POST');
        
    }

    static getAllActivities = async() => {
     let response =  await Api.PerformRequest('api/v1/display/activities', 'GET');
        return response;
    }
}