require('./handlers/dataConnector.js').connect();
const express = require('express');
const parser = require('body-parser');
const Image = require('./models/Image');
const testRouter = require('./apiRouter.js');
const path = require('path');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// use the route handlers
testRouter.handleAllImages(app, Image);
testRouter.handleSingleImage(app, Image);
testRouter.handleUploadImage(app, Image);


//Static file declaration
app.use(express.static(path.join(__dirname, 'public/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public/build')));
    //
    app.get('*', (req, res) => {
      res.sendfile(path.join(__dirname = 'public/build/index.html'));
    })
}

//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/public/index.html'));
})


app.use(function (req, res, next) {
 res.status(404).send("Sorry can't find that!")
});

let port = 8080;
app.listen(port, function () {
 console.log("Server running at port= " + port);
});