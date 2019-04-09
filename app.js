const express = require('express');
const parser = require('body-parser');
var cors = require('cors');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const Multer = require('multer');
const imgUpload = require('./apiHelper/imgUpload');
var lib = process.cwd()
var Demo = require(lib + '/models/demo')
var serveStatic = require('serve-static');
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

console.log("We are in node app.js");

const CONNECTION_URL = "mongodb+srv://admin-1:passwordadmin-1@web3-asg2-rk0iv.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "mytravels";
const port = process.env.PORT || 8080;

// const app = express();

// //app.use(cors())
// // app.options('*', cors())

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// serves up static files from the public folder. 
app.use(express.static('client'));
app.use(express.static(path.join(__dirname, '/client/build')));

// setup express middleware
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
require('./routes/users')(app)



var database, collection;
app.use('/uploads', serveStatic(__dirname + '/uploads'));

app.listen(port, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
				console.log("Unable to connect to `" + DATABASE_NAME + "`!");
					throw error;
      }
      database = client.db(DATABASE_NAME);
			collection = database.collection("images");
			dblogins = database.collection("logins");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.post('/add', async function(req, res){
	try{
	let toSave = await collection.insertOne(req.body);
if(toSave){
		res.json({
			success: true,
			message: 'Added successfully'
	});
	}
	else{
		res.status(403).json({
			success: false,
			message: 'Something went wrong'
	});
	}
}
catch {
	console.log("error!!! unable to upload into the mongoDB database");
}
});

app.get("/api/images", (request, response) => {
  collection.find({}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get('/api/users/:id', (req,resp) => {
	dblogins.findOne({id: req.params.id}, (err, data) => {
		if (err) {
			return resp.status(500).send(err);
		} else {
			resp.send(data);
		}
	});
});


app.get("/api/:api/images/", (request, response) => {
	dblogins.find({ apikey: request.params.api}, (err, data) => {
		if(err){
			return response.status(500).send(err);
		} else{
			if(data){
				collection.find({}).toArray((error, result) => {
						if(error) {
								return response.status(500).send(error);
						}
						response.send(result);
				});
			}
		}
	});
});


app.get('/api/images/:id', (req,resp) => {
	//CHECK FOR VALID API HERE!
	collection.findOne({id: req.params.id}, (err, data) => {
		if (err) {
			return resp.status(500).send(err);
		} else {
			resp.send(data);
		}
	});
});

app.post('/api/images/:id', (req,resp) => {
	if(req.body._method){
		collection.findOneAndUpdate({ "_id": ObjectID(req.body._id)}, { $set: {'title': req.body.title, 'description': req.body.description, 'location': {'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'exif':{'make': req.body.make, 'model': req.body.model, 'exposure_time': req.body.exposure, 'aperture': req.body.aperture, 'focal_length': req.body.focal, 'iso': req.body.isoexif} } }, {new: true}, (err, data) => {
			if (err) {
				return resp.status(500).send(err);
			} else {
				resp.redirect('/browse');
			}
		});
	}
	else{
		console.log("inserting new image to the database.... from /api/images");
		console.log(req.body);
		collection.insertOne({'id': request.body.id, 
		'title': req.body.title, 
		'description': req.body.description, 
		'location': {'iso': req.body.iso, 
		'country': req.body.country, 
		'city': req.body.city, 
		'cityCode': req.body.cityCode, 
		'continent': req.body.continent, 
		'latitude': req.body.latitude, 
		'longitude': req.body.logitude}, 
		'user': {'userid': req.body.userid, 
		'picture': {'large': req.body.large, 
		'thumbnail': req.body.thumb}, 
		'firstname': req.body.firstname, 
		'lastname': req.body.lastname}, 
		'exif':{'make': req.body.make, 
		'model': req.body.model, 
		'exposure_time': req.body.exposure_time, 
		'aperture': req.body.aperture, 
		'focal_length': req.body.focal_length, 
		'iso': req.body.iso},
		'filename': req.body.filename, 
		'colors':[{'hex': req.body.colors[0].hex, 'name': req.body.colors[0].name}, 
		{'hex': req.body.colors[1].hex, 'name': req.body.colors[1].name}, 
		{'hex': req.body.colors[2].hex, 'name': req.body.colors[2].name}, 
		{'hex': req.body.colors[3].hex, 'name': req.body.colors[3].name}, 
		{'hex': req.body.colors[4].hex, 'name': req.body.colors[4].name} ] }, 
		(err, data) => {
			if (err) {
				console.log("inserting new image to the database.... failed..");
				return resp.status(500).send(err);
			
			} else {
				console.log("inserting new image to the database.... success!!");
				resp.redirect('/browse');
			}
		});
	}
});

app.put('/api/images/:id', (req,resp) => {
	//CHECK FOR LOGIN HERE!
	//There needs to be ._id includeds I think for this to work for some reason...
	//	collection.findOneAndUpdate({ "_id": ObjectID(req.body._id)}, { $set: {'id': request.body.id, 'title': req.body.title, 'description': req.body.description, 'location': {'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'user': {'userid': req.body.userid, 'picture': {'large': req.body.large, 'thumbnail': req.body.thumb}, 'firstname': req.body.firstname, 'lastname': req.body.lastname}, 'exif':{'make': req.body.make, 'model': req.body.model, 'exposure_time': req.body.exposure, 'aperture': req.body.aperture, 'focal_length': req.body.focal, 'iso': req.body.isoexif},'filename': req.body.filename, 'colors':[{'hex': req.body.hex1, 'name': req.body.name1}, {'hex': req.body.hex2, 'name': req.body.name2}, {'hex': req.body.hex3, 'name': req.body.name3}, {'hex': req.body.hex4, 'name': req.body.name4}, {'hex': req.body.hex5, 'name': req.body.name5} ] } }, {new: true}, (err, data) => {
	collection.findOneAndUpdate({ "_id": ObjectID(req.body._id)}, {
		 $set: {'title': req.body.title, 
		 'description': req.body.description, 
		 'location': {'iso': req.body.iso, 
		 'country': req.body.country, 
		 'city': req.body.city, 
		 'cityCode': req.body.cityCode, 
		 'continent': req.body.continent, 
		 'latitude': req.body.latitude, 
		 'longitude': req.body.logitude}, 
		 'exif':{'make': req.body.make, 
		 'model': req.body.model, 
		 'exposure_time': req.body.exposure, 
		 'aperture': req.body.aperture, 
		 'focal_length': req.body.focal, 
		 'iso': req.body.isoexif} } }, 
		 {new: true}, (err, data) => {
		if (err) {
			return resp.status(500).send(err);
		} else {
			resp.send(data);
		}
	});
	//If this does not work we can use .delete() then .insert()
});

app.post('/api/upload', multer.single('image'), imgUpload.uploadToGcs, function (req,resp) {
	//Check for login
	const data = req.body;
	 if (req.file && req.file.cloudStoragePublicUrl) {
		data.imageUrl = req.file.cloudStoragePublicUrl;
		}
	resp.send(data);
});

	app.get('/getAllData', async function(req, res){
		try{
		let allData = await Demo.find({});
		console.log(allData);
		res.send(allData);
		}
		catch(e){
			console.log(e)
		}
	})

	var apiPath = "http://localhost:" + port + "/";
	
	var storage = Multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './uploads')
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname)
		}
	});
	var upload = Multer({storage: storage}).single('avatar');
	

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const gcStorage = new Storage();
const bucketName = 'web3-assignment2-photos';

app.post('/profile', function (req, res) {
		upload(req, res, function(err, result){
			console.log("inserting new image to the google cloud bucket....");
				console.log("uploading to upload folder");
				//upload the file to the local path first
				res.send({path : apiPath + "uploads/" + req.file.originalname})
				const filename = './uploads/' + req.file.originalname;
				const bucketDestination = 'photos/large/'+ req.file.originalname;
				// Upload  local file to the bucket
				gcStorage.bucket(bucketName).upload(filename, {
					destination: bucketDestination,
					gzip: true,
					metadata: {
						cacheControl: 'no-cache, max-age=31536000',
					}
				});
				console.log(`${filename} uploaded to ${bucketName}. bucket`);
})
	})

	app.get('*', (req, res) => {
		console.log("We are in node app.js");
     res.sendFile(path.join(__dirname+'/client/build/index.html'));
	});
