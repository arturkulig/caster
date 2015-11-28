var toArray = require('./toArray.js'),
    toNumber = require('./toNumber.js'),
    toString = require('./toString.js'),
    toObject = require('./toObject.js'),
    all = require('./all.js');


function toFormData(input) {
    if (typeof input !== 'object') {
        input = toObject(input);
    }
    var data = new FormData;
    Object.keys(input).forEach(key=> {
        data.append(key, input[key]);
    });
    return data;
}

all.toArray = toArray;
all.toNumber = toNumber;
all.toString = toString;
all.toObject = toObject;
all.toFormData = toFormData;

module.exports = all;
