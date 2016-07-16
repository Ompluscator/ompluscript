/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export abstract class GroupConfiguration extends Configuration {
        
        private configurations: Object;
        
        constructor(configurations: Object) {
            super();
            this.configurations = configurations;
        }

        public getErrorsForChildren(definition: Object, key: string = undefined): string[] {
            let errors: string[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                let configuration: Configuration[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    if (Array.isArray(definition[key])) {
                        for (let i: number = 0; i < definition[key].length; i++) {
                            for (let j: number = 0; j < configuration.length; j++) {
                                if (configuration[j].isRelatedTo(definition[key][i])) {
                                    errors.push.apply(errors, configuration[j].getErrors(definition[key][i]));
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let i: number = 0; i < configuration.length; i++) {
                            if (configuration[i].isRelatedTo(definition[key])) {
                                errors.push.apply(errors, configuration[i].getErrors(definition[key]));
                                break;
                            }
                        }
                    }
                }
            }
            return this.filterErrors(errors);
        }

        public createChildren(definition: Object, key: string, creator: Creator = undefined): IBase[] {
            let children: IBase[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                if (definition.hasOwnProperty(key)) {
                    let configuration: Configuration[] = this.configurations[key];
                    for (let i: number = 0; i < definition[key].length; i++) {
                        for (let j: number = 0; j < configuration.length; j++) {
                            if (creator !== undefined && typeof definition[key][i] === "string") {
                                children.push(creator.create(definition[key][i]));
                            } else if (configuration[j].isRelatedTo(definition[key][i])) {
                                children.push(configuration[j].create(definition[key][i]));
                                break;
                            }
                        }
                    }
                }
            }
            return children;
        }

        public createChild(definition: Object, key: string, creator: Creator = undefined): IBase {
            if (creator !== undefined && typeof definition[key] === "string") {
                return creator.create(definition[key]);
            } else if (this.configurations.hasOwnProperty(key)) {
                let configuration: Configuration[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    for (let i: number = 0; i < configuration.length; i++) {
                        if (configuration[i].isRelatedTo(definition[key])) {
                            return configuration[i].create(definition[key]);
                        }
                    }
                }
            }
            return undefined;
        }
    }
}
