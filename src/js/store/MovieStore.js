import { EventEmitter} from "events"
var utils = require("../utils")
const {FileService} = require('../fileservice')
const {MediaFile} = require('../mediafile')
import dispatcher from "../dispatcher"

class MovieStore extends EventEmitter{

    constructor(){
        super();
        this.mediaFiles = [];
        this.filter = "";
        this.loading = true;
        this.loadData();
        this.handleActions = this.handleActions.bind(this);
    }

   loadData(){
        utils.walk('/media/amalbose/D/Movies/', (err, results) => {
            if (err) throw err;
            var f = new FileService(results);
            this.mediaFiles = f.mediaFiles;
            this.emit("change");
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
        switch(action.type) {
            case "FILTER_MOVIES": {
                this.filter = action.query;
                this.emit("change");
            }
        }
    }
   
}
var store = window.store = new MovieStore();
dispatcher.register(store.handleActions.bind(store));
export default store;