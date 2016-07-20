/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export abstract class GroupConfiguration extends Configuration {
        
        protected configurations: Object;
        
        constructor(configurations: Object) {
            super();
            this.configurations = configurations;
        }

        public getErrorsForChildren(definition: Object, key: string = undefined, creator: Creator = undefined): string[] {
            let errors: string[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                let configuration: {new ()}[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    if (Array.isArray(definition[key])) {
                        for (let i: number = 0; i < definition[key].length; i++) {
                            if (typeof definition[key][i] === "string" && creator !== undefined) {
                                if (!creator.ifDefined(definition[key][i])) {
                                    errors.push(definition[key][i] + Configuration.MUST_BE_DEFINED);
                                }
                            } else {
                                for (let j: number = 0; j < configuration.length; j++) {
                                    if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                        errors.push.apply(
                                            errors, Configuration.getInstance(configuration[j]).getErrors(definition[key][i])
                                        );
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        if (typeof definition[key] === "string" && creator !== undefined) {
                            if (!creator.ifDefined(definition[key])) {
                                errors.push(definition[key] + Configuration.MUST_BE_DEFINED);
                            }
                        } else {
                            for (let i: number = 0; i < configuration.length; i++) {
                                if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                                    errors.push.apply(errors, Configuration.getInstance(configuration[i]).getErrors(definition[key]));
                                    break;
                                }
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
                    let configuration: {new ()}[] = this.configurations[key];
                    for (let i: number = 0; i < definition[key].length; i++) {
                        if (creator !== undefined && typeof definition[key][i] === "string") {
                            children.push(creator.create(definition[key][i]));
                        } else {
                            for (let j: number = 0; j < configuration.length; j++) {
                                if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                    children.push(Configuration.getInstance(configuration[j]).create(definition[key][i]));
                                    break;
                                }
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
                let configuration: {new ()}[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    for (let i: number = 0; i < configuration.length; i++) {
                        if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                            return Configuration.getInstance(configuration[i]).create(definition[key]);
                        }
                    }
                }
            }
            return undefined;
        }
    }
}
