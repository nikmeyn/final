var jwt = require('jsonwebtoken');
var lib = process.cwd()
var config = require(lib + '/config');
var middleware = require(lib + '/middleware');
var Users = require(lib + '/models/User');
const MongoClient = require("mongodb").MongoClient;

//Login Page
module.exports = function(app){
    const CONNECTION_URL = "mongodb+srv://admin-1:passwordadmin-1@web3-asg2-rk0iv.mongodb.net/test?retryWrites=true";
    const DATABASE_NAME = "mytravels";

    var database, collection;

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("User");
    });

app.post('/login',  async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    // let mockedUsername = 'admin@admin.com';
    // let mockedPassword = '123';

    if (username && password) {
        let data = await collection.findOne({email : username});
        //let temp = await collection.insert({email: "btume3@ehow.com", password:"12345"})
        if(data){
        if (username === data.email && password === data.password) {
            let token = jwt.sign({username: username},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    }else{
        res.status(403).json({
            success: false,
            message: 'No user exist with this email id'
        });
    }
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});
}

//module.exports = router;