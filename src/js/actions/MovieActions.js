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

module.exports.triggerIMDBLoad = ()=>{
    dispatcher.dispatch({
        type : "TRIGGER_IMDB_FETCH" 
    });
}