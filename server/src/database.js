//Mongo Actualizado Atlas
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI 
            ? process.env.MONGODB_URI
            : 'mongodb://localhost/database';

//Mongo Actualizado Atlas
mongoose.connect(uri, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});