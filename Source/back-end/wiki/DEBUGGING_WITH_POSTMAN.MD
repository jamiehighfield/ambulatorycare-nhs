# Debugging with Postman

## Getting Started

First, ensure that you have installed the Postman Chrome extension and open this.

- All requests made to the back-end over HTTP (other than the login screen) must be an 'authenticated' request. The technicality behind this is that an 'Authorization' header must be sent with each request containing a security token that is analysed by the back-end automatically.
- This 'Authorization' header is automatically added by the front-end API class.
- When debugging with Postman, this must be done manually.

Once the back-end has been started in your IDE, using Postman, create a **POST** request to the following endpoint:

  > localhost:8080/login

Under the 'Body' tab, set the content to be 'Raw' with a value of:

	{
		"username": "Dev",
		"password": "Wee"
	}

Click 'Send', and then after scrolling down, under the response section, under the 'Headers' tab, you should see a response header called 'Authorization', started with a value of 'Bearer ...'. Copy this.

The response authorization header should look something like this:

> Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gIFwicGFzc3dvcmRcIiA6IG51bGwsXG4gIFwidXNlcm5hbWVcIiA6IFwidXNlcm5hbWUxMjNcIixcbiAgXCJhdXRob3JpdGllc1wiIDogWyBdLFxuICBcImFjY291bnROb25FeHBpcmVkXCIgOiB0cnVlLFxuICBcImFjY291bnROb25Mb2NrZWRcIiA6IHRydWUsXG4gIFwiY3JlZGVudGlhbHNOb25FeHBpcmVkXCIgOiB0cnVlLFxuICBcImVuYWJsZWRcIiA6IHRydWUsXG4gIFwidXNlcklkZW50aXR5XCIgOiB7XG4gICAgXCJ1c2VybmFtZVwiIDogXCJ1c2VybmFtZTEyM1wiLFxuICAgIFwiZmlyc3ROYW1lXCIgOiBcIlRlc3RVc2VyXCIsXG4gICAgXCJsYXN0TmFtZVwiIDogXCJMQXN0TmFtZVwiLFxuICAgIFwiZW1haWxBZGRyZXNzXCIgOiBcInNkZnNkZkBmZmRmZy5jb21cIixcbiAgICBcInBhdGllbnRJZFwiIDogMVxuICB9XG59IiwiZXhwIjoxNTUzMjYzODUxfQ.JO5vS7D03KOk_h4msSB-eMfOsM3llDePYJNbNux-dTNWhul4mfBfNHOoxztkSKndLF-JNM7PB6Ft0s1B_gUSLg

## Making Requests

Open a new tab in Postman and structure the request accordingly (e.g. URL, GET or POST request, parameters, etc.), and crucially, under the 'Headers' tab, add a header called 'Authorization' with the value that you just copied. Clicking 'Send' now will correctly authorise the request accordingly.