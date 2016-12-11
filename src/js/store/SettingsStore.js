import { EventEmitter} from "events"
const path = require('path')
var _ = require('lodash')
import dispatcher from "../controllers/dispatcher"
import utils from '../controllers/utils';
import * as MovieActions from '../actions/MovieActions'

class SettingsStore extends EventEmitter{
    
    constructor(){
        super();
        this.settingsFile   = path.join(__dirname, 'data/settings.json')
        this.dirs           = [];
        this.handleActions  = this.handleActions.bind(this);
        this.getMovieDirs   = this.getMovieDirs.bind(this);
        this.emitChangeDir  = this.emitChangeDir.bind(this);
        this.loadSettings();
    }

    loadSettings(){
        this.loadDirs();
    }

    getMovieDirs(){
        return this.dirs;
    }

    loadDirs(){
        this.settingsJson = utils.readJsonSync(this.settingsFile);
        this.dirs = this.settingsJson.MEDIA_DIRECTORIES;
        this.emit("changeDir");
    }

    addDirectory(path) {
        if(_.indexOf(this.settingsJson.MEDIA_DIRECTORIES, path) < 0)
            this.settingsJson.MEDIA_DIRECTORIES.push(path)
        this.updateSettings();
    }

    updateSettings() {
        var prettyJSON = JSON.stringify(this.settingsJson, null, 4);
        utils.writeToFile(this.settingsFile, prettyJSON, this.emitChangeDir)
    }

    emitChangeDir(){
        this.emit("changeDir")
        MovieActions.triggerReload();
    }

    handleActions(action){
        switch(action.type) {
            case "ADD_DIRECTORY": {
                this.addDirectory(action.path[0])
                break;
            }
            case "REMOVE_DIRECTORY" : {
                break;
            }
        }
    }
}

var settingsStore = new SettingsStore();
dispatcher.register(settingsStore.handleActions.bind(settingsStore));
export default settingsStore;