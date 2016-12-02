// Database scripts
var Datastore = require("nedb");

var db = new Datastore({ 
    filename: path.join(__dirname, 'data/datafile.db'), 
    autoload: true 
});

exports.insertMediaFile = function(data) {
	db.insert(data, function (err) {
		db.find({}, function (err, docs) {
			return docs;
		});
	});
}

exports.getAllMediaFiles = function(callback) {
	db.find({}).exec(function (err, docs) {
	  callback(docs);
	});
}