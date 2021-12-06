# Solution Architecture

## Problem

It may be obvious for the mobile application (React Native front project) to directly access the database using SQL queries. There are a number of problems with this approach:

- You should never expose a database directly to the open Internet; it should be behind a secure API.
- Someone could decompile the application and get the authentication credentials needed for the database and then have complete, unrestricted access to the database, rather than securely through a secure API with limited, controlled access.
	- As a result of this, you would need to revoke the appropriate authentication credentials, but since everyone's download of the application will use the same credentials, once you revoke it, everyone's application will stop working and an update will need to be issued, where the same problem can happen again.

## Solution

The solution to this problem is to have two separate parts to the application, the front-end (React Native front project), which already exists, and a web-based back-end project, listening for HTTP requests, that will typically communicate back and forth with JSON strings.

So, instead of running the SQL command from the React Native project as below:

    SELECT PK_id, first_name, last_name FROM users WHERE PK_id = 100;

You could instead query the HTTP URL from the React Native project as below:

 > http://api.application-url.com/users/get-users?id=100

Which would return a JSON string of users that could be interpreted in the same way that the results of a raw SQL query would.

The URL above would reflect a @RequestMapping (in Spring Boot) that would then in turn run the SQL query above. This then solves the two problems above:

- The database would no longer need to be exposed to the Internet, it would only need to be on the same network or otherwise accessible to where the back-end project is being hosted.
- No authentication details are needed to be stored in the React Native front project as this is handled securely through the API.

In order to stop anyone accessing the API URL above, you would need to implement a form of authentication and authorisation on the API layer, much in the same way that you would have for an ordinary web application.

The @RequestMapping that reflects the URL above can then check:

- That the client sending the request has previously authenticated (authentication), and
- that the user that the client has authenticated with has the appropriate access necessary to perform that request (authorisation).