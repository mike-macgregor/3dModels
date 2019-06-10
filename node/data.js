const mdb = require('mongodb')
const client = mdb.MongoClient


function connect (connectionString, callback){
    client.connect(connectionString, { useNewUrlParser: true }, (error, client) => {
        if(error){
            callback(err, undefined)
        }
        callback(undefined, client)
    })
}


module.exports = {connect} 