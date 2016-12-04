import dispatcher from "../dispatcher"

module.exports.loadMovies = ()=>{
    dispatcher.dispatch({
        type : "FETCH_MOVIES" 
    })
    dispatcher.dispatch({
        type : "LOAD_COMPLETE" 
    })
}