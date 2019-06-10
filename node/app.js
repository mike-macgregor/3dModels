const gcode = require('./gcode')
const data = require('./data')


const testfile = 'testfile2.gcode'
const dbconn = 'mongodb://localhost:27017'
const dbname = 'metafile'

var connection = {}
var metadata = {}
gcode(testfile, (result) => {
    //console.log(result)
    metadata = result;
})

function listResults (err, docs) {
     if (err){}
     console.log(docs)
}

function logErr (err){
    console.log(err);
    break;
}


data.connect(dbconn, (error, client) => {
    if(error){
        console.log(error)
        return
    }
    connection = client
})
