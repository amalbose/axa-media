import React from 'react';
var path = require('path')
var utils = require("./utils")
const {FileService} = require('./fileservice')

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            time: Date(),
            content : [],
            cnt : 1
        }
        this.startTimer();
        this.updateFiles = this.updateFiles.bind(this);
        this.updateField = this.updateField.bind(this);
        this.updateFiles();

        utils.walk('/media/amalbose/D/Movies', (err, results) => {
            console.log("--------------------")
            if (err) throw err;
            console.log(results);
            f  = new FileService(results)
            this.setState ({
                content : results
            })
        });
    }

    updateFiles(){
        var dir = "/media/amalbose/D"
        if(document.getElementById("pathVal"))
            dir = document.getElementById("pathVal").value
            console.log(dir)
        utils.listFiles(dir,(files)=>{
            var modFiles = [".."].concat(files);
            this.updateContent(modFiles)
        });
    }

    updateContent(files) {
        console.log("updating contents "+files)

        this.setState({
            content: files
        })
    }

    startTimer() {
        window.setInterval(() => {
            this.setState({
                time: Date()
            })
        }, 1000)
    }

    updateField(e){
        var val = e.target.innerHTML;
        console.log(val)
        document.getElementById("pathVal").value = path.resolve(document.getElementById("pathVal").value, val);
        console.log("Set value " + document.getElementById("pathVal").value)
        this.updateFiles()
    }

    render() {
        return (
            <div>
                <Header headerProp={this.state.time} />
                <input id="pathVal" onChange={this.updateFiles}/>
                <button onClick={this.updateFiles}>Update</button>
                <ul>
                    {this.state.content.map((name, index)=>{
                    return <li key={ index }>
                    <a href="#" onClick={this.updateField} >{name}</a>
                    </li>;
                  })}
                </ul>
                <div>
                    {this.state.cnt}
                </div>
            </div>
        );
    }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
         </div>
      );
   }
}

export default App;