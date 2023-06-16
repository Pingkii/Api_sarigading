const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

//parse application
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//pangil route
var route = require('./router');
route(app);

app.listen(8000, () => {
    console.log('server started on port 8000');
});