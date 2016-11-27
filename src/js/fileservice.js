const utils = require('./utils')
const {MediaFile} = require("./mediafile")

class FileService {
    constructor(_files){
        console.log("Initializing file service")
        this.files = _files
        this.mediaFiles = []
        this.getMediaFiles();
    }

    getMediaFiles(){
        this.files.forEach((filePath)=>{
            this.mediaFiles.push(new MediaFile(filePath))
        });
    }
}

module.exports.FileService = FileService;