import { AsyncStorage } from 'react-native';

import Api from './Api';

export default class FoodItems {
    //Adding food item to DB
    static AddFoodItem = async(title, amount, description, dateTime) => {
        console.log("Adding " + title + " to DB.....")
        //URL String containing the request parameters
        var apiString = "api/v1/patient/1/add-food?title=" + title + "&amount=" + amount + "&description=" + description + "&dateTime=" + dateTime;
        var apiStringEncoded = encodeURI(apiString);
        await Api.PerformRequest(apiStringEncoded, 'POST');
    }

    // Get all food items for patient
    static GetFoodItems = async() => {
        let responseJson = await Api.PerformRequest("api/v1/patient/1/food-intake", "GET");
        console.log("Response = " + JSON.stringify(responseJson));
        return JSON.stringify(responseJson);
    }
}