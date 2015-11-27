var toArray = require('./toArray.js'),
    toNumber = require('./toNumber.js'),
    toString = require('./toString.js');


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

function toObject(input) {
    if (typeof input === "string") {
        return {
            toString() {
                return input;
            }
        };
    } else if (typeof input === "number") {
        return {
            valueOf: ()=>input,
            toString: ()=>toString(input)
        };
    }
    return input;
}

module.exports = {
    toArray,
    toString,
    toNumber,
    toFormData,
    toObject
};
