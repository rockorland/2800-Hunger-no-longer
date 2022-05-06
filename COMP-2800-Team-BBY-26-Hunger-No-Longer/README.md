Hunger No Longer
Tell the new developer how to use the GitHub repo to begin working on your web app, including:

1. What does the developer need?
Languages: JavaScript, CSS , HTML
IDEs: Visual Studio Code or Brackets or user preference
Database: Firebase, Firestore Cloud Storage 
Other software: Google Chrome, GitHub, Selenium IDE Chrome Extension 

2. Which 3rd party APIs and frameworks does the developer need to download?
Google APIs (Geolocation API, Maps for JavaScript, Geocoding API, Directions API, Places API, 
Cloud Firestore API

3. Do they need any API keys?
Google API Keys
Firebase Web API key

4. In which order should they install things? Does installation location matter?
Visual Studio Code -> Firebase -> github
Put htmls, css and JavaScript files in separate folders.
Firebase setup js file has be linked to every html file in order to be hosted on Firebase
Create an empty folder for cloning the github repository.

5. Include detailed configuration instructions and any additional notes including passwords to servers, etc.

i) Configuring Firebase:
Register a firebase account
create a project
In project setting, find SDK setup and configuration. Click on the cdn option, copy the from "// Your web app's Firebase configuration" to the end to a seperate js file. Link that js file to every html.
While in the SDK setup and configuration window, copy the first two script link to every html file/
Database collection names needed (volunteer, users,post,comment,charity,businessNews,Business)

ii) Configuring GitHub:
Register a GitHub account
Create a repository
In the settings, go to find manage access, and invite all your teammates as collaborators
Clone the repository to the empty folder you made before.

iii) Configuring Google API
Sign up for google accounts
Go to Google API
Signup for Google API 
Enter billing details 
Create new project 
Add specific APIs needed 
(Geolocation API, Maps for JavaScript, Geocoding API, Directions API, Places API)
Obtain API Key
Insert API Key to map.js files

iv) This project has a roles based system,
be sure to create 3 different types of accounts for testing purposes, (Individual, Charity, Businesses);

6. Include a link to 04b Surprise challenge #2b testing plan you have completed so the new developer can see your testing history and maybe contribute to a minor bug fix!

Test Plan https://docs.google.com/spreadsheets/d/1GBQdnOEdDZPdbczsjLOa77sy7CkpjOfjZwKwD6kH6Vw/edit#gid=394496370  