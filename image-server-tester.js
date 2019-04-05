require('./handlers/dataConnector.js').connect();
const express = require('express');
const parser = require('body-parser');
const Image = require('./models/Image');
const testRouter = require('./apiRouter.js');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use('/static', express.static('public'));

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// use the route handlers
testRouter.handleAllImages(app, Image);
testRouter.handleSingleImage(app, Image);
testRouter.handleUploadImage(app, Image);

app.use(function (req, res, next) {
 res.status(404).send("Sorry can't find that!")
});

let port = 8080;
app.listen(port, function () {
 console.log("Server running at port= " + port);
});