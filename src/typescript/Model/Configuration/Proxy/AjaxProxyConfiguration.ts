/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Proxy/AjaxProxy.ts" />

/**
 * Module that contains proxies' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Proxy
 */
module Ompluscript.Model.Configuration.Proxy {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains functionality for ajax proxy configuration.
     *
     * @class AjaxProxyConfiguration
     */
    export class AjaxProxyConfiguration extends Configuration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === AjaxProxy.TYPE_AJAX_PROXY;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
            errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SAVE_LINK));
            errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_UPDATE_LINK));
            errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_DELETE_LINK));
            errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SELECT_LINK));
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let saveLink: string = definition[AjaxProxy.PARAMETER_SAVE_LINK];
            let updateLink: string = definition[AjaxProxy.PARAMETER_UPDATE_LINK];
            let deleteLink: string = definition[AjaxProxy.PARAMETER_DELETE_LINK];
            let selectLink: string = definition[AjaxProxy.PARAMETER_SELECT_LINK];
            return new AjaxProxy(saveLink, updateLink, deleteLink, selectLink);
        }
    }
}
