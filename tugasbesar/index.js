const express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));

app.use(require('./src/routers'));

app.listen(5000, () => {
    console.log('App running on port 5000');
});