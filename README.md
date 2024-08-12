# Task Manager API

A RESTful API for managing lists and tasks using Node.js, Express, and MongoDB.

## Description

This project is an API for creating and managing lists and tasks. The API supports CRUD (Create, Read, Update, Delete) operations on lists and tasks associated with those lists. It is built using Node.js, Express, and MongoDB.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```
   git clone https://github.com/BielQuirino/task-manager.git
   ```
2. **Navigate to the project directory:**

  ```
  cd task-manager 
  ```

3.**Install dependencies:**

```
npm install
```
4.**Configure MongoDB:**

Make sure MongoDB is installed and running at mongodb://localhost:27017/TaskManager. You can change the connection URL in the db/mongoose.js file if necessary.

5.**Usage**
Start the server:

```
npm start
```
### The server will start on port 3000.

### API Endpoints:

## Lists

### GET /lists - Retrieve all lists.
### POST /lists - Create a new list.
### PATCH /lists/:id - Update a specified list by ID.
### DELETE /lists/:id - Delete a specified list by ID.

## Tasks

### GET /lists/:listId/tasks - Retrieve all tasks for a specified list ID.
### GET /lists/:listId/tasks/:taskId - Retrieve a specific task from a list.
### POST /lists/:listId/tasks - Create a new task in a specified list by list ID.
### PATCH /lists/:listId/tasks/:taskId - Update a specific task in a list.
### DELETE /lists/:listId/tasks/:taskId - Delete a specific task from a list.
