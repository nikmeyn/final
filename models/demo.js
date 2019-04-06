var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var demo = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  image: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('demo', demo);
