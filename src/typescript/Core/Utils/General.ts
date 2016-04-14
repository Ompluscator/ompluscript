

module Ompluscript.Core.Utils {
    "use strict";

    export class General {
        
        public static ERROR_WRONG_CONFIGURATION: number = 1;

        public static throwConfigurationException(classType: Function, variables: Object): void {
            let parameters: Object = {
                classType: classType.constructor.toString(),
                code: General.ERROR_WRONG_CONFIGURATION,
                variables: variables,
            };
            General.throwException(SyntaxError, parameters);
        }

        public static throwControlledException(errorType: Function, classType: Function, objectName: string, code: number): void {
            let parameters: Object = {
                classType: classType.constructor.toString(),
                code: code,
                objectName: objectName,
            };
            General.throwException(errorType, parameters);
        }
        
        private static throwException(errorType: Function, parameters: Object): void {
            let error: Error = Object.create(errorType.prototype);
            error.constructor.call(error, JSON.stringify(parameters));
            throw error;
        }

    }
}
