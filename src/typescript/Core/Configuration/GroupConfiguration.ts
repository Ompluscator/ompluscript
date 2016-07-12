/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    export abstract class GroupConfiguration extends Configuration {
        
        private configurations: Configuration[];
        
        private key: string;
        
        constructor(configurations: Configuration[], key: string) {
            super();
            this.configurations = configurations;
            this.key = key;
        }

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = [];
            if (definition.hasOwnProperty(this.key)) {
                for (let i: number = 0; i < definition[this.key].length; i++) {
                    for (let j: number = 0; j < this.configurations.length; j++) {
                        if (this.configurations[j].isRelatedTo(definition[this.key][i])) {
                            errors.push.apply(errors, this.configurations[j].getErrors(definition[this.key][i], prefix));
                            break;
                        }
                    }
                }
            }
            return this.filterErrors(errors);
        }

    }
}
