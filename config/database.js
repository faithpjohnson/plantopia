const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://faithpjohnson:Holybasil21!@cluster0.9mrmn.mongodb.net/plantopia?retryWrites=true&w=majority", {
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