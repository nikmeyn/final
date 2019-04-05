//Handles GET, POST, and PUT reguest to the server api.
var ObjectID = require('mongodb').ObjectID;
const Multer = require('multer');
const imgUpload = require('./apiHelper/imgUpload');


const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

const handleAllImages = (app, Image) => {
	app.route('/api/images/')
	.get(function (req,resp) {
		//CHECK FOR VALID API HERE!
		Image.find({}, function(err, data) {
			if (err) {
				resp.json({ message: 'Unable to connect to images' });
			} else {
			// return JSON retrieved by Mongo as response
				resp.json(data);
			}
		});
	});
};

const handleSingleImage = (app, Image) => {
	app.route('/api/images/:id')
	.get(function (req,resp) {
		//CHECK FOR VALID API HERE!
		Image.findOne({'id': req.params.id}).exec( (err, data) => {
			if (err) {
				resp.json({ message: 'Image not found' });
			} else {
				resp.json(data);
			}
		});
	})
	.post(function (req,resp) {
		//CHECK FOR LOGIN HERE!
		Image.insert({'id': req.body.id, 'title': req.body.title, 'description': req.body.description, 'location': {'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'user': {'userid': req.body.userid, 'firstname': req.body.firstname, 'lastname': req.body.lastname}, 'filename': req.body.filename }, (err, data) => {
			if (err) {
			resp.json({ message: 'Invalid data, or ID already taken.' });
			} else {
			resp.json({ message: 'Succesful Insertion.' });
			}
		});
	})
	.put(function (req, resp) {
		//CHECK FOR LOGIN HERE!
		//There needs to be ._id includeds I think for this to work for some reason...
		Image.findOneAndUpdate({ "_id": ObjectID(req.body._id)}, { $set: { 'id': req.body.id, 'title': req.body.title, 'description': req.body.description, 'location': { 'iso': req.body.iso, 'country': req.body.country, 'city': req.body.city, 'cityCode': req.body.cityCode, 'continent': req.body.continent, 'latitude': req.body.latitude, 'longitude': req.body.logitude}, 'user': { 'userid': req.body.userid, 'firstname': req.body.firstname, 'lastname': req.body.lastname }, 'filename': req.body.filename } }, {new: true}, (err, data) => {
			if(err){
				resp.json({ message: 'Failed to update!' });
			} else{
				resp.json({ message: 'Succesful update!' });
			}
		});
		//If this does not work we can use .delete() then .insert()
	});
};

const handleUploadImage = (app, Image) => {
	app.route('/api/upload')
	.post(multer.single('image'), imgUpload.uploadToGcs, function (req,resp) {
		//Check for login
		const data = req.body;
		 if (req.file && req.file.cloudStoragePublicUrl) {
			data.imageUrl = req.file.cloudStoragePublicUrl;
			}
		resp.send(data);
	});
};

module.exports = {
 handleAllImages,
 handleSingleImage,
 handleUploadImage
};