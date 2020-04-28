import _cloneDeep from "lodash/cloneDeep";

export class DepositRecordSerializer {
  serialize(record) {
    return record;
  }

  _isNullEquivalent = (obj) => {
    // Identifies null equivalent obj
    if (obj === null) {
      return true;
    } else if (Array.isArray(obj)) {
      return obj.every(this._isNullEquivalent);
    } else if (typeof obj == "object") {
      return Object.values(obj).every(this._isNullEquivalent);
    } else {
      return false;
    }
  };

  stripNullEquivalentFields(obj) {
    // Returns Object with top-level null equivalent fields stripped
    const result = {};

    for (const key of Object.keys(obj)) {
      if (!this._isNullEquivalent(obj[key])) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  deserialize(record) {
    return this.stripNullEquivalentFields(record);
  }
}
