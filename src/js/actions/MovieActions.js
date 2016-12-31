import dispatcher from "../controllers/dispatcher"

module.exports.filterMovies = (query)=>{
    dispatcher.dispatch({
        type : "FILTER_MOVIES",
        query
    });
}

module.exports.triggerReload = ()=>{
    dispatcher.dispatch({
        type : "TRIGGER_RELOAD" 
    });
}