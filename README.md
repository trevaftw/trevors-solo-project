# Magic The Gathering Card Collection Tracker

This app is designed for a user to create their own account to track the cards they own in their collection. A user will be a able to 
search for cards on an external API and add them to their collection. On the homepage they will see their cards and the current collection
total. A user is also able to share a link to their collection with others so they can share it with friends to show off what they have for sale or trade. 

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

```
Give examples
```

### Installing

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`m

## Built With

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Authors

* **Trevor Ramlow** -

## Acknowledgments

Thank you to my wonderful instructors at Prime for showing me how to do something as amazing as this.


