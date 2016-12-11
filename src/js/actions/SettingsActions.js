import dispatcher from "../controllers/dispatcher"

module.exports.addDirectory = (path)=>{
    dispatcher.dispatch({
        type : "ADD_DIRECTORY",
        path
    });
}
