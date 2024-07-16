# Developer Social Platform

Developers can register to build and publish their profiles, check other developers' profiles, create posts, and comment on other developers' posts.

## Description

This project is a social platform for developers to register, build and publish their profiles, check other developers' profiles, create posts, and comment on other developers' posts. The platform aims to facilitate communication and collaboration among developers.

## Features

- Register and login for developer accounts
- Build and publish profiles
- View other developers' profiles
- Create posts and comment on other developers' posts
- Secure routes/endpoints to ensure security

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Redux, React Hooks
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Postman

## Installation

Follow these steps to install and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/developer-social-platform.git
   cd developer-social-platform
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Run application on local

npm run dev

## MongoDB Configuration

### Local MongoDB Installation

1. Download and install [MongoDB](https://www.mongodb.com/try/download/community).
2. Start the MongoDB server:
   ```bash
   mongod --dbpath /path/to/your/db
   ```

### Using MongoDB Atlas

1. Register and log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster.
3. Create a database user and note down the username and password.
4. Obtain your connection string, formatted like:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

### Configure Project to Connect to MongoDB

In config/default.json, add the following content:
`config/default.json
    {
        "mongoURL": "",
        "jwtSecret": "",
        "githubClientId": "",
        "githubSecret": ""
    }
    `
