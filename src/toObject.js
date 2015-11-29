var caster = require('./all.js');

function createValueObject(input) {

    function valueObject() {
    }

    valueObject.prototype.valueOf = ()=>input;
    valueObject.prototype.toString = ()=>caster.toString(input);

    return valueObject;
}

function iterableToObject(input) {
    var keys = input.keys();
    var result = {};
    while (true) {
        var nextKey = keys.next();
        if (nextKey.done) {
            break;
        }
        var mapKey = nextKey.value;
        var objectKey = caster.toString(mapKey);
        if (objectKey) {
            result[objectKey] = input.get(mapKey);
        }
    }
    return result;
}

function arrayToObject(input) {
    var result = {};
    for (var i = 0; i < input.length; i++) {
        result[i] = input[i];
    }
    return result;
}

function toObject(input) {
    var type = typeof input;

    if (type === 'undefined' || input === null) {
        // always cast empty values to empty values of proper type
        return {};
    } else if (type === "object") {
        if (input instanceof Map) {
            return iterableToObject(input);
        }
        if (input instanceof Array) {
            return arrayToObject(input);
        }
        // bypass what already is an simple object
        return input;
    } else {
        var valueObject = createValueObject(input);
        return new valueObject();
    }
    return input;
}

module.exports = toObject;
