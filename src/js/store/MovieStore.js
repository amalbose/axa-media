import { EventEmitter} from "events"
var _ = require('lodash');
const path = require('path')

var utils = require("../controllers/utils")
const {FileService} = require('../controllers/fileservice')
const {MediaFile} = require('../controllers/mediafile')
import dispatcher from "../controllers/dispatcher"
import db from '../controllers/db'
import * as MovieActions from '../actions/MovieActions'
import imdb from '../controllers/imdb'

import settingsStore from '../store/SettingsStore';
const {FlowController} = require('../controllers/flowcontroller.js')

class MovieStore extends EventEmitter{

    constructor(){
        super();
        this.mediaFiles          = [];
        this.filter              = "";
        this.loading             = true;
        this.handleActions       = this.handleActions.bind(this);
        this.emitChange          = this.emitChange.bind(this)
        this.pullIMDBData        = this.pullIMDBData.bind(this);
        this.getPoster           = this.getPoster.bind(this);
        this.emitLoadComplete    = this.emitLoadComplete.bind(this);
        this.emitLoadProgress    = this.emitLoadProgress.bind(this);
        this.loadData();
    }

   loadData(){
       let dirs = settingsStore.getMovieDirs();
       let flowCont = new FlowController(dirs.length,this.pullIMDBData);
       dirs.forEach((dir, index) => {
            utils.walk(dir, (err, results) => {
                if (err) throw err;
                db.getAllMediaFiles((movies) => {
                    // loop thorugh all available movies id db
                    // and set its presence as false
                    movies.forEach((movie)=>{
                        if(!utils.fileExists(movie.absPath)) {
                            db.updateMediaFiles({ absPath : movie.absPath}, { moviePresent : false });
                        }
                    });
                    
                    var f = new FileService(results);
                    // get the files from the folder and insert if not present
                    f.insertMediaFiles(()=> {
                        // read all movies and trigger IMDBPull if not available
                        db.getAllMediaFiles((movies) => {
                            if(movies.length > 0)
                                this.mediaFiles = movies;
                            this.emitChange();
                            flowCont.incrementCount();
                        });
                    })
                })
            });
       });
    }

    emitChange(){
        this.emit("change");
    }

    emitLoadComplete(){
        this.emit("LOAD_COMPLETE")
    }

    emitLoadProgress(val){
        let perCent = window.percent = Math.ceil(val*100/this.progressTotal);
        this.emit("LOADING")
    }

    pullIMDBData(){
        // this.emit("LOADING")
        // FIXME add filter to only pull if imdb details not available
        let movieList = this.mediaFiles.filter((mov)=> {return mov.movieDataStatus !="COMPLETED"});
        this.progressTotal = movieList.length;
        let flowCont = new FlowController(movieList.length,this.emitLoadComplete);
        movieList.forEach((movie) => {
            imdb.getImdbDetails(movie.processedFileName, (movieDetails)=>{
                if(movieDetails =='ERROR')
                    flowCont.incrementCount(this.emitLoadProgress);
                else {
                    movie.imdbURL           = movieDetails.imdburl;
                    movie.imdbTitle         = movieDetails.title;
                    movie.imdbYear          = movieDetails.year;
                    movie.imdbActors        = movieDetails.actors;
                    movie.imdbDirector      = movieDetails.director;
                    movie.imdbPlot          = movieDetails.plot;
                    movie.imdbRated         = movieDetails.rated;
                    movie.imdbRating        = movieDetails.rating;
                    movie.imdbGenres        = movieDetails.genres;
                    movie.imdbRuntime       = movieDetails.runtime;
                    movie.imdbImg           = movieDetails.poster;
                    movie.movieDataStatus   = 'COMPLETED'
                    // object to update
                    let updateDetails = {
                        imdbURL         : movieDetails.imdburl,
                        imdbTitle       : movieDetails.title,
                        imdbYear        : movieDetails.year,
                        imdbActors      : movieDetails.actors,
                        imdbDirector    : movieDetails.director,
                        imdbPlot        : movieDetails.plot,
                        imdbRated       : movieDetails.rated,
                        imdbRating      : movieDetails.rating,
                        imdbGenres      : movieDetails.genres,
                        imdbRuntime     : movieDetails.runtime,
                        imdbImg         : movieDetails.poster,
                        movieDataStatus : 'COMPLETED'
                    }
                    this.getPoster(movie._id, movieDetails.poster, movieDetails.imdbid, flowCont)
                    db.updateIMDBData(movie._id,updateDetails)
                    this.emitChange()
                }
            })
        });
    }

    getPoster(movieId, posterUrl, fileName, flowCont){
        var filePath = path.join(__dirname, 'assets/img/'+fileName+'.jpg')
        utils.downloadFile(posterUrl, filePath, (status)=> {
            if(status != 'SUCCESS') {
                filePath = 'assets/default.jpg';
            }
            var curMov = _.find(this.mediaFiles,(mov)=>{return mov._id === movieId});
            curMov.poster = filePath;
            db.updateIMDBData(curMov._id,{ poster : filePath})
            this.emitChange()
            flowCont.incrementCount(this.emitLoadProgress);
        })
        return filePath
    }

    getAll(){
        return this.mediaFiles;
    }

    getFiltered(){
        var matchesFilter = new RegExp(this.filter, "i");
        return this.mediaFiles.filter(movie => !this.filter || 
            (matchesFilter.test(movie.processedFileName) || matchesFilter.test(movie.imdbActors)
            || matchesFilter.test(movie.imdbGenres)));
    }

    handleActions(action){
        switch(action.type) {
            case "FILTER_MOVIES": {
                this.filter = action.query;
                this.emit("change");
                break;
            }
            case "TRIGGER_RELOAD" : {
                this.loadData();
                break;
            }
        }
    }
   
}
var store = new MovieStore();
dispatcher.register(store.handleActions.bind(store));
export default store;