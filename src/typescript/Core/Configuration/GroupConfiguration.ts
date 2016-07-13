/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    export abstract class GroupConfiguration extends Configuration {
        
        private configurations: Object;
        
        constructor(configurations: Object) {
            super();
            this.configurations = configurations;
        }

        public getErrors(definition: Object, key: string = undefined): string[] {
            let errors: string[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                let configuration: Configuration[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    for (let i: number = 0; i < definition[key].length; i++) {
                        for (let j: number = 0; j < configuration.length; j++) {
                            if (configuration[j].isRelatedTo(definition[key][i])) {
                                errors.push.apply(errors, configuration[j].getErrors(definition[key][i]));
                                break;
                            }
                        }
                    }
                }
            }
            return this.filterErrors(errors);
        }

    }
}
