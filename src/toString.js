var caster = require('./all.js');

function onlyCustomStringifiers(input) {
    var type = typeof input;
    if (type !== 'undefined' && type !== 'object') {
        // object methods should have return primitive value..
        if (type === 'string') {
            // ..so if it a string already..
            if (input.substr(0, 7) !== '[object') {
                // ..but not this ugly [object CLASSNAME] format
                return input;
            }
        } else {
            // Rerun toString for any other primitive value
            return toString(input);
        }
    }
}

function tryObjectMethod(input, methodName) {
    if (typeof input[methodName] === 'function') {
        return onlyCustomStringifiers(input[methodName]());
    }
}

/**
 * Converts any input to string
 * @param {*} input
 * @returns {string}
 */
function toString(input) {
    var type = typeof input;

    if (type === 'string') {
        //bypass
        return input;
    }
    if (type === 'boolean') {
        // simple
        // i guess user is doing some kind of var dump to use this for boolean
        return input.toString();
    }

    if (!input) {
        //falsey
        if (input === null || input === undefined) {
            return "";
        }
        if (input === 0) {
            return "0";
        }
    }

    var aTry;
    if (input) {
        //truthy
        if (type === 'number') {
            return input.toString();
        }
        if (type === 'object') {
            if (input instanceof Array) {
                if (input.length === 0) {
                    return "";
                } else {
                    return input.map(toString).join(', ')
                }
            } else {
                var objectInput = caster.toObject(input);
                aTry = tryObjectMethod(objectInput, 'toLocaleString');
                if (aTry && typeof aTry === 'string') {
                    return aTry;
                }
                aTry = tryObjectMethod(objectInput, 'toString');
                if (aTry && typeof aTry === 'string') {
                    return aTry;
                }
                aTry = tryObjectMethod(objectInput, 'valueOf');
                if (aTry && typeof aTry === 'string') {
                    return aTry;
                }
            }
        }

        try {
            return JSON.stringify(objectInput, null, "  ");
        } catch (e) {
            return "";
        }
    }

    return "";
}

module.exports = toString;
