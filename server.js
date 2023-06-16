const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//pangil route
var route = require('./router');
route(app);

app.listen(3000, () => {
    console.log('server started on port');
});