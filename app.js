const express = require('express');
const mongodb = require('./data/database');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  }
  else {  

app.listen(PORT, () => {console.log(`database is listening and web server running at port ${PORT}`)}); 
}
});