/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    
    export class ErrorConfiguration extends Configuration {

        public isRelatedTo(definition: Object): boolean {
            return true;
        }

        public getErrors(definition: Object, prefix: string): string[] {
            return [prefix + Configuration.IS_WRONG_CONFIGURATION];
        }

        public create(definition: Object): IBase {
            return undefined;
        }
    }
}
