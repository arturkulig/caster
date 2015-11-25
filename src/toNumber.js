/**
 * Converts given input to a number.
 * Accepts:
 * -number
 * -string
 * -object
 *
 * @param {number|string|object} input
 * @returns {number}
 */
module.exports = function toNumber(input) {
    if (typeof input === 'number') {
        //eliminate NaN - outputs 0
        return (!!input) ? input : 0;

    } else if (typeof input === 'string') {
        //most freq use case
        //rerun to prevent returning NaN
        var parsed;
        if (input.substr(0, 2) === '0x') {
            parsed = parseInt(input, 16);
        } else if (input.substr(0, 1) === '#') {
            parsed = parseInt(input.substr(1), 16);
        } else if (input.indexOf('.') > 0 || input.indexOf(',') > 0) {
            parsed = parseFloat(input.replace(',', '.'));
        } else {
            parsed = parseInt(input, 10);
        }

        return toNumber(parsed);

    } else if (typeof input === 'object' && typeof input.valueOf === 'function') {
        //valueOf is obligated to return primitive value of undefined type
        //so toNumber needs to rerun to resolve what type of value this primitive value is
        return toNumber(input.valueOf());
    }
    return 0;
};
