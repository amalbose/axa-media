const path = require('path')
const fs = require('fs')
const _ = require('lodash');

const utils = require('./utils')

class MediaFile {
    
    constructor(_absPath){
        this.MAX_DOTS_FOR_YIFY_FORMAT = 3
        this.movieDataStatus = 'NOT_STARTED'
        this.absPath = _absPath
        this.processFiles()
    }

    processFiles(){
        this.isValidFile = utils.fileExists(this.absPath)
        this.parent = path.resolve(this.absPath, '..')
        this.fileName = utils.getFileName(this.absPath)
        this.processedFileName = this.cleanFileName(this.fileName)
        this.fileSize = utils.getFileSize(this.absPath)
        this.fileExtn
        this.collectMovieData();
    }

    cleanFileName(fileName){
        var parts = fileName.split('.')
        var noOfDots = parts.length - 1;
        var cleanedFileName = _.slice(parts, 0, noOfDots).join(' ').replace(/[-_.]/g,' ')
        if((noOfDots > this.MAX_DOTS_FOR_YIFY_FORMAT) && !/axxo/.test(fileName.toLowerCase())) {
            // YIFY Format
            var i = _.findLastIndex(parts, function(o) { return /^(19|20)\d{2}$/.test(o) });
            if(i > 1) {
                cleanedFileName = _.slice(parts, 0, i).join(' ')
            } else if (i = 1) {
                if(!/(19|20)\d{2}/.test(fileName)) {
                    i = _.findIndex(parts, function(o) { return /(^x\d*$)|(rip$)|(\d*p)/.test(o) });
                    cleanedFileName = _.slice(parts, 0, i).join(' ')
                } else {
                    cleanedFileName = _.slice(parts, 0, i).join(' ')
                }                
            }
        } else if (/(\[|\()(19|20)\d{2}(\]|\))/.test(fileName)){
            //aXXo format
            cleanedFileName = _.split(fileName, /(\[|\()(19|20)\d{2}(\]|\))/, 1)[0]
        } else if (/(19|20)\d{2}/.test(fileName)){
            cleanedFileName = _.split(fileName, /(19|20)\d{2}/, 1)[0].replace(/[-_.]/g,' ')
        }
        return cleanedFileName.trim()
    }

    collectMovieData(){
        this.movieDataStatus = 'IN_PROGRESS'

        this.movieDataStatus = 'AVAILABLE'
    }
}

module.exports.MediaFile = MediaFile;