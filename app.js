const express = require('express');
const parser = require('body-parser');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const Multer = require('multer');
const imgUpload = require('./apiHelper/imgUpload');


const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

const CONNECTION_URL = "mongodb+srv://admin-1:passwordadmin-1@web3-asg2-rk0iv.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "mytravels";

const app = express();

// serves up static files from the public folder. 
app.use(express.static('client'));
app.use(express.static(path.join(__dirname, 'client/build')));

// setup express middleware
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

var database, collection;

app.listen(8080, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("images");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.get("/api/images", (request, response) => {
  collection.find({}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
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
	//CHECK FOR LOGIN HERE!
	collection.insert({'id': request.params.id, 'title': req.body.title, 'description': req.body.description, 'location': {'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'user': {'userid': req.body.userid, 'pictire': {'large': req.body.large, 'thumbnail': req.body.thumb}, 'firstname': req.body.firstname, 'lastname': req.body.lastname}, 'exif':{'make': req.body.make, 'model': req.body.model, 'exposure_time': req.body.exposure, 'aperture': req.body.aperture, 'focal_length': req.body.focal, 'iso': req.body.isoexif},'filename': req.body.filename, 'colors':[{'hex': req.body.hex1, 'name': req.body.name1}, {'hex': req.body.hex2, 'name': req.body.name2}, {'hex': req.body.hex3, 'name': req.body.name3}, {'hex': req.body.hex4, 'name': req.body.name4}, {'hex': req.body.hex5, 'name': req.body.name5} ] }, (err, data) => {
		if (err) {
			return resp.status(500).send(err);
		} else {
			resp.send(data);
		}
	});
});

app.put('/api/images/:id', (req,resp) => {
	//CHECK FOR LOGIN HERE!
	//There needs to be ._id includeds I think for this to work for some reason...
	collection.findOneAndUpdate({ "_id": ObjectID(req.body._id)}, { $set: {'id': request.body.id, 'title': req.body.title, 'description': req.body.description, 'location': {'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'user': {'userid': req.body.userid, 'pictire': {'large': req.body.large, 'thumbnail': req.body.thumb}, 'firstname': req.body.firstname, 'lastname': req.body.lastname}, 'exif':{'make': req.body.make, 'model': req.body.model, 'exposure_time': req.body.exposure, 'aperture': req.body.aperture, 'focal_length': req.body.focal, 'iso': req.body.isoexif},'filename': req.body.filename, 'colors':[{'hex': req.body.hex1, 'name': req.body.name1}, {'hex': req.body.hex2, 'name': req.body.name2}, {'hex': req.body.hex3, 'name': req.body.name3}, {'hex': req.body.hex4, 'name': req.body.name4}, {'hex': req.body.hex5, 'name': req.body.name5} ] } }, {new: true}, (err, data) => {
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
