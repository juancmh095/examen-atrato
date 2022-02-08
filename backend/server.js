const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./db');

const PORT = 5000;


app.get('/', function(req, res){
  res.send('Hello from backend')    
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

var whitelist = ['*'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes('*') || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }  
}

app.use(cors(corsOptions));

app.use('/api', require('./routers/principal.routes'));

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});