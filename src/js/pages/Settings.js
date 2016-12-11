import React from 'react';
const ipc = require('electron').ipcRenderer

import ScanDirectoryList from '../components/ScanDirectoryList';
import settingsStore from '../store/SettingsStore';
import SettingsActions from '../actions/SettingsActions';

export default class Settings extends React.Component {

    constructor(){
        super();
        this.state = {
            dirs : settingsStore.getMovieDirs()
        }
        this.triggerAddDir          = this.triggerAddDir.bind(this);
        this.getMovieDirs           = this.getMovieDirs.bind(this);
        this.addDirectory           = this.addDirectory.bind(this);
        this.addDirectoryHandler    = this.addDirectoryHandler.bind(this);
    }

    componentWillMount(){
        settingsStore.on("changeDir", this.getMovieDirs);
        ipc.on('selected-directory', this.addDirectoryHandler)
    }

    addDirectoryHandler(event, path){
        this.addDirectory(path);
    }

    componentWillUnmount(){
        settingsStore.removeListener("changeDir", this.getMovieDirs);
        ipc.removeListener('selected-directory', this.addDirectoryHandler);
    }

    addDirectory(path) {
        SettingsActions.addDirectory(path);
    }

    getMovieDirs(){
        this.setState({
            dirs : settingsStore.getMovieDirs()
        });
    }

    triggerAddDir(e) {
        ipc.send('open-file-dialog') 
    }

    render() {
        return (
            <div>
                Settings 
                <ScanDirectoryList onAddDir={this.triggerAddDir.bind(this)} dirs={this.state.dirs}/>  
            </div>
        );
    }
}