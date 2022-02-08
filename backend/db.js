const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/prueba';

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(dc => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;