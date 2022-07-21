# GA_Project3_DigitalHealthBooklet

## Introduction of the app
Each child in Singapore receives a physical book for recording child data about growth, vaccinations and medical details of the child. The health digi Health book App provides a digital solution for storing, viewing, editing, and updating this information that can be kept and grow with the child. DigiHealth provides a way to never leave behind your health booklet and displays the data entered to track your childs growth and development

Future Direction:
The developers envisioned the app to be able to find clinics near by, searching by postcode, enable push notifications for upcoming appointments. Future applications may be to include the government (local) specified vaccination scheme and use the digiHealth book to record each child's vaccination history.

## Explanations of the technologies used

The frontend of the project is done using React. For the backend development , a few technologies are used.

1. Express 
Create the routes for the input and retrieval of data from the DB.

2. MongoDB
To store the information for the database of the project.

## General Approach for the project
The project is split up to 2 different job scope, frontend and backend. Two teammates are assigned to do the frontend usign and one does the routes for the backend development. 

After that, it is linked up to provide both the frontend and backend for a full stack development. 

### Frontend Component Model
![Component Model](https://i.ibb.co/tmcCqK9/Screenshot-2022-07-21-at-4-48-26-PM.png)

## Installation instructions for any dependencies

There are a number of dependencies for the project. One of it is Tailwind CSS which designs interface of the webpage. Some  of them are listed below.

1. JsonWebToken 
To carry out the authentication of the users.

2. ChartJs
A library used to draw out charts for the data used in the app.

3. Bcrypt 
For password encryption purposes.

The rest of them are listed below.

    "bcrypt": "^5.0.1",
    "chart.js": "^3.8.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.4.4",
    "react": "^18.2.0",
    "react-chartjs-2": "^4.3.1",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.1.6",
    "uuid": "^8.3.2",

## User stories
User can use digiHealth to :
-Update Logs of child's growth (eg height, weight, headCircumference)
User can use digiHealth to :
-Register an account and login
-View child data
-Update, edit and delete logs and appointments
-Add children to an existing user

## Wire Frames

Some of the images of the app is listed below, showing the features of the app

### Home Page
![App](https://i.ibb.co/JCZqJ64/Screenshot-2022-07-21-at-4-54-49-PM.png)

### Child Data
![Child Data](https://i.ibb.co/VD4G08n/Screenshot-2022-07-21-at-5-11-42-PM.png)

### To edit the Child Data
![Edit Log](https://i.ibb.co/9cXQN3G/Screenshot-2022-07-21-at-5-11-58-PM.png)
![Height Chart](https://i.ibb.co/44zjpC1/Screenshot-2022-07-21-at-5-12-15-PM.png)


## Descriptions of any unsolved problems or major hurdles your team had to overcome

The team stretch goal was not completed there was a problem to retreive the individual postcode from the data. An api (https://apidocs.geoapify.com/) was found to get the coordinates based on the postcode. This feature is still in development and will be updated after. 