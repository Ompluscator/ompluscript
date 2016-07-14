/// <reference path="Proxy.ts" />
/// <reference path="../Event/OnDoneProxy.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";

    import OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;

    /**
     * Class that contains functionality for Ajax Proxy.
     *
     * @class AjaxProxy
     */
    export class AjaxProxy extends Proxy {

        /**
         * @type {string} TYPE_AJAX_PROXY Defines type for ajax proxy
         */
        public static TYPE_AJAX_PROXY: string = AjaxProxy["name"];

        /**
         * @type {string} PARAMETER_SAVE_LINK Defines parameter's name for save link
         */
        public static PARAMETER_SAVE_LINK: string = "saveLink";

        /**
         * @type {string} PARAMETER_UPDATE_LINK Defines parameter's name for update link
         */
        public static PARAMETER_UPDATE_LINK: string = "updateLink";

        /**
         * @type {string} PARAMETER_DELETE_LINK Defines parameter's name for delete link
         */
        public static PARAMETER_DELETE_LINK: string = "deleteLink";

        /**
         * @type {string} PARAMETER_SELECT_LINK Defines parameter's name for select link
         */
        public static PARAMETER_SELECT_LINK: string = "selectLink";

        /**
         * @type {string} AJAX_STATE_CHANGED Defines event for ajax state changed
         */
        private static AJAX_STATE_CHANGED: string = "readystatechange";

        /**
         * @type {string} METHOD_GET Defines GET method for ajax request
         */
        private static METHOD_GET: string = "GET";

        /**
         * @type {string} METHOD_POST Defines POST method for ajax request
         */
        private static METHOD_POST: string = "POST";

        /**
         * @type {string} saveLink Defines save link for ajax request
         */
        private saveLink: string;

        /**
         * @type {string} updateLink Defines update link for ajax request
         */
        private updateLink: string;

        /**
         * @type {string} deleteLink Defines delete link for ajax request
         */
        private deleteLink: string;

        /**
         * @type {string} selectLink Defines select link for ajax request
         */
        private selectLink: string;

        /**
         * Class constructor
         *
         * Sets save, update, delete and select link for ajax request
         * and calls constructor of superclass.
         *
         * @param {string} saveLink Defines save link for ajax request
         * @param {string} updateLink Defines update link for ajax request
         * @param {string} deleteLink Defines delete link for ajax request
         * @param {string} selectLink Defines select link for ajax request
         */
        constructor(saveLink: string = undefined, updateLink: string = undefined,
                    deleteLink: string = undefined, selectLink: string = undefined) {
            super(AjaxProxy.TYPE_AJAX_PROXY);
            this.saveLink = saveLink;
            this.updateLink = updateLink;
            this.deleteLink = deleteLink;
            this.selectLink = selectLink;
        }

        /**
         * Method that returns save link for ajax request
         * 
         * @returns {string} save link for ajax request
         */
        public getSaveLink(): string {
            return this.saveLink;
        }

        /**
         * Method that returns update link for ajax request
         *
         * @returns {string} update link for ajax request
         */
        public getUpdateLink(): string {
            return this.updateLink;
        }

        /**
         * Method that returns delete link for ajax request
         *
         * @returns {string} delete link for ajax request
         */
        public getDeleteLink(): string {
            return this.deleteLink;
        }

        /**
         * Method that returns select link for ajax request
         *
         * @returns {string} select link for ajax request
         */
        public getSelectLink(): string {
            return this.selectLink;
        }

        /**
         * Method that should perform save request of ajax proxy
         */
        public save(): void {
            let link: string = this.saveLink;
            if (link === undefined) {
                link = "/save" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_SAVED);
        }

        /**
         * Method that should perform update request of ajax proxy
         */
        public update(): void {
            let link: string = this.updateLink;
            if (link === undefined) {
                link = "/update" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_UPDATED);
        }

        /**
         * Method that should perform delete request of ajax proxy
         */
        public delete(): void {
            let link: string = this.deleteLink;
            if (link === undefined) {
                link = "/delete" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_DELETED);
        }

        /**
         * Method that should perform query request of ajax proxy
         *
         * @param {Object} query Contains parameters for request
         */
        public select(query: Object): void {
            let link: string = this.selectLink;
            if (link === undefined) {
                link = "/select" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_GET, link, query, OnDoneProxy.TYPE_SELECTED);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[AjaxProxy.PARAMETER_SAVE_LINK] = this.saveLink;
            trace[AjaxProxy.PARAMETER_UPDATE_LINK] = this.updateLink;
            trace[AjaxProxy.PARAMETER_DELETE_LINK] = this.deleteLink;
            trace[AjaxProxy.PARAMETER_SELECT_LINK] = this.selectLink;
            return trace;
        }

        /**
         * Method that creates desired ajax request and send it to server.
         * 
         * @param {string} method Ajax method for request
         * @param {string} url Url for ajax request
         * @param {Object} parameters Contains parameters for request
         * @param {string} type Type of action performed by ajax request
         */
        private perform(method: string, url: string, parameters: Object, type: string): void {
            let that: AjaxProxy = this;
            let ajax: XMLHttpRequest = new XMLHttpRequest();
            let request: string = this.extractToParameters(parameters);
            let listener: () => void = function(): void {
                try {
                    if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                        that.finish(type, JSON.parse(ajax.responseText));
                    } else if (ajax.readyState === ajax.DONE) {
                        that.finish(OnDoneProxy.TYPE_FAILED, JSON.parse(ajax.responseText));
                    }
                } catch (ex) {
                    that.finish(OnDoneProxy.TYPE_FAILED, ajax.responseText);
                }
            };
            ajax.addEventListener(AjaxProxy.AJAX_STATE_CHANGED, listener, false);
            ajax.open(method, url, true);
            if (request.length === 0) {
                ajax.send();
            } else {
                ajax.send(request);
            }
            
        }

        /**
         * Method that forms parameters into string for request
         * 
         * @param {Object} parameters Contains parameters for request
         * @returns {string} Formed parameters into string
         */
        private extractToParameters(parameters: Object): string {
            if (Array.isArray(parameters)) {
                return this.extractArrayToParameters(<Object[]>parameters);
            }
            return this.extractObjectToParameters(parameters);
        }

        /**
         * Method that forms array of parameters into string for request
         *
         * @param {Object[]} parameters Contains parameters for request
         * @returns {string} Formed parameters into string
         */
        private extractArrayToParameters(parameters: Object[]): string {
            let request: string = "";
            for (let i: number = 0; i < parameters.length; i++) {
                request += this.extractObjectToParameters(parameters, i + "");
            }
            return request;
        }

        /**
         * Method that forms object with parameters into string for request
         *
         * @param {Object} parameters Contains parameters for request
         * @param {string} prefix Name of parent parameter
         * @returns {string} Formed parameters into string
         */
        private extractObjectToParameters(parameters: Object, prefix: string = undefined): string {
            let request: string = "";
            for (let key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    if (request.length > 0) {
                        request += "&";
                    }
                    let value: any = parameters[key];
                    if (Array.isArray(value)) {
                        value += (<Array<string>>value).join(",");
                    }
                    if (prefix !== undefined) {
                        key = prefix + "[" + key + "]";
                    }
                    request += key + "=" + value;
                }
            }
            return request;
        }

    }
}
