function toArray(input) {
    if (input instanceof Array) {
        return input;
    } else if (!!input) {
        return [input];
    }
    return [];
}

function toString(input) {
    if (typeof input === 'string') {
        return input;
    }

    var aTry;

    if (typeof input === 'object' && typeof input.toString === 'function') {
        aTry = input.toString();
    }
    if (typeof input === 'object' && typeof input.valueOf === 'function') {
        aTry = input.valueOf();
    }
    if (typeof aTry === 'string' && aTry.substr(0, 7) !== '[object') {
        return aTry;
    }

    aTry = JSON.stringify(input);

    if (aTry) {
        return aTry;
    }

    return "";
}

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
    toNumber: require('./toNumber.js'),
    toFormData,
    toObject
};
