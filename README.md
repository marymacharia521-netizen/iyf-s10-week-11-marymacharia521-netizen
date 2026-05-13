# Week 11: CommunityHub Database & Authentication API

## Author
- **Name:** Mary Macharia
- **GitHub:** marymacharia521-netizen
- **Date:** March 13, 2026

---

## Project Description

CommunityHub is a backend REST API built with Node.js, Express, MongoDB, and JWT authentication. The project allows users to register, log in, create posts, comment on posts, and access protected routes securely.

This project was created as part of the IYF Weekend Academy Season 10 Week 11 assignment on Database Integration and Authentication.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv
- cors
- Nodemon

---

## Features

### Authentication
- User registration
- User login
- JWT token generation
- Protected routes
- Password hashing with bcryptjs

### Posts
- Create posts
- View all posts
- View single post
- Update posts
- Delete posts

### Comments
- Add comments to posts
- View comments for posts
- Delete comments

### Database
- MongoDB Atlas integration
- Mongoose schemas and models
- Relationships between users, posts, and comments

---

## Project Structure

```bash
iyf-s10-week-11-marymacharia521/
│
├── README.md
├── package.json
├── .gitignore
├── .env
├── server.js
│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postsController.js
│   │   └── commentsController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   │
│   └── routes/
│       ├── auth.js
│       ├── posts.js
│       └── comments.js
