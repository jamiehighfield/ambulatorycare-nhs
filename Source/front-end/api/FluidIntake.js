import Api from './Api';

export default class FluidItems {
    //Adding fluid item to DB
    static AddFluidItem = async(title, dateTime, amount) => {
        console.log("Adding " + title + " to the DB....");
        //URL String containing parameters
        var apiString = "ap/v1/patient/1/add-fluids?title=" + title + "&dateTime=" + dateTime + "&amount=" + amount;
        var apiStringEncoded = encodeURI(apiString);
        await Api.PerformRequest(apiStringEncoded, 'POST');
    }

    //Get all Fluids for Patient
    static GetFluidItems = async() => {
        let responseJson = await Api.PerformRequest("api/v1/patient/1/fluid-intake", "GET");
        //console.log("Fluids: " + JSON.stringify(responseJson));
        return JSON.stringify(responseJson);
    }
}