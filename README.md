# Ricoz Node Developer Assignment

## Usage

### Install dependencies

```
npm install
```

### Run Server

```
npm start
```

## Overview

This repository serves as the backend implementation of a Node.js application, utilizing Express.js, MongoDB, and Mongoose for efficient and secure user authentication. The project is structured to create a robust and organized API, incorporating User Authentication, CRUD Operations and Code Organization endpoints.

## Technologies Used

- **Node.js:** A powerful runtime for server-side JavaScript.
- **Express.js:** A robust web application framework for Node.js.
- **MongoDB:** A NoSQL database utilized for storing user information securely.
- **JSON Web Tokens (JWT):** Ensures secure authentication and session management.
- **Environment Configuration:** Utilizes environment files for managing configuration variables.

## Key Features

1. **User Authentication:**

   - Secure APIs for user authentication, including login, logout, and account deletion.
   - Passwords encrypted using bcrypt.js for enhanced security.
   - JWT-based session management for a secure and scalable authentication system.

2. **MongoDB Model Validation:**
   - Robust validation integrated into MongoDB models for data integrity.
   - Ensures that only valid data is stored, reducing the risk of data inconsistencies.

## Project Structure

- **`models/`:** Houses Mongoose models for User data, ensuring data consistency.
- **`controllers/`:** Defines controllers to handle API logic related to user authentication.
- **`routes/`:** Configures Express Router for routing API requests to the corresponding controllers.
- **`.env`:** Environment file for securely storing configuration variables.
