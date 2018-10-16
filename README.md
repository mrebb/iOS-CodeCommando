# Code Commando React Native Mobile App
 
### Instructor's super handy mobile app.

**Version**: 1.0 Our first release of the Code Commando Mobile application built using React Native
***


## Table of Contents
* [Team Members](#team-members)
* [Contributors](#contributors)
* [Overview](#overview)
* [Problem Domain](#problem-domain)
* [Technologies Used](#technologies-used)
* [How to Use Our App](#how-to-use-our-app)
    * [Pre-requisites](#pre-requisites)
    * [Post class code](#sample-post-request-to-create-a-new-class-code)

## Team Members
* Madhu Rebbana https://github.com/mrebb | https://www.linkedin.com/in/madhurebbana/
* Michael Lennerblom https://github.com/Lennerblom | https://www.linkedin.com/in/michael-lennerblom/
***

## Overview
This app lets instructor view current class student data, generating random pair of students, select a random single student and generating quiz based on previous lectures.
***


## Problem Domain
Instructors had to visit multiple resources or perform various steps to look up the students database, conducting quiz, selectig a random student for whiteboard problem, generating student pairs for lab assignments and pull current lecture slides/code from Github repo. With this app, instructor just need to pull up the app on mobile and all the data is ready in no time.
***

### Technologies Used
* Javascript
* React.js
* React Native
* Redux
* React Navigation
* Redux thunk
* Node.js
* Express
* MongoDB
* Mongoose
* Material UI
* Expo
* RESTful API
* Heroku
* Jest
* Travis CI
* Basic and Bearer Authentication
* Bcrypt 
* JWT(json web token)

## How to Use Our App

### Pre-requisites
* Create App.json file @ root of the project and insert below JSON & fill GITHUB_CLIENT_ID and SECRET values.
```
{
  "expo": {
    "sdkVersion": "27.0.0",
    "extra":{
      "GITHUB_CLIENT_ID":"xxxxxxxxxxxxxxxxxxxxxx",
      "SECRET":"xxxxxx"
    }
  }
}
```
* Install Expo app on your mobile (#https://docs.expo.io/versions/v30.0.0/workflow/up-and-running)

* Note down your IP address and update it on Heroku for respective env variables as shown below. [Future improvement: Dynamically collecting user IP address and sending IP address up to server so that there is no need to handle below env variables ]
```
iPhone users: IPHONE_MOBILE_CLIENT_URL = 172.xx.0.200:19000
Android users: ANDROID_MOBILE_CLIENT_URL = 172.xx.0.201:19000

```
* On VS code terminal, run below commands
    * npm i [only first time]
    * npm start

* Wait for expo server to start and confirm that you see the same IP address after the server started running

* Make sure you have github account credentials since 'Login with Github' is the only availble login method in this app.

* Note: This step is not required if an admin already added a course for your profile in the backend or you posted a new class using Code commando web application. [ Using the auth token that you received from server, perform POST request by sending classcode so that it shows up in your profile when you signin to the app. ]

#### Sample POST Request to create a new class code

`http://api.commando.ccs.net/api/v1/classes`

Sample POST JSON

``` json

{  "classCode" : "sample-class", 
   "githubRepo" : "https://github.com/xxxxxxxxx/sample-class"
}

```
Sample JSON that is returned.
```
{
    "_id": "5bb6a955b8eb680013471ae0",
    "classCode": "sample-class",
    "githubRepo": "https://github.com/xxxxxxxxx/sample-class",
    "apiLink": "https://api.github.com/repos/xxxxxxxxx/sample-class/contents/",
    "__v": 0
}
```
