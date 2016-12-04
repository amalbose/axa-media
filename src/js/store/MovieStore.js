import { EventEmitter} from "events"
var utils = require("../utils")
const {FileService} = require('../fileservice')
const {MediaFile} = require('../mediafile')
import dispatcher from "../dispatcher"

class MovieStore extends EventEmitter{

    constructor(){
        super();
        this.mediaFiles = []
        this.loading = true;
        this.loadData();
    }

   loadData(){
        utils.walk('/media/amalbose/D/Movies/', (err, results) => {
            if (err) throw err;
            var f = new FileService(results)
            this.mediaFiles = f.mediaFiles;
            this.emit("change")
        });
    }

    getAll(){
        return this.mediaFiles;
    }

    handleActions(action){
        console.log("Action received " + action.type)
        if(action.type=='LOAD_COMPLETE')
        this.loading = false;
    }
   
}
var store = window.store = new MovieStore()
dispatcher.register(store.handleActions.bind(store))
export default store;