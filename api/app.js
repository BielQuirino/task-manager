const express = require('express');
const app = express();


const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');


//load mongoose models
const { List, Task } = require('./db/models');


// Load middleware
app.use(bodyParser.json());



/*List routes */

/* GET /lists
Get all lists
*/
app.get('/lists', (req, res) => {
    /*Return an array of all the lists in the db */
    List.find({}).then( (lists) => {
        res.send(lists);
    })
} );

/* POST /lists
Create a list
*/

app.post('/lists', (req, res) =>{
    //Create a new list and return the new list with id
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        //Full list doc return
        res.send(listDoc);
    })
});


/* PATH/lists/:id
Update a specified list
*/
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then( () => {
        res.sendStatus(200);
    });
});


/* DELETE/lists/:id
Delete a list
*/
app.delete('/lists/:id', (req, res) => {
    // delete a specified list
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

/*GET /lists/:listId/tasks
Get all tasks
*/

app.get('/lists/:listid/tasks', (req, res) => {
    //return all task in list
    Task.find({
        _listId: req.params.listid
    }).then( (tasks) => {
        res.send(tasks);
    })
})


app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

/* POST /lists/:listId/tasks
Create a new task in a specified by listId
*/

app.post('/lists/:listId/tasks', (req, res) => {
    //Create new task in the list with id
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then( (newTaskDoc) => {
        res.send(newTaskDoc);
    })
})


/* PATCH /lists/:listId/tasks/:taskId
Update a task
*/

app.patch('/lists/:listId/taks/:taskId', (req, res) =>{
    //Update a task by TaskId
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }
    ).then(() => {
        res.sendStatus(200);
    })
})

/* DELETE /lists/:listId/tasks/:taskId 
Delete a task
*/
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then( (removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
})

app.listen(3000, () => {
    console.log("Server running in port 3000");
})