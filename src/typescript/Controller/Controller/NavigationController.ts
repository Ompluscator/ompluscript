/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../../View/Viewport/Viewport.ts" />
/// <reference path="../../View/Container/Navigation.ts" />
/// <reference path="../../View/Container/List.ts" />
/// <reference path="../../View/Field/PageLink.ts" />
/// <reference path="../Event/OnActionRun.ts" />

module Ompluscript.Controller.Controller {
    "use strict";
    
    import Page = Ompluscript.View.Container.Page;
    import Viewport = Ompluscript.View.Viewport.Viewport;
    import OnActionRun = Ompluscript.Controller.Event.OnActionRun;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import Navigation = Ompluscript.View.Container.Navigation;
    import List = Ompluscript.View.Container.List;
    import PageLink = Ompluscript.View.Field.PageLink;

    export class NavigationController extends Controller implements IObserver {

        private static NAVIGATION_CONTROLLER: string = "navigationController";

        private static PATH_SEPARATOR: string = "/";

        private viewport: Viewport;

        private history: History;

        private pageControllers: PageController[];

        constructor(pages: IBase[]) {
            super(NavigationController.NAVIGATION_CONTROLLER);
            this.setup(pages);
        }

        public switchPageByName(name: string): void {
            let index: number = this.viewport.findPageIndexByName(name);
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        public switchPageByIndex(index: number): void {
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        public updatePath(page: string, action: string = undefined, parameters: Object = undefined): void {
            if (action !== undefined && parameters !== undefined) {
                let paths: any[] = [page, action];
                for (let i in parameters) {
                    if (parameters.hasOwnProperty(i)) {
                        paths.push(i, parameters[i]);
                    }
                }
                this.history.pushState(paths.join(NavigationController.PATH_SEPARATOR));
            } else {
                this.history.pushState(page);
            }
        }

        public showPageFromPath(path: string): void {
            let paths: any = path.split(NavigationController.PATH_SEPARATOR);
            let page: string = paths[0];
            this.switchPageByName(page);
            if (paths.length > 1) {
                let action: string = paths[1];
                paths.splice(0, 2);
                let parameters: Object = {};
                for (let i: number = 0; i < paths.length; i += 2) {
                    parameters[paths[i]] = paths[i + 1];
                }
                let pageController: PageController = this.findControllerByName(page);
                if (pageController !== undefined) {
                    pageController.runAction(action, parameters);
                }
            }
        }

        public update(event: OEvent): void {
            if (event instanceof OnActionRun) {
                let onActionRun: OnActionRun = <OnActionRun>event;
                this.updatePath(onActionRun.getSender().getName(), onActionRun.getAction(), onActionRun.getParameters());
            }
        }

        private findControllerByName(name: string): PageController {
            for (let i: number = 0; i < this.pageControllers.length; i++) {
                if (this.pageControllers[i].getName() === name) {
                    return this.pageControllers[i];
                }
            }
            return undefined;
        }

        private setup(pages: IBase[]): void {
            this.pageControllers = [];
            let pageList: Page[] = [];
            for (let i: number = 0; i < pages.length; i++) {
                if (pages[i] instanceof Page) {
                    let page: Page = <Page>pages[i];
                    let pageController: PageController = new PageController(page.getName(), page);
                    pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                    this.pageControllers.push(pageController);
                    pageList.push(page);
                } else if (pages[i] instanceof PageController) {
                    let pageController: PageController = <PageController>pages[i];
                    pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                    this.pageControllers.push(pageController);
                    pageList.push(pageController.getPage());
                }
            }
            let navigation: Navigation = <Navigation>Ompluscript.View.Creator.getInstance().create(Navigation.TYPE_NAVIGATION);
            if (navigation === undefined) {
                let component: PageLink[] = [];
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    let name: string = this.pageControllers[i].getPage().getName();
                    component.push(new PageLink(name, name, name));
                }
                let list: List = new List("firstLevel", undefined, component);
                navigation = new Navigation([list]);
            }
            this.viewport = new Viewport(navigation, pageList);
            this.setupHistoryHandler();
        }
        
        private setupHistoryHandler(): void {
            let that: NavigationController = this;
            that.history = window.history;
            let pushState: (first: string, second: string) => void = that.history.pushState;
            that.history.pushState = function(path: string): void {
                pushState.apply(that.history, [path, path, path]);
                that.showPageFromPath(path);
            };
            window.onpopstate = function(): void {
                let path: string = window.location.pathname.substring(1);
                if (path.length === 0) {
                    path = that.pageControllers[0].getPage().getName();
                }
                that.showPageFromPath(path);
            };
            let path: string = location.pathname;
            path = path.slice(1);
            if (path.length > 0) {
                that.showPageFromPath(path);
            } else {
                that.switchPageByIndex(0);
            }
        }
    }
}
