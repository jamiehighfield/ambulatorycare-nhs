import { AsyncStorage } from 'react-native';
import Message from '../ui/Message';
import CurrentEnvironment from '../configuration/CurrentEnvironment';
import base64 from 'react-native-base64';

export default class Api {
    
    //Perform a standard request to the API that is authorised.
    static PerformRequest = async(url, method) => {
        let jwtToken = null;
        
        await AsyncStorage.getItem('authenticationToken')
            .then((value) => jwtToken = value)
            .catch((error) => {
                Message.ShowOkMessage('Unknown Error', 'An error occurred when attempting to perform this request. The error provided was: ' + error, () => { });
            });

        //If no authorisation record can be found, return null.
        if(jwtToken == null) {
            return null;
        }
        
        //Perform the request.
        return await (await Api.PerformAuthorisedRequest(url, method, jwtToken, { })).json();
    }

    //Perform a request with a body that contains Params to the API that is authorised.
    static PerformRequestWithBody = async(url, method, body) => {
        let jwtToken = null;
        
        await AsyncStorage.getItem('authenticationToken')
            .then((value) => jwtToken = value)
            .catch((error) => {
                Message.ShowOkMessage('Unknown Error', 'An error occurred when attempting to perform this request. The error provided was: ' + error, () => { });
            });

        //If no authorisation record can be found, return null.
        if(jwtToken == null) {
            //Perform the request.
            return await (await Api.PerformAnonymousRequest(url, method, body)).json();
        } else {
            //Perform the request.
            return await (await Api.PerformAuthorisedRequest(url, method, jwtToken, body)).json();
        }
    }

    //Authenticate to the API; this is accessed using the wrapper method CurrentUser.SignIn.
    static Authenticate = async(username, password) => {
        if (username == null || password == null) {
            return false;
        }

        let existingJwtToken = null;
        
        //Check if the user is already authenticated. Assuming correct code, the user should never get to this point
        //if they are already signed in, but this is just a fail safe.
        await AsyncStorage.getItem('authenticationToken')
            .then((value) => existingJwtToken = value);
        
        if (existingJwtToken != null) {
            return false;
        }

        let existingUserIdentity = null;
        
        //Check if the user is already authenticated. Assuming correct code, the user should never get to this point
        //if they are already signed in, but this is just a fail safe.
        await AsyncStorage.getItem('userIdentity')
            .then((value) => existingUserIdentity = value);

        if (existingUserIdentity != null) {
            return false;
        }

        let existingPatientIdentity = null;
        
        //Check if the user is already authenticated. Assuming correct code, the user should never get to this point
        //if they are already signed in, but this is just a fail safe.
        await AsyncStorage.getItem('patientIdentity')
            .then((value) => existingPatientIdentity = value);

        if (existingPatientIdentity != null) {
            return false;
        }

        let jwtToken = null;

        //Check if running in development mode.
        if (true === false) {
            if (!(username == 'username' && password == 'password')) {
                return false;
            }

            jwtToken = '';
        } else {
            //Perform initial login.
            let response = await Api.PerformAnonymousRequest('login', 'POST', {
                username: username,
                password: password
            });

            //If username and password are incorrect, then the status code will not be 200, return null.
            if(response == null || response.status != 200) {
                return false;
            }

            //Get the JWT token.
            jwtToken = response.headers.get('Authorization');

            if (jwtToken == null) {
                return false;
            }
        }

        let userIdentity = null;
        let patientIdentity = null;

        //Check if running in development mode.
        if (true === false) {
            userIdentity = {
                username: 'username',
                firstName: 'Test',
                lastName: 'Name',
                emailAddress: 'test@test.com'
            }
        } else {
            //Get push notification token that was previously saved on device setup.
            let pushNotificationToken = await AsyncStorage.getItem('unique_token');
            
            //Use the JWT token to perform an authorised request to the API to get user information.
            userIdentity = await (await Api.PerformAuthorisedRequest('api/v1/authentication/user', 'GET', jwtToken, { })).json();
            patientIdentity = await (await Api.PerformAuthorisedRequest('api/v1/authentication/patient', 'GET', jwtToken, { })).json();
            
            //Register for push notifications.

            //Get a Base64 encoded string representation of the unique token.
            if (pushNotificationToken != null) {
                let encodedPushNotificationToken = base64.encode(pushNotificationToken);
    
                await Api.PerformAuthorisedRequest('api/v1/account/push-notifications-register?push_notification_token=' + encodedPushNotificationToken, 'GET', jwtToken, { });
            }
        }

        //Store the JWT token and user identity in AsyncStorage.
        await AsyncStorage.setItem('authenticationToken', jwtToken);
        await AsyncStorage.setItem('userIdentity', JSON.stringify(userIdentity));
        await AsyncStorage.setItem('patientIdentity', JSON.stringify(patientIdentity));
        
        return true;
    }

    //This method is used to perform a request where the user isn't required to authenticate with the API.
    //Namely, this is used for the initial authentication.
    static PerformAnonymousRequest = async(url, method, body) => {
        if (method === 'POST') {
            return await fetch('http://' + CurrentEnvironment.GetCurrentEnvironment().ApiHost + ':' + CurrentEnvironment.GetCurrentEnvironment().ApiHostPort + '/' + url, {
                method: method,
                headers: { 
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gIFwicGFzc3dvcmRcIiA6IG51bGwsXG4gIFwidXNlcm5hbWVcIiA6IFwiRGV2XCIsXG4gIFwiYXV0aG9yaXRpZXNcIiA6IFsgXSxcbiAgXCJhY2NvdW50Tm9uRXhwaXJlZFwiIDogdHJ1ZSxcbiAgXCJhY2NvdW50Tm9uTG9ja2VkXCIgOiB0cnVlLFxuICBcImNyZWRlbnRpYWxzTm9uRXhwaXJlZFwiIDogdHJ1ZSxcbiAgXCJlbmFibGVkXCIgOiB0cnVlLFxuICBcInVzZXJJZGVudGl0eVwiIDoge1xuICAgIFwiaWRcIiA6IDEsXG4gICAgXCJ1c2VybmFtZVwiIDogXCJEZXZcIixcbiAgICBcImZpcnN0TmFtZVwiIDogXCJEZXYyXCIsXG4gICAgXCJsYXN0TmFtZVwiIDogXCJUZWFtXCIsXG4gICAgXCJlbWFpbEFkZHJlc3NcIiA6IFwidGVhbUBkZXYuY28udWtcIixcbiAgICBcInBhdGllbnRJZFwiIDogMVxuICB9XG59IiwiZXhwIjoxNTU1Mjc0MDUzfQ.9xZir0YWYll1gkL1rNmun_WjJmhXtDuhmvrlPxu4CM3GRVQ4C6T2tkUlPnxP4MlqFzHHKUzKpW9IvGF9UZseIw'
                },
                body: JSON.stringify(body)});
        } else {
            return await fetch('http://' + CurrentEnvironment.GetCurrentEnvironment().ApiHost + ':' + CurrentEnvironment.GetCurrentEnvironment().ApiHostPort + '/' + url, {
                method: method,
                headers: { 
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gIFwicGFzc3dvcmRcIiA6IG51bGwsXG4gIFwidXNlcm5hbWVcIiA6IFwiRGV2XCIsXG4gIFwiYXV0aG9yaXRpZXNcIiA6IFsgXSxcbiAgXCJhY2NvdW50Tm9uRXhwaXJlZFwiIDogdHJ1ZSxcbiAgXCJhY2NvdW50Tm9uTG9ja2VkXCIgOiB0cnVlLFxuICBcImNyZWRlbnRpYWxzTm9uRXhwaXJlZFwiIDogdHJ1ZSxcbiAgXCJlbmFibGVkXCIgOiB0cnVlLFxuICBcInVzZXJJZGVudGl0eVwiIDoge1xuICAgIFwiaWRcIiA6IDEsXG4gICAgXCJ1c2VybmFtZVwiIDogXCJEZXZcIixcbiAgICBcImZpcnN0TmFtZVwiIDogXCJEZXYyXCIsXG4gICAgXCJsYXN0TmFtZVwiIDogXCJUZWFtXCIsXG4gICAgXCJlbWFpbEFkZHJlc3NcIiA6IFwidGVhbUBkZXYuY28udWtcIixcbiAgICBcInBhdGllbnRJZFwiIDogMVxuICB9XG59IiwiZXhwIjoxNTU1Mjc0MDUzfQ.9xZir0YWYll1gkL1rNmun_WjJmhXtDuhmvrlPxu4CM3GRVQ4C6T2tkUlPnxP4MlqFzHHKUzKpW9IvGF9UZseIw'
                }});
        }
    }

    //This method is used to perform a request where the user is required to authenticate with the API.
    static PerformAuthorisedRequest = async(url, method, authorisation, body) => {
        if (method === 'POST') {
            return await fetch('http://' + CurrentEnvironment.GetCurrentEnvironment().ApiHost + ':' + CurrentEnvironment.GetCurrentEnvironment().ApiHostPort + '/' + url, {
                method: method,
                headers: {
                    'Authorization': authorisation //JWT Token
                },
                body: JSON.stringify(body)});
        } else {
            return await fetch('http://' + CurrentEnvironment.GetCurrentEnvironment().ApiHost + ':' + CurrentEnvironment.GetCurrentEnvironment().ApiHostPort + '/' + url, {
                method: method,
                headers: {
                    'Authorization': authorisation //JWT Token
                }});
        }
    }
}