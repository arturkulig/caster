var caster = require('./all.js');

function createValueObject(input) {

    function valueObject() {
    }

    valueObject.prototype.valueOf = ()=>input;
    valueObject.prototype.toString = ()=>caster.toString(input);

    return valueObject;
}

function mapToObject(input) {
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

function toObject(input) {
    var type = typeof input;

    if (type === 'undefined' || input === null) {
        // always cast empty values to empty values of proper type
        return {};
    } else if (type === "object") {
        if (input instanceof Map) {
            return mapToObject(input);
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
