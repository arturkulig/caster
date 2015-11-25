var Caster = {
  toArray(input) {
    if (input instanceof Array) {
      return input;
    } else if (!!input) {
      return [input];
    }
    return [];
  },

  toString(input) {
    var aTry;
    if (typeof input === 'string') {
      return input;
    }
    if (typeof input === 'object' && input.toString) {
      aTry = input.toString();
      if (aTry && aTry !== '[object Object]') {
        return aTry;
      }
    }

    aTry = JSON.stringify(input);
    if (aTry) {
      return aTry;
    }

    return "";
  },

  toNumber(input) {
    //TODO
  },

  toFormData(input) {
    if (typeof input !== 'object') {
      input = Caster.toObject(input);
    }
    var data = new FormData;
    Object.keys(input).forEach(key=> {
      data.append(key, input[key]);
    });
    return data;
  },

  toObject(input) {
    if (typeof input === "string") {
      return {
        toString() {
          return input;
        }
      };
    } else if (typeof input === "number") {
      return {
        valueOf:()=>input,
        toString:()=>Caster.toString(input)
      };
    }
    return input;
  }
};

module.exports = Caster;
