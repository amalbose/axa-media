// Database scripts
var Datastore = require("nedb");
const path = require('path')
var fs = require('fs');
var dir = path.join(__dirname, 'data');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var db = new Datastore({ 
    filename: path.join(dir, 'movie.db'), 
    autoload: true 
});

exports.insertMediaFile = (movie,callback) => {
	db.find({ absPath: movie.absPath }, function (err, docs) {
		if(docs.length === 0) {
			db.insert(movie, function (err, newDoc) {
				callback();
			});
		} else {
			callback();
		}
	});
}

exports.getAllMediaFiles = (callback) => {
	db.find({}).exec(function (err, docs) {
	  callback(docs);
	});
}

exports.updateMediaFiles = (query, updateVal)=> {
	db.update(query, { $set: updateVal }, { multi : true}, function (err, numReplaced) {
	});
}

exports.removeMediaFiles = () =>{

}
