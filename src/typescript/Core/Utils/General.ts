

module Ompluscript.Core.Utils {
    "use strict";

    export class General {

        public static throwControlledException(errorType: Function, classType: Function, objectName: string, code: number): void {
            let object: Object = {
                classType: classType.constructor.toString(),
                code: code,
                objectName: objectName,
            };
            let error: Error = Object.create(errorType.prototype);
            error.constructor.call(error, JSON.stringify(object));
            throw error;
        }

    }
}
