const fs = require('fs')
const path = require('path')
const util = require('util')
const download = require('download');

module.exports.listFiles = (dirName, onContent) => {
    fs.readdir(dirName, (err,files) => {
        if(err)
            console.log("Err  " + err);
        onContent(files);
    });
}

var walk = (dir, done) => {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
            var extn = path.extname(file);
            var extns = ['.avi' , '.mp4'];
            if(extns.indexOf(extn) != -1)
                results.push(file);
          next();
        }
      });
    })();
  });
};

module.exports.walk = walk;

/**
 * Returns the file name without extension
 */
module.exports.getFileName = (fullPath) => {
    return fullPath.replace(/^.*[\\\/]/, '');
}

module.exports.getFileSize = (fileName) => {
  return fs.statSync(fileName).size;
}

module.exports.fileExists = (filePath) => {
  return fs.existsSync(filePath);
}

module.exports.countOccurences = (str, pattern) => {
  return (str.split(pattern).length - 1);
}

module.exports.downloadFile = (url, fileName, callback) => {
  download(url).then(data => {
      fs.writeFileSync(fileName, data);
      callback('SUCCESS');
  }).catch((e)=>{
    callback('FAILURE')
  });
}