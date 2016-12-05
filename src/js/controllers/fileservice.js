const utils = require('./utils')
const {MediaFile} = require("./mediafile")
import db from './db'

class FileService {
    constructor(_files){
        this.files = _files
        this.mediaFiles = []
    }

    getMediaFiles(callback){
        this.files.forEach((filePath)=>{
            var movie = new MediaFile(filePath);
            this.mediaFiles.push(movie);
            db.insertMediaFile(movie, callback);
        });
    }

}

module.exports.FileService = FileService;