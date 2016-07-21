import * as _ from 'lodash';

export module Utils {

    export function startsWith(value, prefix) {
        return 0 === value.indexOf(prefix);
    };

    export function endsWith(str, suffix) {
        if (0 < str.length && 0 < suffix.length) {
            return -1 !== str.indexOf(suffix, str.length - suffix.length);
        }

        return false;
    };

    export function lowercaser(item, excludes?) {
        if (_.isString(item)) {
            return item.toLowerCase();
        } else if (_.isArray(item)) {
            var values = [];
            // Convert everything, even if it was a number (to ensure indexes are the same).
            _.each(item, function (value) {
                values.push(lowercaser(value));
            });
            return values;
        } else if (_.isObject(item)) {
            // Really we want the exludes to be an object of fields, prefixes, suffixes
            if (_.isArray(excludes)) {
                excludes = {
                    fields: excludes
                };
            }

            var keys = _.keys(item);
            _.each(keys, function (key) {
                var i = 0;
                var isExcluded = false;

                if (undefined !== excludes) {
                    if (true !== isExcluded && undefined !== excludes.prefixes) {
                        for (i = 0; i < excludes.prefixes.length; i++) {
                            if (startsWith(key, excludes.prefixes[i])) {
                                isExcluded = true;
                                break;
                            }
                        }
                    }
                    if (true !== isExcluded && undefined !== excludes.suffixes) {
                        for (i = 0; i < excludes.suffixes.length; i++) {
                            if (endsWith(key, excludes.suffixes[i])) {
                                isExcluded = true;
                                break;
                            }
                        }
                    }

                    if (true !== isExcluded && undefined !== excludes.fields) {
                        if (-1 !== _.indexOf(excludes.fields, key, true)) {
                            isExcluded = true;
                        }
                    }
                }

                // We don't want to convert values that are just raw numbers (unless it was in an array)
                if (true !== isExcluded && !_.isNumber(item[key])) {
                    var value = item[key];
                    item[key] = lowercaser(value);
                    item[key + '__RAW'] = value;
                }
            });
        }
        return item;
    };

}