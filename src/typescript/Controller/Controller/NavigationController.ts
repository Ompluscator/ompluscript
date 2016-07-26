/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../../View/Viewport/Viewport.ts" />
/// <reference path="../../View/Container/Navigation.ts" />
/// <reference path="../../View/Container/List.ts" />
/// <reference path="../../View/Field/PageLink.ts" />
/// <reference path="../../View/Field/Header.ts" />

/**
 * Module that contains controllers
 *
 * @module Ompluscript.Controller.Controller
 */
module Ompluscript.Controller.Controller {
    "use strict";
    
    import Page = Ompluscript.View.Container.Page;
    import Viewport = Ompluscript.View.Viewport.Viewport;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Navigation = Ompluscript.View.Container.Navigation;
    import List = Ompluscript.View.Container.List;
    import PageLink = Ompluscript.View.Field.PageLink;
    import Header = Ompluscript.View.Field.Header;

    /**
     * Class that defines navigation controller
     *
     * @class NavigationController
     */
    export class NavigationController extends Controller {

        /**
         * @type {string} TYPE_NAVIGATION_CONTROLLER Type of navigation controller class
         */
        private static TYPE_NAVIGATION_CONTROLLER: string = NavigationController["name"];

        /**
         * @type {Viewport} viewport Defines viewport of application
         */
        private viewport: Viewport;

        /**
         * @type {History} history Contains window.history object
         */
        private history: History;

        /**
         * @type {PageController[]} pageControllers Contains a list of page controllers in application
         */
        private pageControllers: PageController[];

        /**
         * Class constructor.
         *
         * Set up pages and page controllers and calls constructor
         * of superclass.
         *
         * @param {IBase} pages A list with pages and page controllers
         * @constructs
         */
        constructor(pages: IBase[]) {
            super(NavigationController.TYPE_NAVIGATION_CONTROLLER);
            this.setup(pages);
        }

        /**
         * Method that shows page by its name
         *
         * @param {string} name Name of page
         */
        public switchPageByName(name: string): void {
            let index: number = this.viewport.findPageIndexByName(name);
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        /**
         * Method that shows page by its index
         *
         * @param {string} index Index of page
         */
        public switchPageByIndex(index: number): void {
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["pageControllers"] = this.pageControllers;
            trace["viewport"] = this.viewport;
            return trace;
        }

        /**
         * Method that shows a page depending on path
         *
         * @param {string} path Url to page
         */
        public showPageFromPath(path: string): void {
            if (path.length > 1) {
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    if (this.pageControllers[i].isRelated(path)) {
                        this.switchPageByIndex(i);
                        this.pageControllers[i].runPage(path);
                        return;
                    }
                }
                this.switchPageByIndex(this.pageControllers.length - 1);
            } else {
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    if (this.pageControllers[i].getPage().isDefaultPage()) {
                        this.switchPageByName(this.pageControllers[i].getPage().getName());
                        return;
                    }
                    this.switchPageByName(this.pageControllers[0].getPage().getName());
                }
            }
        }

        /**
         * Method that setups all page controllers usable by navigation controller
         *
         * @param {IBase[]} pages List that contains pages and page controllers
         */
        private setup(pages: IBase[]): void {
            this.pageControllers = [];
            let pageList: Page[] = [];
            for (let i: number = 0; i < pages.length; i++) {
                let pageController: PageController;
                if (pages[i] instanceof Page) {
                    let page: Page = <Page>pages[i];
                    pageController = new PageController(page);
                } else if (pages[i] instanceof PageController) {
                    pageController = <PageController>pages[i];
                }
                this.pageControllers.push(pageController);
                pageList.push(pageController.getPage());
            }
            let errorPage: Page = <Page>Ompluscript.View.Creator.getInstance().create(Page.NAME_404_PAGE);
            if (errorPage === undefined) {
                errorPage = new Page(Page.NAME_404_PAGE, false, undefined, [new Header(Page.NAME_404_PAGE, "text_404_error_title")]);
            }
            this.pageControllers.push(new PageController(errorPage));
            pageList.push(errorPage);
            let navigation: Navigation = <Navigation>Ompluscript.View.Creator.getInstance().create(Navigation.TYPE_NAVIGATION);
            if (navigation === undefined) {
                let component: PageLink[] = [];
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    if (this.pageControllers[i].getPage().getName() !== Page.NAME_404_PAGE) {
                        let name: string = this.pageControllers[i].getPage().getName();
                        component.push(new PageLink(name, name, name));
                    }
                }
                let list: List = new List("firstLevel", undefined, component);
                navigation = new Navigation([list]);
            }
            this.viewport = new Viewport(navigation, pageList);
            this.setupHistoryHandler();
            let path: string = window.location.pathname;
            this.showPageFromPath(path);
        }

        /**
         * Method that setups handler for history API
         */
        private setupHistoryHandler(): void {
            let that: NavigationController = this;
            that.history = window.history;
            let pushState: (first: string, second: string) => void = that.history.pushState;
            that.history.pushState = function(navigationController: boolean, path: string): void {
                pushState.apply(that.history, [path, path, path]);
                if (navigationController === false) {
                    that.showPageFromPath(path);
                }
            };
            window.onpopstate = function(): void {
                let path: string = window.location.pathname;
                that.showPageFromPath(path);
            };
        }
    }
}
