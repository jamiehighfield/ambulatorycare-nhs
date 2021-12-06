import { AsyncStorage } from 'react-native';

import Api from './Api';

export default class CurrentUser {
    static GetUserIdentity = async () => {
        //Get the user identity JSON found within AsyncStorage.
        let userIdentityJson = await AsyncStorage.getItem('userIdentity');

        //Parse this to a JavaScript object.
        let userIdentity = JSON.parse(userIdentityJson);
        
        return userIdentity;
    }

    static GetPatientIdentity = async () => {
        //Get the patient identity JSON found within AsyncStorage.
        let patientIdentityJson = await AsyncStorage.getItem('patientIdentity');

        //Parse this to a JavaScript object.
        let patientIdentity = JSON.parse(patientIdentityJson);
        
        return patientIdentity;
    }
    
    //This is a wrapper method to the API.Authenticate method.
    static SignIn = async(username, password) => {
        return await Api.Authenticate(username, password);
    }

    //This method removes the 'authenticationToken' and 'userIdentity' AsyncStorage items,
    //therefore, effectively signing the user out as they will be unable to perform any
    //further API requests except signing in.
    static SignOut = async () => {
        await AsyncStorage.removeItem('authenticationToken');
        await AsyncStorage.removeItem('userIdentity');
        await AsyncStorage.removeItem('patientIdentity');
    }
}