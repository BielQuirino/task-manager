// Logic to connect with a mongodb database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager').then(() => {
    console.log("Connected to MongoDB :)");
  }).catch((e) => {
    console.log("Error");
    console.log(e);
  });
  

//mongoose.set('useCreateIndex', true); can't use
//mongoose.set('FindAndModify', false); can't use

module.exports = {
    mongoose
};