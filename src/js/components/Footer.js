import React from 'react';
import store from '../store/MovieStore';
import { EventEmitter} from "events"

export default class Footer extends React.Component {

    constructor(){
        super();
        this.state = {
            statusVal   : '',
            percent : 5
        }
        this.startLoading       = this.startLoading.bind(this);   
        this.endLoading         = this.endLoading.bind(this);   
        this.updateStatus       = this.updateStatus.bind(this);   
    }

    componentWillMount(){
        store.on("LOADING", this.startLoading);
        store.on("LOAD_COMPLETE", this.endLoading);
    }

    startLoading(){
        this.updateStatus("Loading");
    }

    endLoading(){
        this.updateStatus("Completed");
    }

    updateStatus(statusVal) {
        this.setState({
            statusVal : statusVal,
            percent
        })
    }

    componentWillUnmount(){
        store.removeListener("LOADING", this.startLoading);
        store.removeListener("LOAD_COMPLETE", this.endLoading);
    }

    render() {
        if(this.state.percent < 5)
            this.state.percent = 5;
        let progressWidth = this.state.percent+"%";
        let footerStatus = '';
        if(this.state.statusVal == 'Loading') {
            footerStatus =  <div id="footerStatus">
                                <div className="progress-bar progress-bar-success active progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: progressWidth}}>
                                    {this.state.statusVal}
                                </div>
                            </div>
        } else {
            footerStatus =  '';
        }
        return (
            <footer className="footer">
                {footerStatus}
            </footer>
        );
    }
}