module.exports = function toArray(input) {
    if (input instanceof Array) {
        return input;
    } else if (input !== null && typeof input !== 'undefined') {
        return [input];
    }
    return [];
};
