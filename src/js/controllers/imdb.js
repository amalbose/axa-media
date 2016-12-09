const imdb = require('imdb-api');


// Promises!

module.exports.getImdbDetails = (movieName, callback) => {
    imdb.get(movieName)
    .then((res)=> {
        console.log(res)
        callback(res)
    }).catch((err)=>{
        console.log("ERR " + err)
    });
}