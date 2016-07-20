/// <reference path="Container.ts" />
/// <reference path="../Attribute/String.ts" />
/// <reference path="../Proxy/Proxy.ts" />
/// <reference path="../Proxy/AjaxProxy.ts" />
/// <reference path="../Event/OnUpdateAsset.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
    import Proxy = Ompluscript.Model.Proxy.Proxy;
    import StringAttribute = Ompluscript.Model.Attribute.String;
    import AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;

    /**
     * Class that contains functionality for Translation.
     *
     * @class Translation
     */
    export class Translation extends Container {

        /**
         * @type {string} TYPE_TRANSLATION Translation type.
         */
        public static TYPE_TRANSLATION: string = Translation["name"];

        /**
         * @type {string} ATTRIBUTE_ASSET Name of asset parameter.
         */
        public static ATTRIBUTE_ASSET: string = "asset";

        /**
         * @type {Object} assets List of all assets
         */
        protected assets: Object;

        /**
         * @type {Object} observers List of all observers by assets
         */
        protected observers: Object;

        /**
         * @type {StringAttribute} attribute Contains a definition for columns
         */
        protected attribute: StringAttribute;

        /**
         * Class constructor.
         *
         * Sets list of assets and observers and calls constructor of superclass.
         *
         * @param {Object[]} proxies Definitions for all proxies
         * @constructs
         */
        constructor(proxies: Proxy[] = undefined) {
            if (!Array.isArray(proxies) || proxies.length === 0) {
                proxies = [
                    new AjaxProxy(),
                ];
            }
            super(Translation.TYPE_TRANSLATION, proxies);
            this.attribute = new StringAttribute(Translation.ATTRIBUTE_ASSET, undefined);
            this.assets = {};
            this.observers = {};
        }

        /**
         * Method that adds observer for the asset.
         *
         * @param {string} name Name of asset
         * @param {IObserver} observer Observer for fetching asset
         */
        public attachToAsset(name: string, observer: IObserver): void {
            if (!this.observers.hasOwnProperty(name)) {
                this.observers[name] = [];
            }
            this.observers[name].push(observer);
            let oldValue: string = name;
            let newValue: string = this.getAsset(name);
            let event: OnUpdateAsset = new OnUpdateAsset(this, oldValue, newValue);
            observer.update(event);
        }

        /**
         * Method that removes observer for the asset.
         *
         * @param {string} name Name of asset
         * @param {IObserver} observer Observer for fetching asset
         */
        public detachFromAsset(name: string, observer: IObserver): void {
            if (!this.observers.hasOwnProperty(name)) {
                return;
            }
            let index: number = this.observers[name].indexOf(observer);
            this.observers[name].splice(index, 1);
            if (this.observers[name].length === 0) {
                delete this.observers[name];
            }
        }

        /**
         * Method that returns if there is a asset in the list
         *
         * @param {string} name Name of asset
         * @returns {boolean} if there is a asset in the list
         */
        public hasAsset(name: string): boolean {
            return this.assets.hasOwnProperty(name);
        }

        /**
         * Method that returns a asset from the list
         *
         * @param {string} name Name of asset
         * @returns {string} value of asset
         */
        public getAsset(name: string): string {
            if (this.hasAsset(name)) {
                return this.assets[name].getValue();
            }
            return name;
        }

        /**
         * Method that validates all attributes in translation.
         *
         * @returns {boolean} Result of validation
         */
        public validate(): boolean {
            return true;
        }

        /**
         * Method that returns all current variables of object.
         *
         * @returns {Object} contains all variables of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["assets"] = {};
            for (let i in this.assets) {
                if (this.assets.hasOwnProperty(i)) {
                    trace["assets"][i] = this.assets[i].getStackTrace();
                }
            }
            trace["attribute"] = this.attribute.getStackTrace();
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            for (let i in this.assets) {
                if (this.assets.hasOwnProperty(i)) {
                    this.assets[i].dispose();
                }
            }
            this.assets = {};
        }

        /**
         * Method that sets values into translation.
         *
         * @param {Object} values
         */
        public setValues(values: Object): void {
            for (let key in values) {
                if (values.hasOwnProperty(key)) {
                    if (!this.assets.hasOwnProperty(key)) {
                        this.addAsset(key, values[key]);
                    } else {
                        this.replaceAsset(key, values[key]);
                    }
                }
            }
            for (let asset in this.assets) {
                if (this.assets.hasOwnProperty(asset) && !values.hasOwnProperty(asset)) {
                    this.deleteAsset(asset);
                }
            }
        }

        /**
         * Method that returns values from translation.
         *
         * @returns {Object}
         */
        public getValues(): Object {
            let values: Object = {};
            for (let key in this.assets) {
                if (this.assets.hasOwnProperty(key)) {
                    values[key] = this.assets[key];
                }
            }
            return values;
        }

        /**
         * Method that reset values in container.
         *
         * @returns {Object}
         */
        public resetValues(): void {
            for (let key in this.assets) {
                if (this.assets.hasOwnProperty(key)) {
                    this.assets[key].setValue(key);
                }
            }
        }

        /**
         * Method that fires event when asset is updated
         *
         * @param {string} name Asset name
         * @param {string} oldValue Old asset of attribute
         * @param {string} newValue New asset of attribute
         */
        protected fireOnUpdateAssetEvent(name: string, oldValue: string, newValue: string): void {
            let event: OnUpdateAsset = new OnUpdateAsset(this, oldValue, newValue);
            if (this.observers.hasOwnProperty(name)) {
                for (let i: number = 0; i < this.observers[name].length; i++) {
                    this.observers[name][i].update(event);
                }
            }
        }

        /**
         * Method that adds asset into list
         *
         * @param {string} key Name of asset
         * @param {value} value Value of asset
         */
        private addAsset(key: string, value: string): void {
            this.assets[key] = this.attribute.clone();
            this.assets[key].setValue(value);
            this.fireOnUpdateAssetEvent(key, key, value);
        }

        /**
         * Method that replaces asset into list
         *
         * @param {string} key Name of asset
         * @param {value} value Value of asset
         */
        private replaceAsset(key: string, value: string): void {
            let oldValue: string = this.assets[key].getValue();
            this.assets[key].setValue(value);
            this.fireOnUpdateAssetEvent(key, oldValue, value);
        }

        /**
         * Method that replaces asset into list
         *
         * @param {string} key Name of asset
         * @param {value} value Value of asset
         */
        private deleteAsset(key: string): void {
            let oldValue: string = this.assets[key].getValue();
            this.assets[key].setValue(key);
            this.fireOnUpdateAssetEvent(key, oldValue, key);
            delete this.assets[key];
        }
    }
}


