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
        });
        db.insertMediaFile(this.mediaFiles, 0, callback);
    }

}

module.exports.FileService = FileService;