import * as _ from 'lodash';

export module Params {

    export function parse(value) {
        // Sanitizes the value (turning into an array if it is comma separated)
        var result = value;
        if (true !== _.isArray(result) && true === _.isString(result) && 0 < result.length) {
            var elements = result.split(',');
            if (0 === elements.length) {
                result = undefined;
            } else if (1 === elements.length) {
                result = elements[0];
            } else {
                result = elements;
            }
        }

        return result;
    };

    export function create(params) {
        return new Params(params);
    }

    export class Params {
        private store: any;

        constructor(params: any) {
            this.store = parse(params);
        }

        public get(key: string) {
            return this.store[key];
        }

        public set(key: string, value: any) {
            this.store[key] = value;
            return value;
        }

        public delete(key: string) {
            delete this.store[key];
        }

        public keys() {
            return _.keysIn(this.store);
        }
    }
}
