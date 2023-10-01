# Social Network API

## Description

This is a social network API that allows you to interact with user data, thoughts, reactions to thoughts, and friends. You can perform various actions, such as creating, updating, and deleting users and thoughts, as well as creating reactions to thoughts and managing a user's friend list.

## Installation

1. **Clone the Repository**
   git clone https://github.com/shcherbatiuk17/sm-back-end.git
   cd sm-back-end

2. **Install Dependencies**
    Make sure you have Node.js and npm installed. Then, install the required dependencies.
    npm install

3. ** Configure environment variables **
    Create a .env file in the root directory of the project and configure your MongoDB connection string. Here's an example of the contents of the .env file:
    MONGODB_URI=mongodb://localhost:27017/socialMediaDB

4. ** Start application **
    To start the server and sync Mongoose models to the MongoDB database, run:
    'npm start'
    Your server should now be up and running.

## Usage 
Testing API Routes

We recommend using a tool like Insomnia to test the API routes. Below are the expected behaviors for various actions:
GET Routes:
Access /api/users and /api/thoughts in Insomnia.
The data for these routes will be displayed in a formatted JSON response.
POST, PUT, and DELETE Routes:

Test the following actions in Insomnia:
Creating, updating, and deleting users.
Creating, updating, and deleting thoughts.
You should be able to successfully perform these actions and see the changes reflected in your database.
Reactions and Friends:

Test the following actions in Insomnia:
Creating and deleting reactions to thoughts.
Adding and removing friends to a user’s friend list.
These actions should also work as expected.

## License
This project is licensed under the MIT License - see the LICENSE file for details.