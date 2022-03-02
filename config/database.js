const mongoose = require('mongoose');
const DB_URL = process.env.DATABASE_URL;

mongoose.connect(
  DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err){
  console.log(`Mongodb error: ${err}`)
})