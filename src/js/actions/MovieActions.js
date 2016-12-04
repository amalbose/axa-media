import dispatcher from "../controllers/dispatcher"

module.exports.loadMovies = ()=>{
    dispatcher.dispatch({
        type : "FETCH_MOVIES" 
    });
    dispatcher.dispatch({
        type : "LOAD_COMPLETE" 
    });
}

module.exports.filterMovies = (query)=>{
    dispatcher.dispatch({
        type : "FILTER_MOVIES",
        query
    });
}