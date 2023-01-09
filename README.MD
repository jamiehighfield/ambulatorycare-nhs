This is a copy of the code only - it was originally developed with other developers using a different SCCS.

# Ambulatory Care

This was a University industry project in a team of 5 working for the NHS to create a mobile application to aid cancer patients administering chemotherapy treatment from their home. It allowed for remote monitoring by doctors and other interactions.

## Architecture

There are two projects that must be running in order for the project to run successfully - the front-end and the back-end.

## Getting started for the front-end

You must have NodeJS installed on your computer in order to run the front-end.

1. In the root directory for the project, you should run the command 'npm install'.
2. Once this command completes, open the file '/env/default.json' and modify the IP address entry in that file to match that of your local machine.
3. Run the command 'npm start', and Expo (the software we used to build this project) will open in a new browser Window.
4. Using the Expo Client application on an Apple or Android mobile phone, you can scan the QR code that appears in the lower-left hand corner of the tab that opens, and the project will load on your phone.

Please note that the mobile phone and computer running Expo and the back-end must be on the same network.

The default username and password is 'Dev' and 'Wee'.

## Getting Started for the back-end

Clone the repository to a directory on your computer and import the project into IntelliJ IDEA or another compatible Java IDE. If you are using IntelliJ IDEA, please follow the instructions below:

1. Go to 'View' > 'Tool Windows' > 'Gradle'. The Gradle tool window will open, typically on the right-hand side of the IDE.
2. Under 'Tasks' > 'application', double click on 'bootRun'. This will build and attempt to run the project by initially creating a build configuration. This will fail because specific environment variables relating to the database have not been set.
3. Go to 'Run' > 'Edit Configurations', and then under 'Gradle', ensure '43_team_project [bootRun]' is selected.
4. Next to 'Environment variables', click the folder icon, and add all of the environment variables below. These are important as they control the interaction with the database.

You will need to open the file '/src/main/resources/application.properties' file and modify the entries relating to the database.

- spring.datasource.url
- spring.datasource.username
- spring.datasource.password

These should be updated to reflect your local MySQL server details.

## Creating Routes

Interaction between the front-end project and the back-end project is carried out over HTTP and in most cases, with JSON. Logic should be separated out into separate controllers, depending on their purpose. For example, user authentication should not be mixed with fluid intake, as these are two entirely separate areas of the application, and as such, should be created in different controllers.

Please follow the guidelines below for creating controllers:

- All controllers should carry the file name '[Identifier]Controller.java' and the class name '[Identifier]Controller' and should be written in pascal case (PascalCase).
- All controllers should be created under the 'Controllers' package.
- All controllers should extend the class 'ControllerBase'.
- All controllers should carry the annotation '@Controller'.
- If you wish to access the database in the controller layer (this should almost never be done; however), then you should create a variable without any access modifiers (i.e. not private, not public, etc.) of type 'JdbcTemplate', naming it appropriately. This should be marked with the '@Autowired' annotation.
- In most cases, each route should be marked with the annotation '@RequestMapping("[route]")' and return type 'ModelAndView'. If you intend to return JSON, then it should return the object that you would like to return as JSON. It will automatically be serialised to JSON.

## Service & Repository Layer

Please follow the guidelines below for creating services:

- All services should carry the file name '[Identifier]Service.java' and the class name '[Identifier]Service' and should be written in pascal case (PascalCase).
- All services should be created under the 'Services' package.
- All services should extend the class 'ServiceBase'.
- All services should carry the annotation '@Service'.
- All 'business logic' should be carried out in the service, such as checking for user authorisation. In most cases, no access to the database should be carried out in the service layer - this should be carried out in the repository layer.

Please follow the guidelines below for creating repositories:

- All repositories (implementations) should carry the file name '[Identifier]Repository.java' and the class name '[Identifier]Repository' and should be written in pascal case (PascalCase).
- All repositories (implementations) should be created under the 'Repositories' package.
- All repositories (implementations) should extend the class 'RepositoryBase'.
- All repositories (implementations) should carry the annotation '@Repository'.
- All access to the database should be carried out in the repository (implementation). In most cases, no 'business logic' should be carried out in the service layer - this should be carried out in the repository layer.
- All repositories (implementation) should be created from an interface for that repository, which should carry the file name 'I[Identifier]Repository.java' and the interface name 'I[Identifier]Repository' and should be written in pascal case (PascalCase).
