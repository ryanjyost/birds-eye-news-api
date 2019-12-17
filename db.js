var mongoose = require('mongoose');
var URL = process.env.DB_URL;

mongoose.connect(URL);
const db = mongoose.connection;

mongoose.Promise = global.Promise;

module.exports = db;

