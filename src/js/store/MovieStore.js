import { EventEmitter} from "events"
var utils = require("../controllers/utils")
const {FileService} = require('../controllers/fileservice')
const {MediaFile} = require('../controllers/mediafile')
import dispatcher from "../controllers/dispatcher"
import db from '../controllers/db'
import * as MovieActions from '../actions/MovieActions'
import imdb from '../controllers/imdb'

class MovieStore extends EventEmitter{

    constructor(){
        super();
        this.mediaFiles = [];
        this.filter = "";
        this.loading = true;
        this.loadData();
        this.handleActions = this.handleActions.bind(this);
        this.emitChange = this.emitChange.bind(this)
        this.triggerIMDBDataPull = this.triggerIMDBDataPull.bind(this)
        this.pullIMDBData = this.pullIMDBData.bind(this);
    }

   loadData(){
        utils.walk('/media/amalbose/D/Movies/', (err, results) => {
            if (err) throw err;
            db.getAllMediaFiles((movies) => {
                movies.forEach((movie)=>{
                    if(!utils.fileExists(movie.absPath)) {
                        db.updateMediaFiles({ absPath : movie.absPath}, { moviePresent : false });
                    }
                });
                var f = new FileService(results);
                f.insertMediaFiles(()=> {
                    db.getAllMediaFiles((movies) => {
                        if(movies.length > 0)
                            this.mediaFiles = movies;
                        this.emitChange();
                        this.triggerIMDBDataPull();
                        //emit load IMDB event
                    });
                })
            })
        });
    }

    emitChange(){
        console.log("emitting chnage...");
        this.emit("change");
    }

    triggerIMDBDataPull(){
        MovieActions.triggerIMDBLoad();
    }

    pullIMDBData(){
        console.log("trigger imdb data pull");
        this.mediaFiles.forEach((movie) => {
            imdb.getImdbDetails(movie.processedFileName, (movieDetails)=>{
                movie.imdbRating = movieDetails.imdbid;
                this.emitChange()
            })
        });
    }

    getAll(){
        return this.mediaFiles;
    }

    getFiltered(){
        var matchesFilter = new RegExp(this.filter, "i");
        return this.mediaFiles.filter(movie => !this.filter || matchesFilter.test(movie.processedFileName));
    }

    handleActions(action){
        console.log("Action")
        console.log(action)
        switch(action.type) {
            case "FILTER_MOVIES": {
                this.filter = action.query;
                this.emit("change");
                break;
            }
            case "TRIGGER_IMDB_FETCH" : {
                this.pullIMDBData();
                // this.emit("change");
                break;
            }
        }
    }
   
}
var store = window.store = new MovieStore();
dispatcher.register(store.handleActions.bind(store));
export default store;