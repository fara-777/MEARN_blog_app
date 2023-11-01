# Full-Stack Blog Application

This is a responsive full-stack blog application built using the MEARN (MongoDB, Express.js, React, Node.js) stack. It allows users to create, read, update, and delete blog posts. The application includes features such as user authentication, post management, and responsive design to ensure a seamless user experience on both desktop and mobile devices.

## Features

- User Registration and Authentication: Users can sign up, log in, and manage their accounts.
- Create, Read, Update, and Delete Posts: Users can create new blog posts, edit existing ones, and delete posts they no longer need.
- Tagging System: Posts can be tagged with categories, making it easier for users to filter and find content.
- Responsive Design: The application is optimized for various screen sizes and devices.
- User Profiles: Users have their profiles with avatars, bios, and social links.
- Comments: Users can leave comments on blog posts.
- Search Functionality: Users can search for posts using keywords.

## Technology Stack

- **Frontend:** This project uses [React](https://reactjs.org/) with [Material-UI (MUI)](https://mui.com/) for the user interface. Material-UI is a popular React UI framework that provides a set of well-designed components to ensure a sleek and responsive user experience.

- **Backend:** The server is built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/), providing the API for the frontend.

- **Database:** The application utilizes [MongoDB](https://www.mongodb.com/) as its database, storing posts, user information, and comments.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/fara-777/blogify.git
   ```

- Install server dependencies:
  cd server
  npm install
- Install client dependencies:
  cd client
  npm install

- Set up the MongoDB database:

Create a MongoDB Atlas account (if you don't have one).
Create a database and get the connection URL.
Create a .env file in the server directory and set the following environment variables:

MONGODB_URI=your-mongodb-connection-url

# Start the server (from the server directory)

npm start

# Start the client (from the client directory)

npm start

## screen-shot

 <img src="/client/public/screen-shot.jpg"/>
