/// <reference path="Container.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Configuration/BooleanConfiguration.ts" />
/// <reference path="../Configuration/DatetimeConfiguration.ts" />
/// <reference path="../Configuration/MultipleChoiceConfiguration.ts" />
/// <reference path="../Configuration/NumberConfiguration.ts" />
/// <reference path="../Configuration/SingleChoiceConfiguration.ts" />
/// <reference path="../Configuration/StringConfiguration.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import String = Ompluscript.Model.Attribute.String;
    import StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;

    export class Translation extends Container {

        /**
         * @type {string} TYPE_TRANSLATION Translation type.
         */
        public static TYPE_TRANSLATION: string = Translation["name"];

        public static ATTRIBUTE_ASSET: string = "asset";

        protected assets: Object;

        constructor() {
            let definition: Object = {};
            definition[Configuration.PARAMETER_NAME] = Translation.ATTRIBUTE_ASSET;
            definition[Configuration.PARAMETER_TYPE] = String.TYPE_STRING;
            super(Translation.TYPE_TRANSLATION, [definition]);
        }

        public hasAsset(name: string): boolean {
            return this.assets.hasOwnProperty(name);
        }

        public getAsset(name: string): string {
            if (this.hasAsset(name)) {
                return this.assets[name].getValue();
            }
            return name;
        }

        public validate(): boolean {
            return true;
        }

        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["assets"] = {};
            for (let i in this.assets) {
                if (this.assets.hasOwnProperty(i)) {
                    trace["assets"][i] = this.assets[i].getStackTrace();
                }
            }
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            this.clearAssets();
        }

        public setValues(values: Object): void {
            this.clearAssets();
            for (let key in values) {
                if (values.hasOwnProperty(key)) {
                    this.addAsset(key, values[key]);
                }
            }
        }

        public getValues(): Object {
            let values: Object = {};
            for (let key in this.assets) {
                if (this.assets.hasOwnProperty(key)) {
                    values[key] = this.assets[key];
                }
            }
            return values;
        }

        private addAsset(key: string, value: string): void {
            this.assets[key] = Configuration.getInstance(StringConfiguration).create(this.definition);
            this.assets[key].setValue(value);
        }
        
        private clearAssets(): void {
            for (let i in this.assets) {
                if (this.assets.hasOwnProperty(i)) {
                    this.assets[i].dispose();
                }
            }
            this.assets = {};
        }
    }
}


