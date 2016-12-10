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

function insertMediaFile(data, i, completeCallback) {
    if(i < data.length) {
		let movie = data[i];
		db.find({ absPath: movie.absPath }, function (err, docs) {
		if(docs.length === 0) {
			db.insert(movie, function (err, newDoc) {
				insertMediaFile(data, i+1, completeCallback);
			});
		} else {
			insertMediaFile(data, i+1, completeCallback);
		}
	});
    } else {
        if(typeof completeCallback === "function") {
            completeCallback();
        }
    }
}

exports.insertMediaFile = insertMediaFile;

exports.getAllMediaFiles = (callback) => {
	db.find({}).exec(function (err, docs) {
	  callback(docs);
	});
}

exports.updateMediaFiles = (query, updateVal)=> {
	db.update(query, { $set: updateVal }, { multi : true}, function (err, numReplaced) {
	});
}

exports.updateIMDBData = (idVal, movieData)=> {
	db.update({ _id: idVal }, { $set: movieData }, {}, function (err, numReplaced) {
		console.log("Updated " + numReplaced)
	});
}

exports.removeMediaFiles = () =>{

}
