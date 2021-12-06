import { AsyncStorage } from 'react-native';

import Api from './Api';

export default class Temperatures {

    // Method to add temperature
    static AddTemperature = async(temperature) => {
        // send data to the database
        await Api.PerformRequest('api/v1/add/temperature?temperature='+temperature, 'POST');
    }
    
    // Method to get temperature
    static getAllTemperatures = async() => {
        let response =  await Api.PerformRequest('api/v1/display/temperatures', 'GET');
           return response;
       }
   }   
