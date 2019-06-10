const lr = require('read-line-file')

const gcodeRegex = /^([GMT])([0-9]{1,3}|[0-5a-z])(\s[A-Z][0-9.]+)*/
const separator = ' = '
const maxSegments = 2

var lineNum = 0;
var results = {};
var comments = [];
var bedTemps = [];
var nozzleTemps = [];
var toolsUsed = {
    'tool_changes': 0,
    'manual_select': 0,
    'default': 0,
    'extruduer_0': 0,
    'extruduer_1': 0,
    'extruduer_2': 0,
    'extruduer_3': 0,
    'extruduer_4': 0
}

function gcodeParse(line){
    var match = gcodeRegex.exec(line)
    if(match){
        switch (match[1]) {
            case 'T':
                toolsUsed.tool_changes ++
                switch(match[2]){
                    case "0":
                        toolsUsed.extruduer_0 ++
                        break
                    case "1":
                        toolsUsed.extruduer_1 ++
                        break
                    case "2":
                        toolsUsed.extruduer_2 ++
                        break
                    case "3":
                        toolsUsed.extruduer_3 ++
                        break
                    case "4":
                        toolsUsed.extruduer_4 ++
                        break
                    default:
                        toolsUsed.manual_select = 1
                        break;
                }
                break;
            case 'M':
                switch (match[2]) {
                    case "104":
                        nozzleTemps.push(match[3].replace(/ *S/, ""))
                        break;
                    case "140":
                        bedTemps.push(match[3].replace(/ *S/, ""))
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }
}

function onLine(line){
    lineNum++;

    if(line == "" || line == "; "){
        return;
    
    }
    if(!line.startsWith("; ")){
        gcodeParse(line)
        return;
    }

    line = line.substring(2);
    if(line.indexOf(separator) == -1){
        comments.push(line)
        return;
    }
    result = line.split(separator, maxSegments)

    results[result[0]] = result[1]
}

function onClose(){
    results["Comments"] = comments
    results["ToolsUsed"] = toolsUsed
    results["NozzleTemperatures"] = nozzleTemps
    results["BedTemperatures"] = bedTemps
    //console.log(results)
    cb(results)
}

function onErr(){
    throw new Error('Error parsing file: ' + fileToParse + ' line: ' + lineNum)
}

function cb (){}

function parse (fileToParse, callback){
    cb = callback
    lr(fileToParse, [], onLine, onClose, onErr)
}

module.exports = parse
