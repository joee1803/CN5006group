const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/FootballData';   

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', function(err){console.log("Error occurred during connection"+err);});

db.once('connected', function() {console.log(`Connected to ${MONGO_URI}`); })
