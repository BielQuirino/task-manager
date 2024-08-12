const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API for task management',
      contact: {
        name: 'Gabriel',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

// Load mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: API for managing task lists
 */

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Array of all lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 */
app.get('/lists', (req, res) => {
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 */
app.post('/lists', (req, res) => {
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

/**
 * @swagger
 * /lists/{id}:
 *   patch:
 *     summary: Update a specified list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated list
 */
app.patch('/lists/:id', (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body,
  }).then(() => {
    res.sendStatus(200);
  });
});

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     summary: Delete a specified list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *     responses:
 *       200:
 *         description: The deleted list
 */
app.delete('/lists/:id', (req, res) => {
  List.findOneAndDelete({
    _id: req.params.id,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

/**
 * @swagger
 * /lists/{listId}/tasks:
 *   get:
 *     summary: Get all tasks for a specific list
 *     tags: [Lists, Tasks]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *     responses:
 *       200:
 *         description: Array of tasks for the specified list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   _listId:
 *                     type: string
 */
app.get('/lists/:listid/tasks', (req, res) => {
  Task.find({
    _listId: req.params.listid,
  }).then((tasks) => {
    res.send(tasks);
  });
});

/**
 * @swagger
 * /lists/{listId}/tasks/{taskId}:
 *   get:
 *     summary: Get a specific task from a specific list
 *     tags: [Lists, Tasks]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 _listId:
 *                   type: string
 */
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((task) => {
    res.send(task);
  });
});

/**
 * @swagger
 * /lists/{listId}/tasks:
 *   post:
 *     summary: Create a new task in a specified list
 *     tags: [Lists, Tasks]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created task
 */
app.post('/lists/:listId/tasks', (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

/**
 * @swagger
 * /lists/{listId}/tasks/{taskId}:
 *   patch:
 *     summary: Update a specific task
 *     tags: [Lists, Tasks]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }, {
    $set: req.body,
  }).then(() => {
    res.sendStatus(200);
  });
});

/**
 * @swagger
 * /lists/{listId}/tasks/{taskId}:
 *   delete:
 *     summary: Delete a specific task
 *     tags: [Lists, Tasks]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The list ID
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The deleted task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndDelete({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

// Function to start the server
function startServer() {
    const PORT = 3000;
    return app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app and startServer function
module.exports = { app, startServer };
