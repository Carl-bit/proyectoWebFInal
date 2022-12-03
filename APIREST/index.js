const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./router/router.js'));


app.listen(3000);
console.log('server on port 3000');
