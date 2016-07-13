/// <reference path="Proxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Proxy {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;

    export class AjaxProxy extends Proxy {

        public static TYPE_AJAX_PROXY: string = "ajax";

        public static PARAMETER_SAVE_LINK: string = "saveLink";

        public static PARAMETER_UPDATE_LINK: string = "updateLink";

        public static PARAMETER_DELETE_LINK: string = "deleteLink";

        public static PARAMETER_SELECT_LINK: string = "selectLink";

        private static AJAX_STATE_CHANGED: string = "readystatechange";

        private static METHOD_GET: string = "GET";

        private static METHOD_POST: string = "POST";

        private saveLink: string;

        private updateLink: string;

        private deleteLink: string;

        private selectLink: string;

        constructor(container: Container, saveLink: string = undefined, updateLink: string = undefined,
                    deleteLink: string = undefined, selectLink: string = undefined) {
            super(AjaxProxy.TYPE_AJAX_PROXY, container);
            this.saveLink = saveLink;
            this.updateLink = updateLink;
            this.deleteLink = deleteLink;
            this.selectLink = selectLink;
        }

        public save(): void {
            let link: string = this.saveLink;
            if (link === undefined) {
                link = "/save" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_SAVED);
        }

        public update(): void {
            let link: string = this.updateLink;
            if (link === undefined) {
                link = "/update" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_UPDATED);
        }

        public delete(): void {
            let link: string = this.deleteLink;
            if (link === undefined) {
                link = "/delete" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_DELETED);
        }

        public select(query: Object): void {
            let link: string = this.selectLink;
            if (link === undefined) {
                link = "/select" + this.container.getName();
            }
            this.perform(AjaxProxy.METHOD_GET, link, query, OnDoneProxyEvent.TYPE_SELECTED);
        }

        private perform(method: string, url: string, parameters: Object, type: string): void {
            let that: AjaxProxy = this;
            let ajax: XMLHttpRequest = new XMLHttpRequest();
            let request: string = this.extractToParameters(parameters);
            let listener: () => void = function(): void {
                try {
                    if (ajax.readyState === 4 && ajax.status === 200) {
                        that.finish(type, JSON.parse(ajax.responseText));
                    } else {
                        that.finish(OnDoneProxyEvent.TYPE_FAILED, JSON.parse(ajax.responseText));
                    }
                } catch (ex) {
                    that.finish(OnDoneProxyEvent.TYPE_FAILED, ajax.responseText);
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
        
        private extractToParameters(parameters: Object): string {
            if (Array.isArray(parameters)) {
                return this.extractArrayToParameters(<Object[]>parameters);
            }
            return this.extractObjectToParameters(parameters);
        }

        private extractArrayToParameters(parameters: Object[]): string {
            let request: string = "";
            for (let i: number = 0; i < parameters.length; i++) {
                request += this.extractObjectToParameters(parameters, i + "");
            }
            return request;
        }
        
        
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
