const utils = require('./utils')
const {MediaFile} = require("./mediafile")

class FileService {
    constructor(_files){
        this.files = _files
        this.mediaFiles = []
        this.getMediaFiles();
    }

    getMediaFiles(){
        this.files.forEach((filePath)=>{
            this.mediaFiles.push(new MediaFile(filePath))
        });
    }

    insertToDB(){
        this.mediaFiles.forEach((item, i)=>{
            console.log(i, item);
        });
    }
}

module.exports.FileService = FileService;