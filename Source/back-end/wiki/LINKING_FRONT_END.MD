# Linking the front-end

In order to communicate with the back-end and subsequently, the database, you will need to makena series of HTTP requests, corresponsing to the '@RequestMapping' annotations you have defined in the back-end.

## Getting Started

You should import the API class from the 'api' folder such as below:

    import Api from '../api/Api';

From there, you can use the static async/await methods provided as part of that class, such as below:

    let responseJson = await Api.PerformRequest('my-endpoint-example/endpoint/test', 'GET');
    let responseObj = JSON.parse(responseJson);
    
    // responseObj.firstName.....
    
Note: this must be performed in an async method. If you cannot use this within an async method, you could use the code below instead making use of JavaScript ES6 promises:

    Api.PerformRequest('my-endpoint-example/endpoint/test', 'GET')
        .then((responseJson) => {
            let responseObj = JSON.parse(responseJson);
    
            // responseObj.firstName.....
        });
        
The authentication token as mentioned in 'DEBUGGING_WITH_POSTMAN.MD' is automatically added upon successful authentication.

## Important Configuration

In the directory 'env', in the file called 'default.json', you need to change the property 'ApiHost' to the IP address of your computer in order for Expo on your phone to communicate with your local back-end server.