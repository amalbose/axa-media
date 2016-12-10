const imdb = require('imdb-api');


// Promises!

module.exports.getImdbDetails = (movieName, callback) => {
    imdb.get(movieName)
    .then((res)=> {
        callback(res)
    }).catch((err)=>{
    });
}