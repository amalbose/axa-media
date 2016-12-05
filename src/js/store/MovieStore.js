import { EventEmitter} from "events"
var utils = require("../controllers/utils")
const {FileService} = require('../controllers/fileservice')
const {MediaFile} = require('../controllers/mediafile')
import dispatcher from "../controllers/dispatcher"
import db from '../controllers/db'

class MovieStore extends EventEmitter{

    constructor(){
        super();
        this.mediaFiles = [];
        this.filter = "";
        this.loading = true;
        this.loadData();
        this.handleActions = this.handleActions.bind(this);
        this.emitChange = this.emitChange.bind(this)
    }

   loadData(){
        utils.walk('/media/amalbose/D/Movies/', (err, results) => {
            if (err) throw err;
            db.getAllMediaFiles((movies) => {
                movies.forEach((movie)=>{
                    if(!utils.fileExists(movie.absPath)) {
                        db.updateMediaFiles({}, { moviePresent : false });
                    }
                });
                var f = new FileService(results);
                f.getMediaFiles(()=> {
                    db.getAllMediaFiles((movies) => {
                        if(movies.length > 0)
                            this.mediaFiles = movies;
                        this.emitChange();
                    });
                })
            })
        });
    }

    emitChange(){
        this.emit("change");
    }

    getAll(){
        return this.mediaFiles;
    }

    getFiltered(){
        var matchesFilter = new RegExp(this.filter, "i");
        return this.mediaFiles.filter(movie => !this.filter || matchesFilter.test(movie.processedFileName));
    }

    handleActions(action){
        switch(action.type) {
            case "FILTER_MOVIES": {
                this.filter = action.query;
                this.emit("change");
            }
        }
    }
   
}
var store = new MovieStore();
dispatcher.register(store.handleActions.bind(store));
export default store;