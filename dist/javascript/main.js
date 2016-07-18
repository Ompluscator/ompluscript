var Ompluscript;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Interfaces;
        (function (Interfaces) {
            "use strict";
        })(Interfaces = Core.Interfaces || (Core.Interfaces = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_1) {
            "use strict";
            var Configuration = (function () {
                function Configuration() {
                }
                Configuration.getInstance = function (configuration) {
                    if (!Configuration.instances.hasOwnProperty(configuration["name"])) {
                        Configuration.instances[configuration["name"]] = new configuration;
                    }
                    return Configuration.instances[configuration["name"]];
                };
                Configuration.prototype.filterErrors = function (errors) {
                    var filter = [];
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i] !== undefined) {
                            filter.push(errors[i]);
                        }
                    }
                    if (filter.length > 0) {
                        return filter;
                    }
                    return [];
                };
                Configuration.prototype.mustBeValue = function (definition, key, values) {
                    if (values.indexOf(definition[key]) === -1) {
                        return this.getName(definition, key) + Configuration.HAS_WRONG_VALUE;
                    }
                    return undefined;
                };
                Configuration.prototype.mustBeString = function (definition, key) {
                    if (typeof definition[key] !== "string") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeString = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "string") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeStringOrObjectBoolean = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "boolean"
                        && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeBoolean = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "boolean") {
                        return this.getName(definition, key) + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.mustBeNumber = function (definition, key) {
                    if (typeof definition[key] !== "number") {
                        return this.getName(definition, key) + Configuration.MUST_BE_NUMBER;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeNumber = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "number") {
                        return this.getName(definition, key) + Configuration.MUST_BE_NUMBER_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeRegex = function (definition, key) {
                    if (definition[key] !== undefined && !(definition[key] instanceof RegExp)) {
                        return this.getName(definition, key) + Configuration.MUST_BE_REGEX_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeDatetime = function (definition, key) {
                    if (definition[key] !== undefined && (typeof definition[key] !== "string" || isNaN(new Date(definition[key]).getTime()))) {
                        return this.getName(definition, key) + Configuration.MUST_BE_DATETIME_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeArray = function (definition, key) {
                    if (definition[key] !== undefined && !Array.isArray(definition[key])) {
                        return this.getName(definition, key) + Configuration.MUST_BE_ARRAY_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeFunction = function (definition, key) {
                    var helper = {};
                    if (definition[key] !== undefined && helper.toString.call(definition[key]) !== "[object Function]") {
                        return this.getName(definition, key) + Configuration.MUST_BE_FUNCTION_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeObject = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_OBJECT_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.mustBeGreater = function (definition, first, second, firstValue, secondValue, include) {
                    if (firstValue !== undefined && secondValue !== undefined) {
                        if (include === true && firstValue > secondValue) {
                            return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                                + this.getName(definition, first);
                        }
                        else if (include !== true && firstValue >= secondValue) {
                            return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                                + this.getName(definition, first);
                        }
                    }
                    return undefined;
                };
                Configuration.prototype.getName = function (definition, key) {
                    if (definition[Configuration.PARAMETER_NAME] !== undefined) {
                        return definition[Configuration.PARAMETER_NAME] + "." + key;
                    }
                    return key;
                };
                Configuration.IS_WRONG_CONFIGURATION = "Is wrong configuration.";
                Configuration.HAS_WRONG_VALUE = " has wrong value.";
                Configuration.MUST_BE_STRING = " must be a string.";
                Configuration.MUST_BE_STRING_OR_UNDEFINED = " must be a string or undefined.";
                Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED = " must be a string or object or boolean or undefined.";
                Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED = " must be a boolean or undefined.";
                Configuration.MUST_BE_NUMBER = " must be a number.";
                Configuration.MUST_BE_NUMBER_OR_UNDEFINED = " must be a number or undefined.";
                Configuration.MUST_BE_REGEX_OR_UNDEFINED = " must be a regex object or undefined.";
                Configuration.MUST_BE_DATETIME_OR_UNDEFINED = " must be in datetime format or undefined.";
                Configuration.MUST_BE_ARRAY_OR_UNDEFINED = " must be an array object or undefined.";
                Configuration.MUST_BE_OBJECT_OR_UNDEFINED = " must be an object or undefined.";
                Configuration.MUST_BE_FUNCTION_OR_UNDEFINED = " must be a function or undefined.";
                Configuration.MUST_BE_GREATER = " must be greater than ";
                Configuration.MUST_BE_DEFINED = " must be defined ";
                Configuration.PARAMETER_TYPE = "type";
                Configuration.PARAMETER_NAME = "name";
                Configuration.instances = {};
                return Configuration;
            }());
            Configuration_1.Configuration = Configuration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_2) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var GroupConfiguration = (function (_super) {
                __extends(GroupConfiguration, _super);
                function GroupConfiguration(configurations) {
                    _super.call(this);
                    this.configurations = configurations;
                }
                GroupConfiguration.prototype.getErrorsForChildren = function (definition, key, creator) {
                    if (key === void 0) { key = undefined; }
                    if (creator === void 0) { creator = undefined; }
                    var errors = [];
                    if (this.configurations.hasOwnProperty(key)) {
                        var configuration = this.configurations[key];
                        if (definition.hasOwnProperty(key)) {
                            if (Array.isArray(definition[key])) {
                                for (var i = 0; i < definition[key].length; i++) {
                                    if (typeof definition[key][i] === "string" && creator !== undefined) {
                                        if (!creator.ifDefined(definition[key][i])) {
                                            errors.push(definition[key][i] + Configuration.MUST_BE_DEFINED);
                                        }
                                    }
                                    else {
                                        for (var j = 0; j < configuration.length; j++) {
                                            if (configuration[j].isRelatedTo(definition[key][i])) {
                                                errors.push.apply(errors, configuration[j].getErrors(definition[key][i]));
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (typeof definition[key] === "string" && creator !== undefined) {
                                    if (!creator.ifDefined(definition[key])) {
                                        errors.push(definition[key] + Configuration.MUST_BE_DEFINED);
                                    }
                                }
                                else {
                                    for (var i = 0; i < configuration.length; i++) {
                                        if (configuration[i].isRelatedTo(definition[key])) {
                                            errors.push.apply(errors, configuration[i].getErrors(definition[key]));
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return this.filterErrors(errors);
                };
                GroupConfiguration.prototype.createChildren = function (definition, key, creator) {
                    if (creator === void 0) { creator = undefined; }
                    var children = [];
                    if (this.configurations.hasOwnProperty(key)) {
                        if (definition.hasOwnProperty(key)) {
                            var configuration = this.configurations[key];
                            for (var i = 0; i < definition[key].length; i++) {
                                if (creator !== undefined && typeof definition[key][i] === "string") {
                                    children.push(creator.create(definition[key][i]));
                                }
                                else {
                                    for (var j = 0; j < configuration.length; j++) {
                                        if (configuration[j].isRelatedTo(definition[key][i])) {
                                            children.push(configuration[j].create(definition[key][i]));
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return children;
                };
                GroupConfiguration.prototype.createChild = function (definition, key, creator) {
                    if (creator === void 0) { creator = undefined; }
                    if (creator !== undefined && typeof definition[key] === "string") {
                        return creator.create(definition[key]);
                    }
                    else if (this.configurations.hasOwnProperty(key)) {
                        var configuration = this.configurations[key];
                        if (definition.hasOwnProperty(key)) {
                            for (var i = 0; i < configuration.length; i++) {
                                if (configuration[i].isRelatedTo(definition[key])) {
                                    return configuration[i].create(definition[key]);
                                }
                            }
                        }
                    }
                    return undefined;
                };
                return GroupConfiguration;
            }(Configuration));
            Configuration_2.GroupConfiguration = GroupConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var Event = (function () {
                function Event(sender, type) {
                    this.sender = sender;
                    this.type = type;
                }
                Event.prototype.getSender = function () {
                    return this.sender;
                };
                Event.prototype.getType = function () {
                    return this.type;
                };
                return Event;
            }());
            Observer.Event = Event;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var Observable = (function () {
                function Observable() {
                    this.events = {};
                }
                Observable.prototype.addObserverByType = function (observer, type) {
                    if (!this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                    if (this.events[type].indexOf(observer) === -1) {
                        this.events[type].push(observer);
                    }
                };
                Observable.prototype.deleteObserverByType = function (observer, type) {
                    if (this.events.hasOwnProperty(type)) {
                        for (var i in this.events[type]) {
                            if (this.events[type].hasOwnProperty(i) && this.events[type][i] === observer) {
                                this.events[type].splice(i, 1);
                            }
                        }
                    }
                };
                Observable.prototype.clearObservers = function () {
                    this.events = {};
                };
                Observable.prototype.clearObserversByType = function (type) {
                    if (this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                };
                Observable.prototype.dispose = function () {
                    this.clearObservers();
                };
                Observable.prototype.notifyObservers = function (event) {
                    if (this.events[event.getType()] !== undefined) {
                        for (var i in this.events[event.getType()]) {
                            if (this.events[event.getType()].hasOwnProperty(i)) {
                                this.events[event.getType()][i].update(event);
                            }
                        }
                    }
                };
                return Observable;
            }());
            Observer.Observable = Observable;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_1) {
        var Controller;
        (function (Controller_2) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller(name) {
                    _super.call(this);
                    this.name = name;
                    this.handlers = {};
                }
                Controller.prototype.attachEventHandler = function (observable, type, handler) {
                    if (!this.handlers.hasOwnProperty(observable.getName())) {
                        this.handlers[observable.getName()] = {};
                    }
                    if (!this.handlers[observable.getName()].hasOwnProperty(type)) {
                        this.handlers[observable.getName()][type] = [];
                    }
                    this.handlers[observable.getName()][type].push(handler);
                    observable.addObserverByType(this, type);
                };
                Controller.prototype.update = function (event) {
                    if (this.handlers.hasOwnProperty(event.getSender().getName())) {
                        if (this.handlers[event.getSender().getName()].hasOwnProperty(event.getType())) {
                            var handlers = this.handlers[event.getSender().getName()][event.getType()];
                            for (var i = 0; i < handlers.length; i++) {
                                handlers[i].bind(this)(event);
                            }
                        }
                    }
                };
                Controller.prototype.getName = function () {
                    return this.name;
                };
                Controller.prototype.getStackTrace = function () {
                    var trace = {};
                    trace[Controller.PARAMETER_HANDLERS] = [];
                    for (var key in this.handlers) {
                        if (this.handlers.hasOwnProperty(key)) {
                            trace[Controller.PARAMETER_HANDLERS].push(key);
                        }
                    }
                    trace[Controller.PARAMETER_NAME] = this.name;
                    return trace;
                };
                Controller.PARAMETER_EVENTS = "events";
                Controller.PARAMETER_NAME = "name";
                Controller.PARAMETER_HANDLERS = "handlers";
                return Controller;
            }(Observable));
            Controller_2.Controller = Controller;
        })(Controller = Controller_1.Controller || (Controller_1.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_3) {
        var Configuration;
        (function (Configuration_3) {
            var Controller;
            (function (Controller_4) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var Controller = Ompluscript.Controller.Controller.Controller;
                var ControllerConfiguration = (function (_super) {
                    __extends(ControllerConfiguration, _super);
                    function ControllerConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ControllerConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.shouldBeObject(definition, Controller.PARAMETER_EVENTS));
                        return this.filterErrors(errors);
                    };
                    return ControllerConfiguration;
                }(GroupConfiguration));
                Controller_4.ControllerConfiguration = ControllerConfiguration;
            })(Controller = Configuration_3.Controller || (Configuration_3.Controller = {}));
        })(Configuration = Controller_3.Configuration || (Controller_3.Configuration = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Component = (function (_super) {
                __extends(Component, _super);
                function Component(name, styles) {
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this);
                    this.name = name;
                    this.htmlElement = undefined;
                    this.initializeHtmlElement();
                    if (styles !== undefined) {
                        for (var key in styles) {
                            if (styles.hasOwnProperty(key)) {
                                this.setStyle(key, styles[key]);
                            }
                        }
                    }
                }
                Component.prototype.hasClass = function (name) {
                    var classes = this.extractClasses();
                    return classes.indexOf(name) > -1;
                };
                Component.prototype.addClass = function (name) {
                    if (!this.hasClass(name)) {
                        var classes = this.extractClasses();
                        classes.push(name);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.removeClass = function (name) {
                    if (this.hasClass(name)) {
                        var classes = this.extractClasses();
                        var index = classes.indexOf(name);
                        classes.splice(index, 1);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.toggleClass = function (name) {
                    if (this.hasClass(name)) {
                        this.removeClass(name);
                    }
                    else {
                        this.addClass(name);
                    }
                };
                Component.prototype.setId = function (id) {
                    this.setAttribute(Component.ATTRIBUTE_ID, id);
                };
                Component.prototype.getId = function () {
                    return this.getAttribute(Component.ATTRIBUTE_ID);
                };
                Component.prototype.setAttribute = function (name, value) {
                    this.htmlElement.setAttribute(name, value);
                };
                Component.prototype.getAttribute = function (name) {
                    return this.htmlElement.getAttribute(name);
                };
                Component.prototype.removeAttribute = function (name) {
                    this.htmlElement.removeAttribute(name);
                };
                Component.prototype.getStyle = function (name) {
                    return this.htmlElement.style.getPropertyValue(name);
                };
                Component.prototype.setStyle = function (name, value) {
                    this.htmlElement.style.setProperty(name, value);
                };
                Component.prototype.getName = function () {
                    return this.name;
                };
                Component.prototype.getStackTrace = function () {
                    var trace = {
                        html: this.htmlElement.outerHTML.replace(this.htmlElement.innerHTML, ""),
                        name: this.name,
                    };
                    return trace;
                };
                Component.prototype.dispose = function () {
                    if (this.htmlElement instanceof HTMLElement) {
                        var parent_1 = this.htmlElement.parentElement;
                        if (parent_1 instanceof HTMLElement) {
                            parent_1.removeChild(this.htmlElement);
                        }
                    }
                };
                Component.prototype.extractClasses = function () {
                    var classes;
                    var classValue = this.getAttribute(Component.ATTRIBUTE_CLASS);
                    if (typeof classValue === "string") {
                        classes = this.getAttribute(Component.ATTRIBUTE_CLASS).split(" ");
                    }
                    else {
                        classes = [];
                    }
                    if (classes === [""]) {
                        classes = [];
                    }
                    return classes;
                };
                Component.PARAMETER_TYPE = "type";
                Component.PARAMETER_STYLES = "styles";
                Component.ATTRIBUTE_ID = "id";
                Component.ATTRIBUTE_CLASS = "class";
                return Component;
            }(Observable));
            Component_1.Component = Component;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout(name, styles) {
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.children = [];
                    this.addClass(Layout.CLASS_LAYOUT);
                }
                Layout.prototype.addChild = function (component) {
                    var index = this.children.indexOf(component);
                    if (index === -1) {
                        this.children.push(component);
                    }
                    else {
                        this.removeChild(component);
                        this.addChild(component);
                    }
                };
                Layout.prototype.removeChild = function (component) {
                    var index = this.children.indexOf(component);
                    if (index > -1) {
                        this.children.splice(index, 1);
                    }
                };
                Layout.prototype.getChildrenCount = function () {
                    return this.children.length;
                };
                Layout.prototype.clearChildren = function () {
                    this.children = [];
                };
                Layout.prototype.render = function () {
                    this.clear();
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] !== undefined) {
                            this.appendChild(this.children[i]);
                        }
                    }
                    return this.htmlElement;
                };
                Layout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Layout.PARAMETER_CHILDREN] = [];
                    for (var i = 0; i < this.children.length; i++) {
                        trace[Layout.PARAMETER_CHILDREN].push(this.children[i].getStackTrace());
                    }
                    return trace;
                };
                Layout.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Layout.ELEMENT_DIV);
                };
                Layout.PARAMETER_CHILDREN = "children";
                Layout.ELEMENT_DIV = "div";
                Layout.CLASS_LAYOUT = "layout";
                return Layout;
            }(Component));
            Layout_1.Layout = Layout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var NullLayout = (function (_super) {
                __extends(NullLayout, _super);
                function NullLayout() {
                    _super.call(this, NullLayout.TYPE_NULL_LAYOUT);
                    this.addClass(NullLayout.CLASS_NULL_LAYOUT);
                }
                NullLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                NullLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                NullLayout.TYPE_NULL_LAYOUT = NullLayout["name"];
                NullLayout.CLASS_NULL_LAYOUT = "null-layout";
                return NullLayout;
            }(Layout.Layout));
            Layout.NullLayout = NullLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_4) {
            var Component;
            (function (Component_2) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ComponentConfiguration = (function (_super) {
                    __extends(ComponentConfiguration, _super);
                    function ComponentConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ComponentConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeObject(definition, Component.PARAMETER_STYLES));
                        return this.filterErrors(errors);
                    };
                    return ComponentConfiguration;
                }(GroupConfiguration));
                Component_2.ComponentConfiguration = ComponentConfiguration;
            })(Component = Configuration_4.Component || (Configuration_4.Component = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_5) {
            var Layout;
            (function (Layout) {
                "use strict";
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LayoutConfiguration = (function (_super) {
                    __extends(LayoutConfiguration, _super);
                    function LayoutConfiguration() {
                        _super.call(this, undefined);
                    }
                    LayoutConfiguration.prototype.getErrors = function (definition) {
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    return LayoutConfiguration;
                }(ComponentConfiguration));
                Layout.LayoutConfiguration = LayoutConfiguration;
            })(Layout = Configuration_5.Layout || (Configuration_5.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_6) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var NullLayout = Ompluscript.View.Layout.NullLayout;
                var NullLayoutConfiguration = (function (_super) {
                    __extends(NullLayoutConfiguration, _super);
                    function NullLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    NullLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NullLayout.TYPE_NULL_LAYOUT;
                    };
                    NullLayoutConfiguration.prototype.create = function (definition) {
                        return new NullLayout();
                    };
                    return NullLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.NullLayoutConfiguration = NullLayoutConfiguration;
            })(Layout = Configuration_6.Layout || (Configuration_6.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var RelativeLayout = (function (_super) {
                __extends(RelativeLayout, _super);
                function RelativeLayout() {
                    _super.call(this, RelativeLayout.TYPE_RELATIVE_LAYOUT);
                    this.addClass(RelativeLayout.CLASS_RELATIVE_LAYOUT);
                }
                RelativeLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                RelativeLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                RelativeLayout.TYPE_RELATIVE_LAYOUT = RelativeLayout["name"];
                RelativeLayout.CLASS_RELATIVE_LAYOUT = "relative-layout";
                return RelativeLayout;
            }(Layout.Layout));
            Layout.RelativeLayout = RelativeLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_7) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
                var RelativeLayoutConfiguration = (function (_super) {
                    __extends(RelativeLayoutConfiguration, _super);
                    function RelativeLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    RelativeLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === RelativeLayout.TYPE_RELATIVE_LAYOUT;
                    };
                    RelativeLayoutConfiguration.prototype.create = function (definition) {
                        return new RelativeLayout();
                    };
                    return RelativeLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.RelativeLayoutConfiguration = RelativeLayoutConfiguration;
            })(Layout = Configuration_7.Layout || (Configuration_7.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var LinearLayout = (function (_super) {
                __extends(LinearLayout, _super);
                function LinearLayout(direction, reverse, align, name) {
                    if (direction === void 0) { direction = LinearLayout.DIRECTION_HORIZONTAL; }
                    if (reverse === void 0) { reverse = false; }
                    if (align === void 0) { align = LinearLayout.ALIGN_START; }
                    if (name === void 0) { name = LinearLayout.TYPE_LINEAR_LAYOUT; }
                    _super.call(this, name);
                    this.direction = direction;
                    this.reverse = reverse;
                    this.align = align;
                    this.setUpLayout();
                }
                LinearLayout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[LinearLayout.PARAMETER_ALIGN] = this.align;
                    trace[LinearLayout.PARAMETER_DIRECTION] = this.direction;
                    trace[LinearLayout.PARAMETER_REVERSE] = this.reverse;
                    return trace;
                };
                LinearLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                LinearLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                LinearLayout.prototype.setUpLayout = function () {
                    this.addClass(LinearLayout.CLASS_LINEAR_LAYOUT);
                    this.addClass(LinearLayout.CLASS_PREFIX + this.direction);
                    this.addClass(LinearLayout.CLASS_PREFIX + this.align);
                    if (this.reverse === true) {
                        this.addClass(LinearLayout.CLASS_PREFIX + LinearLayout.CLASS_REVERSE);
                    }
                };
                LinearLayout.TYPE_LINEAR_LAYOUT = LinearLayout["name"];
                LinearLayout.PARAMETER_DIRECTION = "direction";
                LinearLayout.PARAMETER_REVERSE = "reverse";
                LinearLayout.PARAMETER_ALIGN = "align";
                LinearLayout.DIRECTION_HORIZONTAL = "horizontal";
                LinearLayout.DIRECTION_VERTICAL = "vertical";
                LinearLayout.ALIGN_START = "start";
                LinearLayout.ALIGN_END = "end";
                LinearLayout.ALIGN_CENTER = "center";
                LinearLayout.CLASS_LINEAR_LAYOUT = "linear-layout";
                LinearLayout.CLASS_PREFIX = "flex-";
                LinearLayout.CLASS_REVERSE = "reverse";
                return LinearLayout;
            }(Layout.Layout));
            Layout.LinearLayout = LinearLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_8) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LinearLayout = Ompluscript.View.Layout.LinearLayout;
                var LinearLayoutConfiguration = (function (_super) {
                    __extends(LinearLayoutConfiguration, _super);
                    function LinearLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    LinearLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === LinearLayout.TYPE_LINEAR_LAYOUT;
                    };
                    LinearLayoutConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        var error = this.shouldBeString(definition, LinearLayout.PARAMETER_DIRECTION);
                        if (error === undefined) {
                            if (definition[LinearLayout.PARAMETER_DIRECTION]) {
                                var values = [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL];
                                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_DIRECTION, values));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        error = this.shouldBeString(definition, LinearLayout.PARAMETER_ALIGN);
                        if (error === undefined) {
                            if (definition[LinearLayout.PARAMETER_ALIGN]) {
                                var values = [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END];
                                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_ALIGN, values));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        errors.push(this.shouldBeBoolean(definition, LinearLayout.PARAMETER_REVERSE));
                        return this.filterErrors(errors);
                    };
                    LinearLayoutConfiguration.prototype.create = function (definition) {
                        var direction = definition[LinearLayout.PARAMETER_DIRECTION];
                        var reverse = definition[LinearLayout.PARAMETER_REVERSE];
                        var align = definition[LinearLayout.PARAMETER_ALIGN];
                        return new LinearLayout(direction, reverse, align);
                    };
                    return LinearLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.LinearLayoutConfiguration = LinearLayoutConfiguration;
            })(Layout = Configuration_8.Layout || (Configuration_8.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var TableLayout = (function (_super) {
                __extends(TableLayout, _super);
                function TableLayout(rows, cells) {
                    if (rows === void 0) { rows = 1; }
                    if (cells === void 0) { cells = 1; }
                    _super.call(this, Layout.LinearLayout.DIRECTION_VERTICAL, false, Layout.LinearLayout.ALIGN_CENTER, TableLayout.TYPE_TABLE_LAYOUT);
                    this.rows = rows;
                    this.cells = cells;
                    for (var i = 0; i < this.rows; i++) {
                        this.children.push(new Layout.LinearLayout(Layout.LinearLayout.DIRECTION_HORIZONTAL, false, Layout.LinearLayout.ALIGN_CENTER, TableLayout.TYPE_TABLE_LAYOUT));
                    }
                    this.copies = [];
                }
                TableLayout.prototype.addChild = function (component) {
                    var row = Math.floor(this.getChildrenCount() / this.cells);
                    if (row < this.children.length) {
                        this.children[row].addChild(component);
                        this.copies.push(component);
                    }
                };
                TableLayout.prototype.removeChild = function (component) {
                    var copies = this.copies.slice();
                    this.clearChildren();
                    var index = copies.indexOf(component);
                    if (index > -1) {
                        copies.splice(index, 1);
                    }
                    for (var i = 0; i < copies.length; i++) {
                        this.addChild(copies[i]);
                    }
                };
                TableLayout.prototype.clearChildren = function () {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].clearChildren();
                    }
                    this.copies = [];
                };
                TableLayout.prototype.getChildrenCount = function () {
                    return this.copies.length;
                };
                TableLayout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[TableLayout.PARAMETER_CELLS] = this.cells;
                    trace[TableLayout.PARAMETER_ROWS] = this.rows;
                    return trace;
                };
                TableLayout.prototype.clear = function () {
                    return;
                };
                TableLayout.TYPE_TABLE_LAYOUT = TableLayout["name"];
                TableLayout.PARAMETER_ROWS = "rows";
                TableLayout.PARAMETER_CELLS = "cells";
                return TableLayout;
            }(Layout.LinearLayout));
            Layout.TableLayout = TableLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_9) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TableLayout = Ompluscript.View.Layout.TableLayout;
                var TableLayoutConfiguration = (function (_super) {
                    __extends(TableLayoutConfiguration, _super);
                    function TableLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    TableLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === TableLayout.TYPE_TABLE_LAYOUT;
                    };
                    TableLayoutConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_ROWS));
                        errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_CELLS));
                        return this.filterErrors(errors);
                    };
                    TableLayoutConfiguration.prototype.create = function (definition) {
                        var rows = definition[TableLayout.PARAMETER_ROWS];
                        var cells = definition[TableLayout.PARAMETER_CELLS];
                        return new TableLayout(rows, cells);
                    };
                    return TableLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.TableLayoutConfiguration = TableLayoutConfiguration;
            })(Layout = Configuration_9.Layout || (Configuration_9.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_10) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var ErrorConfiguration = (function (_super) {
                __extends(ErrorConfiguration, _super);
                function ErrorConfiguration() {
                    _super.apply(this, arguments);
                }
                ErrorConfiguration.prototype.isRelatedTo = function (definition) {
                    return true;
                };
                ErrorConfiguration.prototype.getErrors = function (definition) {
                    return [Configuration.IS_WRONG_CONFIGURATION];
                };
                ErrorConfiguration.prototype.create = function (definition) {
                    return undefined;
                };
                return ErrorConfiguration;
            }(Configuration));
            Configuration_10.ErrorConfiguration = ErrorConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_1) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnDoneProxy = (function (_super) {
                __extends(OnDoneProxy, _super);
                function OnDoneProxy(sender, action, response) {
                    _super.call(this, sender, OnDoneProxy.ON_DONE_PROXY);
                    this.action = action;
                    this.response = response;
                }
                OnDoneProxy.prototype.getAction = function () {
                    return this.action;
                };
                OnDoneProxy.prototype.getResponse = function () {
                    return this.response;
                };
                OnDoneProxy.ON_DONE_PROXY = "onDoneProxy";
                OnDoneProxy.TYPE_SAVED = "saved";
                OnDoneProxy.TYPE_UPDATED = "updated";
                OnDoneProxy.TYPE_DELETED = "deleted";
                OnDoneProxy.TYPE_SELECTED = "selected";
                OnDoneProxy.TYPE_FAILED = "failed";
                return OnDoneProxy;
            }(Event));
            Event_1.OnDoneProxy = OnDoneProxy;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy_1) {
            "use strict";
            var Proxy = (function () {
                function Proxy(name) {
                    this.name = name;
                }
                Proxy.prototype.setContainer = function (container) {
                    this.container = container;
                };
                Proxy.prototype.getName = function () {
                    return this.name;
                };
                Proxy.prototype.getStackTrace = function () {
                    var trace = {
                        type: this.name,
                    };
                    return trace;
                };
                Proxy.prototype.dispose = function () {
                    return undefined;
                };
                Proxy.prototype.finish = function (action, response) {
                    this.container.doneProxy(action, response);
                };
                return Proxy;
            }());
            Proxy_1.Proxy = Proxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this);
                    this.name = name;
                    this.proxies = {};
                    if (Array.isArray(proxies)) {
                        for (var i = 0; i < proxies.length; i++) {
                            proxies[i].setContainer(this);
                            this.proxies[proxies[i].getName()] = proxies[i];
                        }
                    }
                }
                Container.prototype.getName = function () {
                    return this.name;
                };
                Container.prototype.hasProxy = function (type) {
                    return this.proxies.hasOwnProperty(type);
                };
                Container.prototype.getProxy = function (type) {
                    if (this.hasProxy(type)) {
                        return this.proxies[type];
                    }
                    return undefined;
                };
                Container.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        proxies: [],
                    };
                    for (var key in this.proxies) {
                        if (this.proxies.hasOwnProperty(key)) {
                            trace["proxies"].push(this.proxies[key].getStackTrace());
                        }
                    }
                    return trace;
                };
                Container.prototype.doneProxy = function (action, response) {
                    if (action === OnDoneProxy.TYPE_SELECTED) {
                        this.setValues(response);
                    }
                    this.fireOnDoneProxyEvent(action, response);
                };
                Container.prototype.fireOnDoneProxyEvent = function (action, response) {
                    var event = new OnDoneProxy(this, action, response);
                    this.notifyObservers(event);
                };
                Container.PARAMETER_ATTRIBUTES = "attributes";
                Container.PARAMETER_PROXIES = "proxies";
                return Container;
            }(Observable));
            Container_1.Container = Container;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Interfaces;
        (function (Interfaces) {
            "use strict";
        })(Interfaces = Core.Interfaces || (Core.Interfaces = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_2) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var AttributeEvent = (function (_super) {
                __extends(AttributeEvent, _super);
                function AttributeEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                AttributeEvent.ON_UPDATE_ATTRIBUTE = "onUpdateAttribute";
                AttributeEvent.ON_INVALID_ATTRIBUTE = "onInvalidAttribute";
                AttributeEvent.ON_UPDATE_CHOICES = "onUpdateChoices";
                return AttributeEvent;
            }(Event));
            Event_2.AttributeEvent = AttributeEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateAttribute = (function (_super) {
                __extends(OnUpdateAttribute, _super);
                function OnUpdateAttribute(sender, oldValue, newValue) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_ATTRIBUTE);
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                }
                OnUpdateAttribute.prototype.getOldValue = function () {
                    return this.oldValue;
                };
                OnUpdateAttribute.prototype.getNewValue = function () {
                    return this.newValue;
                };
                return OnUpdateAttribute;
            }(Event.AttributeEvent));
            Event.OnUpdateAttribute = OnUpdateAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnInvalidAttribute = (function (_super) {
                __extends(OnInvalidAttribute, _super);
                function OnInvalidAttribute(sender, value, validationCode) {
                    _super.call(this, sender, Event.AttributeEvent.ON_INVALID_ATTRIBUTE);
                    this.value = value;
                    this.validationCode = validationCode;
                }
                OnInvalidAttribute.prototype.getValidationCode = function () {
                    return this.validationCode;
                };
                OnInvalidAttribute.prototype.getValue = function () {
                    return this.value;
                };
                return OnInvalidAttribute;
            }(Event.AttributeEvent));
            Event.OnInvalidAttribute = OnInvalidAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
            var Attribute = (function (_super) {
                __extends(Attribute, _super);
                function Attribute(type, name, value, required) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    _super.call(this);
                    this.type = type;
                    this.name = name;
                    this.value = value;
                    this.required = required;
                }
                Attribute.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                Attribute.prototype.getValue = function () {
                    return this.value;
                };
                Attribute.prototype.resetValue = function () {
                    this.setValue(undefined);
                };
                Attribute.prototype.isRequired = function () {
                    return this.required;
                };
                Attribute.prototype.getName = function () {
                    return this.name;
                };
                Attribute.prototype.getError = function () {
                    return this.error;
                };
                Attribute.prototype.validate = function () {
                    this.error = undefined;
                    if (typeof this.value !== this.type && this.value !== undefined) {
                        this.error = Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && typeof this.value !== this.type) {
                        this.error = Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    return true;
                };
                Attribute.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        required: this.required,
                        type: this.type,
                        value: this.value,
                    };
                    return trace;
                };
                Attribute.prototype.fireOnUpdateAttributeEvent = function (oldValue, newValue) {
                    var event = new OnUpdateAttribute(this, oldValue, newValue);
                    this.notifyObservers(event);
                };
                Attribute.prototype.fireOnInvalidAttributeEvent = function (value, validationCode) {
                    var event = new OnInvalidAttribute(this, value, validationCode);
                    this.notifyObservers(event);
                };
                Attribute.ERROR_WRONG_TYPE = 101;
                Attribute.ERROR_IS_REQUIRED = 102;
                Attribute.ERROR_BELOW_MINIMUM = 201;
                Attribute.ERROR_OVER_MAXIMUM = 202;
                Attribute.PARAMETER_REQUIRED = "required";
                Attribute.PARAMETER_VALUE = "value";
                Attribute.PARAMETER_MINIMUM = "minimum";
                Attribute.PARAMETER_MAXIMUM = "maximum";
                return Attribute;
            }(Observable));
            Attribute_1.Attribute = Attribute;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var String = (function (_super) {
                __extends(String, _super);
                function String(name, value, required, minimumLength, maximumLength, pattern) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimumLength === void 0) { minimumLength = undefined; }
                    if (maximumLength === void 0) { maximumLength = undefined; }
                    if (pattern === void 0) { pattern = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimumLength = minimumLength;
                    this.maximumLength = maximumLength;
                    this.pattern = pattern;
                }
                String.prototype.getMinimumLength = function () {
                    return this.minimumLength;
                };
                String.prototype.getMaximumLength = function () {
                    return this.maximumLength;
                };
                String.prototype.getPattern = function () {
                    return this.pattern;
                };
                String.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.minimumLength !== undefined && this.value["length"] < this.minimumLength) {
                            this.error = String.ERROR_BELOW_MINIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximumLength !== undefined && this.value["length"] > this.maximumLength) {
                            this.error = String.ERROR_OVER_MAXIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.pattern !== undefined && this.pattern.test(this.value) === false) {
                            this.error = String.ERROR_PATTERN_NOT_MATCH;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                String.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[String.PARAMETER_MINIMUM_LENGTH] = this.minimumLength;
                    trace[String.PARAMETER_MAXIMUM_LENGTH] = this.maximumLength;
                    trace[String.PARAMETER_PATTERN] = this.pattern;
                    return trace;
                };
                String.prototype.clone = function () {
                    var pattern = undefined;
                    if (this.pattern !== undefined) {
                        pattern = new RegExp(this.pattern.source);
                    }
                    return new Ompluscript.Model.Attribute.String(this.name, undefined, this.required, this.minimumLength, this.maximumLength, pattern);
                };
                String.ERROR_BELOW_MINIMUM_LENGTH = 211;
                String.ERROR_OVER_MAXIMUM_LENGTH = 212;
                String.ERROR_PATTERN_NOT_MATCH = 221;
                String.PARAMETER_MINIMUM_LENGTH = "minimumLength";
                String.PARAMETER_MAXIMUM_LENGTH = "maximumLength";
                String.PARAMETER_PATTERN = "pattern";
                String.TYPE_STRING = String["name"];
                return String;
            }(Attribute.Attribute));
            Attribute.String = String;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var AjaxProxy = (function (_super) {
                __extends(AjaxProxy, _super);
                function AjaxProxy(saveLink, updateLink, deleteLink, selectLink) {
                    if (saveLink === void 0) { saveLink = undefined; }
                    if (updateLink === void 0) { updateLink = undefined; }
                    if (deleteLink === void 0) { deleteLink = undefined; }
                    if (selectLink === void 0) { selectLink = undefined; }
                    _super.call(this, AjaxProxy.TYPE_AJAX_PROXY);
                    this.saveLink = saveLink;
                    this.updateLink = updateLink;
                    this.deleteLink = deleteLink;
                    this.selectLink = selectLink;
                }
                AjaxProxy.prototype.getSaveLink = function () {
                    return this.saveLink;
                };
                AjaxProxy.prototype.getUpdateLink = function () {
                    return this.updateLink;
                };
                AjaxProxy.prototype.getDeleteLink = function () {
                    return this.deleteLink;
                };
                AjaxProxy.prototype.getSelectLink = function () {
                    return this.selectLink;
                };
                AjaxProxy.prototype.save = function () {
                    var link = this.saveLink;
                    if (link === undefined) {
                        link = "/save" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_SAVED);
                };
                AjaxProxy.prototype.update = function () {
                    var link = this.updateLink;
                    if (link === undefined) {
                        link = "/update" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_UPDATED);
                };
                AjaxProxy.prototype.delete = function () {
                    var link = this.deleteLink;
                    if (link === undefined) {
                        link = "/delete" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_DELETED);
                };
                AjaxProxy.prototype.select = function (query) {
                    var link = this.selectLink;
                    if (link === undefined) {
                        link = "/select" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_GET, link, query, OnDoneProxy.TYPE_SELECTED);
                };
                AjaxProxy.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[AjaxProxy.PARAMETER_SAVE_LINK] = this.saveLink;
                    trace[AjaxProxy.PARAMETER_UPDATE_LINK] = this.updateLink;
                    trace[AjaxProxy.PARAMETER_DELETE_LINK] = this.deleteLink;
                    trace[AjaxProxy.PARAMETER_SELECT_LINK] = this.selectLink;
                    return trace;
                };
                AjaxProxy.prototype.perform = function (method, url, parameters, type) {
                    var that = this;
                    var ajax = new XMLHttpRequest();
                    var request = this.extractToParameters(parameters);
                    var listener = function () {
                        try {
                            if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                                that.finish(type, JSON.parse(ajax.responseText));
                            }
                            else if (ajax.readyState === ajax.DONE) {
                                that.finish(OnDoneProxy.TYPE_FAILED, JSON.parse(ajax.responseText));
                            }
                        }
                        catch (ex) {
                            that.finish(OnDoneProxy.TYPE_FAILED, ajax.responseText);
                        }
                    };
                    ajax.addEventListener(AjaxProxy.AJAX_STATE_CHANGED, listener, false);
                    ajax.open(method, url, true);
                    if (request.length === 0) {
                        ajax.send();
                    }
                    else {
                        ajax.send(request);
                    }
                };
                AjaxProxy.prototype.extractToParameters = function (parameters) {
                    if (Array.isArray(parameters)) {
                        return this.extractArrayToParameters(parameters);
                    }
                    return this.extractObjectToParameters(parameters);
                };
                AjaxProxy.prototype.extractArrayToParameters = function (parameters) {
                    var request = "";
                    for (var i = 0; i < parameters.length; i++) {
                        request += this.extractObjectToParameters(parameters, i + "");
                    }
                    return request;
                };
                AjaxProxy.prototype.extractObjectToParameters = function (parameters, prefix) {
                    if (prefix === void 0) { prefix = undefined; }
                    var request = "";
                    for (var key in parameters) {
                        if (parameters.hasOwnProperty(key)) {
                            if (request.length > 0) {
                                request += "&";
                            }
                            var value = parameters[key];
                            if (Array.isArray(value)) {
                                value += value.join(",");
                            }
                            if (prefix !== undefined) {
                                key = prefix + "[" + key + "]";
                            }
                            request += key + "=" + value;
                        }
                    }
                    return request;
                };
                AjaxProxy.TYPE_AJAX_PROXY = AjaxProxy["name"];
                AjaxProxy.PARAMETER_SAVE_LINK = "saveLink";
                AjaxProxy.PARAMETER_UPDATE_LINK = "updateLink";
                AjaxProxy.PARAMETER_DELETE_LINK = "deleteLink";
                AjaxProxy.PARAMETER_SELECT_LINK = "selectLink";
                AjaxProxy.AJAX_STATE_CHANGED = "readystatechange";
                AjaxProxy.METHOD_GET = "GET";
                AjaxProxy.METHOD_POST = "POST";
                return AjaxProxy;
            }(Proxy.Proxy));
            Proxy.AjaxProxy = AjaxProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_3) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnUpdateAsset = (function (_super) {
                __extends(OnUpdateAsset, _super);
                function OnUpdateAsset(sender, oldValue, newValue) {
                    _super.call(this, sender, OnUpdateAsset.ON_UPDATE_ASSET);
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                }
                OnUpdateAsset.prototype.getOldValue = function () {
                    return this.oldValue;
                };
                OnUpdateAsset.prototype.getNewValue = function () {
                    return this.newValue;
                };
                OnUpdateAsset.ON_UPDATE_ASSET = "onUpdateAsset";
                return OnUpdateAsset;
            }(Event));
            Event_3.OnUpdateAsset = OnUpdateAsset;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_2) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var StringAttribute = Ompluscript.Model.Attribute.String;
            var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
            var Translation = (function (_super) {
                __extends(Translation, _super);
                function Translation(proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    if (!Array.isArray(proxies) || proxies.length === 0) {
                        proxies = [
                            new AjaxProxy(),
                        ];
                    }
                    _super.call(this, Translation.TYPE_TRANSLATION, proxies);
                    this.attribute = new StringAttribute(Translation.ATTRIBUTE_ASSET, undefined);
                    this.assets = {};
                    this.observers = {};
                }
                Translation.prototype.attachToAsset = function (name, observer) {
                    if (!this.observers.hasOwnProperty(name)) {
                        this.observers[name] = [];
                    }
                    this.observers[name].push(observer);
                    var oldValue = name;
                    var newValue = this.getAsset(name);
                    var event = new OnUpdateAsset(this, oldValue, newValue);
                    observer.update(event);
                };
                Translation.prototype.hasAsset = function (name) {
                    return this.assets.hasOwnProperty(name);
                };
                Translation.prototype.getAsset = function (name) {
                    if (this.hasAsset(name)) {
                        return this.assets[name].getValue();
                    }
                    return name;
                };
                Translation.prototype.validate = function () {
                    return true;
                };
                Translation.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["assets"] = {};
                    for (var i in this.assets) {
                        if (this.assets.hasOwnProperty(i)) {
                            trace["assets"][i] = this.assets[i].getStackTrace();
                        }
                    }
                    trace["attribute"] = this.attribute.getStackTrace();
                    return trace;
                };
                Translation.prototype.dispose = function () {
                    for (var i in this.assets) {
                        if (this.assets.hasOwnProperty(i)) {
                            this.assets[i].dispose();
                        }
                    }
                    this.assets = {};
                };
                Translation.prototype.setValues = function (values) {
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            if (!this.assets.hasOwnProperty(key)) {
                                this.addAsset(key, values[key]);
                            }
                            else {
                                this.replaceAsset(key, values[key]);
                            }
                        }
                    }
                    for (var asset in this.assets) {
                        if (this.assets.hasOwnProperty(asset) && !values.hasOwnProperty(asset)) {
                            this.deleteAsset(asset);
                        }
                    }
                };
                Translation.prototype.getValues = function () {
                    var values = {};
                    for (var key in this.assets) {
                        if (this.assets.hasOwnProperty(key)) {
                            values[key] = this.assets[key];
                        }
                    }
                    return values;
                };
                Translation.prototype.fireOnUpdateAssetEvent = function (name, oldValue, newValue) {
                    var event = new OnUpdateAsset(this, oldValue, newValue);
                    if (this.observers.hasOwnProperty(name)) {
                        for (var i = 0; i < this.observers[name].length; i++) {
                            this.observers[name][i].update(event);
                        }
                    }
                };
                Translation.prototype.addAsset = function (key, value) {
                    this.assets[key] = this.attribute.clone();
                    this.assets[key].setValue(value);
                    this.fireOnUpdateAssetEvent(key, key, value);
                };
                Translation.prototype.replaceAsset = function (key, value) {
                    var oldValue = this.assets[key].getValue();
                    this.assets[key].setValue(value);
                    this.fireOnUpdateAssetEvent(key, oldValue, value);
                };
                Translation.prototype.deleteAsset = function (key) {
                    var oldValue = this.assets[key].getValue();
                    this.assets[key].setValue(key);
                    this.fireOnUpdateAssetEvent(key, oldValue, key);
                    delete this.assets[key];
                };
                Translation.TYPE_TRANSLATION = Translation["name"];
                Translation.ATTRIBUTE_ASSET = "asset";
                return Translation;
            }(Container));
            Container_2.Translation = Translation;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration) {
            "use strict";
            var ConfigurationClass = Ompluscript.Core.Configuration.Configuration;
            var Creator = (function () {
                function Creator(configurations) {
                    this.definition = {};
                    this.errors = [];
                    this.configurations = configurations;
                }
                Creator.prototype.hasErrors = function () {
                    return this.errors.length > 0;
                };
                Creator.prototype.getErrors = function () {
                    return this.errors;
                };
                Creator.prototype.reset = function () {
                    this.definition = {};
                    this.errors = [];
                };
                Creator.prototype.ifDefined = function (name) {
                    return this.definition.hasOwnProperty(name);
                };
                Creator.prototype.define = function (definition) {
                    var errors = [];
                    for (var i = 0; i < this.configurations.length; i++) {
                        if (this.configurations[i].isRelatedTo(definition)) {
                            errors = this.configurations[i].getErrors(definition);
                            break;
                        }
                    }
                    if (errors.length) {
                        this.errors.push({
                            definition: definition,
                            errors: errors,
                            name: definition[ConfigurationClass.PARAMETER_NAME],
                            type: definition[ConfigurationClass.PARAMETER_TYPE],
                        });
                    }
                    else {
                        this.definition[definition[ConfigurationClass.PARAMETER_NAME]] = definition;
                    }
                };
                Creator.prototype.create = function (name) {
                    if (this.definition.hasOwnProperty(name)) {
                        for (var i = 0; i < this.configurations.length; i++) {
                            if (this.configurations[i].isRelatedTo(this.definition[name])) {
                                return this.configurations[i].create(this.definition[name]);
                            }
                        }
                    }
                    return undefined;
                };
                Creator.PARAMETER_TYPE = "type";
                Creator.PARAMETER_NAME = "name";
                Creator.PARAMETER_ERRORS = "errors";
                Creator.PARAMETER_DEFINITION = "definition";
                return Creator;
            }());
            Configuration.Creator = Creator;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_11) {
            var Attribute;
            (function (Attribute_2) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var AttributeConfiguration = (function (_super) {
                    __extends(AttributeConfiguration, _super);
                    function AttributeConfiguration() {
                        _super.apply(this, arguments);
                    }
                    AttributeConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeBoolean(definition, Attribute.PARAMETER_REQUIRED));
                        return this.filterErrors(errors);
                    };
                    return AttributeConfiguration;
                }(Configuration));
                Attribute_2.AttributeConfiguration = AttributeConfiguration;
            })(Attribute = Configuration_11.Attribute || (Configuration_11.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Boolean = (function (_super) {
                __extends(Boolean, _super);
                function Boolean(name, value, required, mustBeTrue) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (mustBeTrue === void 0) { mustBeTrue = false; }
                    _super.call(this, "boolean", name, value, required);
                    this.mustBeTrue = mustBeTrue;
                }
                Boolean.prototype.isMustBeTrue = function () {
                    return this.mustBeTrue;
                };
                Boolean.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== true && this.mustBeTrue === true) {
                            this.error = Boolean.ERROR_MUST_BE_TRUE;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Boolean.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Boolean.PARAMETER_MUST_BE_TRUE] = this.mustBeTrue;
                    return trace;
                };
                Boolean.prototype.clone = function () {
                    return new Ompluscript.Model.Attribute.Boolean(this.name, undefined, this.required, this.mustBeTrue);
                };
                Boolean.PARAMETER_MUST_BE_TRUE = "mustBeTrue";
                Boolean.TYPE_BOOLEAN = Boolean["name"];
                Boolean.ERROR_MUST_BE_TRUE = 204;
                return Boolean;
            }(Attribute.Attribute));
            Attribute.Boolean = Boolean;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_12) {
            var Attribute;
            (function (Attribute_3) {
                "use strict";
                var BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var BooleanConfiguration = (function (_super) {
                    __extends(BooleanConfiguration, _super);
                    function BooleanConfiguration() {
                        _super.apply(this, arguments);
                    }
                    BooleanConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === BooleanAttribute.TYPE_BOOLEAN;
                    };
                    BooleanConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeBoolean(definition, BooleanAttribute.PARAMETER_MUST_BE_TRUE));
                        return this.filterErrors(errors);
                    };
                    BooleanConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var mustBeTrue = definition[BooleanAttribute.PARAMETER_MUST_BE_TRUE];
                        return new BooleanAttribute(name, value, required, mustBeTrue);
                    };
                    return BooleanConfiguration;
                }(Attribute_3.AttributeConfiguration));
                Attribute_3.BooleanConfiguration = BooleanConfiguration;
            })(Attribute = Configuration_12.Attribute || (Configuration_12.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_4) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var Datetime = (function (_super) {
                __extends(Datetime, _super);
                function Datetime(name, value, required, minimum, maximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (maximum === void 0) { maximum = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    if (minimum !== undefined) {
                        this.minimumObject = new Date(minimum);
                    }
                    if (maximum !== undefined) {
                        this.maximumObject = new Date(maximum);
                    }
                }
                Datetime.prototype.getDateObject = function () {
                    return new Date(this.value);
                };
                Datetime.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Datetime.prototype.getMinimumDateObject = function () {
                    return this.minimumObject;
                };
                Datetime.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Datetime.prototype.getMaximumDateObject = function () {
                    return this.maximumObject;
                };
                Datetime.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && isNaN(this.getDateObject().getTime())) {
                            this.error = Attribute.ERROR_WRONG_TYPE;
                            return false;
                        }
                        if (this.value !== undefined && this.minimum !== undefined
                            && this.getDateObject().getTime() < this.minimumObject.getTime()) {
                            this.error = Attribute.ERROR_BELOW_MINIMUM;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximum !== undefined
                            && this.getDateObject().getTime() > this.maximumObject.getTime()) {
                            this.error = Attribute.ERROR_OVER_MAXIMUM;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Datetime.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace["minimumObject"] = this.minimumObject;
                    trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace["maximumObject"] = this.maximumObject;
                    return trace;
                };
                Datetime.prototype.clone = function () {
                    return new Datetime(this.name, undefined, this.required, this.minimum, this.maximum);
                };
                Datetime.TYPE_DATETIME = Datetime["name"];
                return Datetime;
            }(Attribute));
            Attribute_4.Datetime = Datetime;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_13) {
            var Attribute;
            (function (Attribute_5) {
                "use strict";
                var Datetime = Ompluscript.Model.Attribute.Datetime;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var DatetimeConfiguration = (function (_super) {
                    __extends(DatetimeConfiguration, _super);
                    function DatetimeConfiguration() {
                        _super.apply(this, arguments);
                    }
                    DatetimeConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Datetime.TYPE_DATETIME;
                    };
                    DatetimeConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        var validMinimum = this.shouldBeDatetime(definition, Attribute.PARAMETER_MINIMUM);
                        var validMaximum = this.shouldBeDatetime(definition, Attribute.PARAMETER_MAXIMUM);
                        errors.push(validMinimum, validMaximum);
                        if (validMinimum === undefined && validMaximum === undefined) {
                            var minimum = new Date(definition[Attribute.PARAMETER_MINIMUM]);
                            var maximum = new Date(definition[Attribute.PARAMETER_MAXIMUM]);
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, true));
                            }
                        }
                        return this.filterErrors(errors);
                    };
                    DatetimeConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimum = definition[Attribute.PARAMETER_MINIMUM];
                        var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                        return new Datetime(name, value, required, minimum, maximum);
                    };
                    return DatetimeConfiguration;
                }(Attribute_5.AttributeConfiguration));
                Attribute_5.DatetimeConfiguration = DatetimeConfiguration;
            })(Attribute = Configuration_13.Attribute || (Configuration_13.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateChoices = (function (_super) {
                __extends(OnUpdateChoices, _super);
                function OnUpdateChoices(sender, oldChoices, newChoices) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_CHOICES);
                    this.oldChoices = oldChoices;
                    this.newChoices = newChoices;
                }
                OnUpdateChoices.prototype.getOldChoices = function () {
                    return this.oldChoices;
                };
                OnUpdateChoices.prototype.getNewChoices = function () {
                    return this.newChoices;
                };
                return OnUpdateChoices;
            }(Event.AttributeEvent));
            Event.OnUpdateChoices = OnUpdateChoices;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;
            var Choice = (function (_super) {
                __extends(Choice, _super);
                function Choice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, "number", name, value, required);
                    this.choices = choices;
                }
                Choice.prototype.getChoices = function () {
                    return this.choices;
                };
                Choice.prototype.setChoices = function (values) {
                    var oldChoices = this.choices.slice(0);
                    this.choices = values;
                    this.fireOnUpdateChoicesEvent(oldChoices, this.choices);
                };
                Choice.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Choice.PARAMETER_CHOICES] = this.choices;
                    return trace;
                };
                Choice.prototype.fireOnUpdateChoicesEvent = function (oldChoices, newChoices) {
                    var event = new OnUpdateChoices(this, oldChoices, newChoices);
                    this.notifyObservers(event);
                };
                Choice.PARAMETER_CHOICES = "choices";
                Choice.ERROR_VALUE_NOT_ALLOWED = 203;
                return Choice;
            }(Attribute.Attribute));
            Attribute.Choice = Choice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration) {
            var Attribute;
            (function (Attribute) {
                "use strict";
                var Choice = Ompluscript.Model.Attribute.Choice;
                var ChoiceConfiguration = (function (_super) {
                    __extends(ChoiceConfiguration, _super);
                    function ChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ChoiceConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, Choice.PARAMETER_CHOICES));
                        return this.filterErrors(errors);
                    };
                    return ChoiceConfiguration;
                }(Attribute.AttributeConfiguration));
                Attribute.ChoiceConfiguration = ChoiceConfiguration;
            })(Attribute = Configuration.Attribute || (Configuration.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_6) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var MultipleChoice = (function (_super) {
                __extends(MultipleChoice, _super);
                function MultipleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                MultipleChoice.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    if (Array.isArray(this.value) === true) {
                        oldValue = this.value.slice(0);
                    }
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                MultipleChoice.prototype.validate = function () {
                    this.error = undefined;
                    if (Array.isArray(this.value) === false && this.value !== undefined) {
                        this.error = Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && (Array.isArray(this.value) === false || this.value.length === 0)) {
                        this.error = Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    if (Array.isArray(this.value) === true) {
                        for (var i in this.value) {
                            if (this.choices.indexOf(this.value[i]) === -1) {
                                this.error = Attribute_6.Choice.ERROR_VALUE_NOT_ALLOWED;
                                return false;
                            }
                        }
                    }
                    return true;
                };
                MultipleChoice.prototype.clone = function () {
                    var choices = undefined;
                    if (Array.isArray(this.choices)) {
                        choices = [];
                        for (var i = 0; i < this.choices.length; i++) {
                            choices.push(this.choices[i]);
                        }
                    }
                    return new MultipleChoice(this.name, undefined, this.required, choices);
                };
                MultipleChoice.TYPE_MULTIPLE_CHOICE = MultipleChoice["name"];
                return MultipleChoice;
            }(Attribute_6.Choice));
            Attribute_6.MultipleChoice = MultipleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_14) {
            var Attribute;
            (function (Attribute_7) {
                "use strict";
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Choice = Ompluscript.Model.Attribute.Choice;
                var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var MultipleChoiceConfiguration = (function (_super) {
                    __extends(MultipleChoiceConfiguration, _super);
                    function MultipleChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    MultipleChoiceConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === MultipleChoice.TYPE_MULTIPLE_CHOICE;
                    };
                    MultipleChoiceConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    MultipleChoiceConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var choices = definition[Choice.PARAMETER_CHOICES];
                        return new MultipleChoice(name, value, required, choices);
                    };
                    return MultipleChoiceConfiguration;
                }(Attribute_7.ChoiceConfiguration));
                Attribute_7.MultipleChoiceConfiguration = MultipleChoiceConfiguration;
            })(Attribute = Configuration_14.Attribute || (Configuration_14.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_8) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var Number = (function (_super) {
                __extends(Number, _super);
                function Number(name, value, required, minimum, includeMinimum, maximum, includeMaximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (includeMinimum === void 0) { includeMinimum = false; }
                    if (maximum === void 0) { maximum = undefined; }
                    if (includeMaximum === void 0) { includeMaximum = false; }
                    _super.call(this, "number", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    this.includeMinimum = includeMinimum;
                    this.includeMaximum = includeMaximum;
                }
                Number.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Number.prototype.getIncludeMinimum = function () {
                    return this.includeMinimum;
                };
                Number.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Number.prototype.getIncludeMaximum = function () {
                    return this.includeMaximum;
                };
                Number.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined) {
                            if (this.minimum !== undefined) {
                                if (this.includeMinimum === false && this.value <= this.minimum) {
                                    this.error = Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                                else if (this.includeMinimum === true && this.value < this.minimum) {
                                    this.error = Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                            }
                            if (this.maximum !== undefined) {
                                if (this.includeMaximum === false && this.value >= this.maximum) {
                                    this.error = Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                                else if (this.includeMaximum === true && this.value > this.maximum) {
                                    this.error = Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                };
                Number.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace[Number.PARAMETER_INCLUDE_MINIMUM] = this.includeMinimum;
                    trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace[Number.PARAMETER_INCLUDE_MAXIMUM] = this.includeMaximum;
                    return trace;
                };
                Number.prototype.clone = function () {
                    return new Ompluscript.Model.Attribute.Number(this.name, undefined, this.required, this.minimum, this.includeMinimum, this.maximum, this.includeMaximum);
                };
                Number.PARAMETER_INCLUDE_MINIMUM = "includeMinimum";
                Number.PARAMETER_INCLUDE_MAXIMUM = "includeMaximum";
                Number.TYPE_NUMBER = Number["name"];
                return Number;
            }(Attribute));
            Attribute_8.Number = Number;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_15) {
            var Attribute;
            (function (Attribute_9) {
                "use strict";
                var NumberAttribute = Ompluscript.Model.Attribute.Number;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var NumberConfiguration = (function (_super) {
                    __extends(NumberConfiguration, _super);
                    function NumberConfiguration() {
                        _super.apply(this, arguments);
                    }
                    NumberConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NumberAttribute.TYPE_NUMBER;
                    };
                    NumberConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MINIMUM));
                        errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MAXIMUM));
                        errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MINIMUM));
                        errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MAXIMUM));
                        errors = this.filterErrors(errors);
                        if (errors.length === 0) {
                            var minimum = definition[Attribute.PARAMETER_MINIMUM];
                            var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                            var include = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM] &&
                                definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, include));
                            }
                        }
                        return this.filterErrors(errors);
                    };
                    NumberConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimum = definition[Attribute.PARAMETER_MINIMUM];
                        var includeMinimum = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
                        var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                        var includeMaximum = definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                        return new NumberAttribute(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
                    };
                    return NumberConfiguration;
                }(Attribute_9.AttributeConfiguration));
                Attribute_9.NumberConfiguration = NumberConfiguration;
            })(Attribute = Configuration_15.Attribute || (Configuration_15.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var SingleChoice = (function (_super) {
                __extends(SingleChoice, _super);
                function SingleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                SingleChoice.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.choices.indexOf(this.value) === -1) {
                            this.error = Attribute.Choice.ERROR_VALUE_NOT_ALLOWED;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                SingleChoice.prototype.clone = function () {
                    var choices = undefined;
                    if (Array.isArray(this.choices)) {
                        choices = [];
                        for (var i = 0; i < this.choices.length; i++) {
                            choices.push(this.choices[i]);
                        }
                    }
                    return new SingleChoice(this.name, undefined, this.required, choices);
                };
                SingleChoice.TYPE_SINGLE_CHOICE = SingleChoice["name"];
                return SingleChoice;
            }(Attribute.Choice));
            Attribute.SingleChoice = SingleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_16) {
            var Attribute;
            (function (Attribute_10) {
                "use strict";
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Choice = Ompluscript.Model.Attribute.Choice;
                var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var SingleChoiceConfiguration = (function (_super) {
                    __extends(SingleChoiceConfiguration, _super);
                    function SingleChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    SingleChoiceConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === SingleChoice.TYPE_SINGLE_CHOICE;
                    };
                    SingleChoiceConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    SingleChoiceConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var choices = definition[Choice.PARAMETER_CHOICES];
                        return new SingleChoice(name, value, required, choices);
                    };
                    return SingleChoiceConfiguration;
                }(Attribute_10.ChoiceConfiguration));
                Attribute_10.SingleChoiceConfiguration = SingleChoiceConfiguration;
            })(Attribute = Configuration_16.Attribute || (Configuration_16.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_17) {
            var Attribute;
            (function (Attribute_11) {
                "use strict";
                var StringAttribute = Ompluscript.Model.Attribute.String;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var StringConfiguration = (function (_super) {
                    __extends(StringConfiguration, _super);
                    function StringConfiguration() {
                        _super.apply(this, arguments);
                    }
                    StringConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === StringAttribute.TYPE_STRING;
                    };
                    StringConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MINIMUM_LENGTH));
                        errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MAXIMUM_LENGTH));
                        errors = this.filterErrors(errors);
                        if (errors.length === 0) {
                            var minimum = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                            var maximum = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                            var minimumKey = StringAttribute.PARAMETER_MINIMUM_LENGTH;
                            var maximumKey = StringAttribute.PARAMETER_MAXIMUM_LENGTH;
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, minimumKey, maximumKey, minimum, maximum, true));
                            }
                        }
                        errors.push(this.shouldBeRegex(definition, StringAttribute.PARAMETER_PATTERN));
                        return this.filterErrors(errors);
                    };
                    StringConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimumLength = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                        var maximumLength = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                        var pattern = definition[StringAttribute.PARAMETER_PATTERN];
                        return new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
                    };
                    return StringConfiguration;
                }(Attribute_11.AttributeConfiguration));
                Attribute_11.StringConfiguration = StringConfiguration;
            })(Attribute = Configuration_17.Attribute || (Configuration_17.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_18) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
                var AjaxProxyConfiguration = (function (_super) {
                    __extends(AjaxProxyConfiguration, _super);
                    function AjaxProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    AjaxProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === AjaxProxy.TYPE_AJAX_PROXY;
                    };
                    AjaxProxyConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SAVE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_UPDATE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_DELETE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SELECT_LINK));
                        return this.filterErrors(errors);
                    };
                    AjaxProxyConfiguration.prototype.create = function (definition) {
                        var saveLink = definition[AjaxProxy.PARAMETER_SAVE_LINK];
                        var updateLink = definition[AjaxProxy.PARAMETER_UPDATE_LINK];
                        var deleteLink = definition[AjaxProxy.PARAMETER_DELETE_LINK];
                        var selectLink = definition[AjaxProxy.PARAMETER_SELECT_LINK];
                        return new AjaxProxy(saveLink, updateLink, deleteLink, selectLink);
                    };
                    return AjaxProxyConfiguration;
                }(Configuration));
                Proxy.AjaxProxyConfiguration = AjaxProxyConfiguration;
            })(Proxy = Configuration_18.Proxy || (Configuration_18.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var StorageProxy = (function (_super) {
                __extends(StorageProxy, _super);
                function StorageProxy(name, storage) {
                    _super.call(this, name);
                    this.storage = storage;
                }
                StorageProxy.prototype.save = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxy.TYPE_SAVED, this.container.getValues());
                };
                StorageProxy.prototype.update = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxy.TYPE_UPDATED, this.container.getValues());
                };
                StorageProxy.prototype.delete = function () {
                    this.storage.removeItem(this.container.getName());
                    this.finish(OnDoneProxy.TYPE_DELETED, this.container.getValues());
                };
                StorageProxy.prototype.select = function () {
                    var result = this.storage.getItem(this.container.getName());
                    this.finish(OnDoneProxy.TYPE_SELECTED, JSON.parse(result));
                };
                return StorageProxy;
            }(Proxy.Proxy));
            Proxy.StorageProxy = StorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var LocalStorageProxy = (function (_super) {
                __extends(LocalStorageProxy, _super);
                function LocalStorageProxy() {
                    _super.call(this, LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY, window.localStorage);
                }
                LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY = LocalStorageProxy["name"];
                return LocalStorageProxy;
            }(Proxy.StorageProxy));
            Proxy.LocalStorageProxy = LocalStorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_19) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;
                var LocalStorageProxyConfiguration = (function (_super) {
                    __extends(LocalStorageProxyConfiguration, _super);
                    function LocalStorageProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    LocalStorageProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY;
                    };
                    LocalStorageProxyConfiguration.prototype.getErrors = function (definition) {
                        return [];
                    };
                    LocalStorageProxyConfiguration.prototype.create = function (definition) {
                        return new LocalStorageProxy();
                    };
                    return LocalStorageProxyConfiguration;
                }(Configuration));
                Proxy.LocalStorageProxyConfiguration = LocalStorageProxyConfiguration;
            })(Proxy = Configuration_19.Proxy || (Configuration_19.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var SessionStorageProxy = (function (_super) {
                __extends(SessionStorageProxy, _super);
                function SessionStorageProxy() {
                    _super.call(this, SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, window.sessionStorage);
                }
                SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY = SessionStorageProxy["name"];
                return SessionStorageProxy;
            }(Proxy.StorageProxy));
            Proxy.SessionStorageProxy = SessionStorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_20) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;
                var SessionStorageProxyConfiguration = (function (_super) {
                    __extends(SessionStorageProxyConfiguration, _super);
                    function SessionStorageProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    SessionStorageProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY;
                    };
                    SessionStorageProxyConfiguration.prototype.getErrors = function (definition) {
                        return [];
                    };
                    SessionStorageProxyConfiguration.prototype.create = function (definition) {
                        return new SessionStorageProxy();
                    };
                    return SessionStorageProxyConfiguration;
                }(Configuration));
                Proxy.SessionStorageProxyConfiguration = SessionStorageProxyConfiguration;
            })(Proxy = Configuration_20.Proxy || (Configuration_20.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_21) {
            var Container;
            (function (Container_3) {
                "use strict";
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
                var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
                var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
                var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
                var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
                var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
                var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
                var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
                var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
                var ContainerConfiguration = (function (_super) {
                    __extends(ContainerConfiguration, _super);
                    function ContainerConfiguration() {
                        var definition = [
                            Configuration.getInstance(BooleanConfiguration),
                            Configuration.getInstance(DatetimeConfiguration),
                            Configuration.getInstance(MultipleChoiceConfiguration),
                            Configuration.getInstance(NumberConfiguration),
                            Configuration.getInstance(SingleChoiceConfiguration),
                            Configuration.getInstance(StringConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var proxies = [
                            Configuration.getInstance(AjaxProxyConfiguration),
                            Configuration.getInstance(SessionStorageProxyConfiguration),
                            Configuration.getInstance(LocalStorageProxyConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_ATTRIBUTES] = definition;
                        configurations[Container.PARAMETER_PROXIES] = proxies;
                        _super.call(this, configurations);
                    }
                    ContainerConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_ATTRIBUTES));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
                        if (definition.hasOwnProperty(Container.PARAMETER_ATTRIBUTES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES));
                        }
                        if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_PROXIES));
                        }
                        return this.filterErrors(errors);
                    };
                    return ContainerConfiguration;
                }(GroupConfiguration));
                Container_3.ContainerConfiguration = ContainerConfiguration;
            })(Container = Configuration_21.Container || (Configuration_21.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_1) {
        var Container;
        (function (Container_4) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Model = (function (_super) {
                __extends(Model, _super);
                function Model(name, attributes, proxies) {
                    if (attributes === void 0) { attributes = undefined; }
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, proxies);
                    this.attributes = {};
                    if (Array.isArray(attributes)) {
                        for (var i = 0; i < attributes.length; i++) {
                            this.attributes[attributes[i].getName()] = attributes[i];
                        }
                    }
                }
                Model.prototype.hasAttribute = function (name) {
                    return this.attributes.hasOwnProperty(name);
                };
                Model.prototype.getAttribute = function (name) {
                    return this.attributes[name];
                };
                Model.prototype.validate = function () {
                    var result = true;
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            result = result && this.attributes[i].validate();
                        }
                    }
                    return result;
                };
                Model.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["attributes"] = {};
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            trace["attributes"][i] = this.attributes[i].getStackTrace();
                        }
                    }
                    return trace;
                };
                Model.prototype.dispose = function () {
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            this.attributes[i].dispose();
                        }
                    }
                };
                Model.prototype.setValues = function (values) {
                    for (var key in values) {
                        if (this.attributes.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                            this.attributes[key].setValue(values[key]);
                        }
                    }
                };
                Model.prototype.getValues = function () {
                    var values = {};
                    for (var key in this.attributes) {
                        if (this.attributes.hasOwnProperty(key)) {
                            values[key] = this.attributes[key].getValue();
                        }
                    }
                    return values;
                };
                Model.TYPE_MODEL = Model["name"];
                return Model;
            }(Container));
            Container_4.Model = Model;
        })(Container = Model_1.Container || (Model_1.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_2) {
        var Configuration;
        (function (Configuration_22) {
            var Container;
            (function (Container_5) {
                "use strict";
                var Model = Ompluscript.Model.Container.Model;
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var ModelConfiguration = (function (_super) {
                    __extends(ModelConfiguration, _super);
                    function ModelConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ModelConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Model.TYPE_MODEL;
                    };
                    ModelConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    ModelConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var attributes = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES);
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Model(name, attributes, proxies);
                    };
                    return ModelConfiguration;
                }(Container_5.ContainerConfiguration));
                Container_5.ModelConfiguration = ModelConfiguration;
            })(Container = Configuration_22.Container || (Configuration_22.Container = {}));
        })(Configuration = Model_2.Configuration || (Model_2.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_4) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var TableEvent = (function (_super) {
                __extends(TableEvent, _super);
                function TableEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                TableEvent.ON_ADD_ROW_TO_TABLE = "onAddRowToTable";
                TableEvent.ON_REMOVE_ROW_FROM_TABLE = "onRemoveRowFromTable";
                TableEvent.ON_CLEAR_TABLE = "onClearTable";
                return TableEvent;
            }(Event));
            Event_4.TableEvent = TableEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_3) {
        var Event;
        (function (Event) {
            "use strict";
            var OnAddRowToTable = (function (_super) {
                __extends(OnAddRowToTable, _super);
                function OnAddRowToTable(sender, index, model) {
                    _super.call(this, sender, Event.TableEvent.ON_ADD_ROW_TO_TABLE);
                    this.index = index;
                    this.model = model;
                }
                OnAddRowToTable.prototype.getModel = function () {
                    return this.model;
                };
                OnAddRowToTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnAddRowToTable;
            }(Event.TableEvent));
            Event.OnAddRowToTable = OnAddRowToTable;
        })(Event = Model_3.Event || (Model_3.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnRemoveRowFromTable = (function (_super) {
                __extends(OnRemoveRowFromTable, _super);
                function OnRemoveRowFromTable(sender, index) {
                    _super.call(this, sender, Event.TableEvent.ON_REMOVE_ROW_FROM_TABLE);
                    this.index = index;
                }
                OnRemoveRowFromTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnRemoveRowFromTable;
            }(Event.TableEvent));
            Event.OnRemoveRowFromTable = OnRemoveRowFromTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnClearTable = (function (_super) {
                __extends(OnClearTable, _super);
                function OnClearTable(sender) {
                    _super.call(this, sender, Event.TableEvent.ON_CLEAR_TABLE);
                }
                return OnClearTable;
            }(Event.TableEvent));
            Event.OnClearTable = OnClearTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_4) {
        var Container;
        (function (Container_6) {
            "use strict";
            var Model = Ompluscript.Model.Container.Model;
            var Container = Ompluscript.Model.Container.Container;
            var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
            var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
            var OnClearTable = Ompluscript.Model.Event.OnClearTable;
            var Table = (function (_super) {
                __extends(Table, _super);
                function Table(name, attributes, proxies) {
                    if (attributes === void 0) { attributes = undefined; }
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, proxies);
                    this.rows = [];
                    this.attributes = attributes;
                }
                Table.prototype.count = function () {
                    return this.rows.length;
                };
                Table.prototype.each = function (callback) {
                    for (var i = 0; i < this.rows.length; i++) {
                        callback(i, this.rows[i]);
                    }
                };
                Table.prototype.hasRowOnIndex = function (index) {
                    return this.rows[index] !== undefined;
                };
                Table.prototype.getRowByIndex = function (index) {
                    return this.rows[index];
                };
                Table.prototype.addRow = function (values) {
                    var attributes = undefined;
                    if (this.attributes !== undefined) {
                        attributes = [];
                        for (var i = 0; i < this.attributes.length; i++) {
                            attributes.push(this.attributes[i].clone());
                        }
                    }
                    var model = new Model(this.name, attributes);
                    this.rows.push(model);
                    this.fireOnAddRowToTableEvent(this.rows.length - 1, model);
                    model.setValues(values);
                };
                Table.prototype.clearRows = function () {
                    this.dispose();
                    this.rows = [];
                    this.fireOnClearTableEvent();
                };
                Table.prototype.removeRowByIndex = function (index) {
                    this.rows.splice(index, 1);
                    this.fireOnRemoveRowFromTableEvent(index);
                };
                Table.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["rows"] = [];
                    for (var i in this.rows) {
                        if (this.rows[i] !== undefined) {
                            trace["rows"].push(this.rows[i].getStackTrace());
                        }
                    }
                    trace["attributes"] = [];
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            trace["attributes"][i] = this.attributes[i].getStackTrace();
                        }
                    }
                    return trace;
                };
                Table.prototype.validate = function () {
                    var result = true;
                    for (var i in this.rows) {
                        if (this.rows.hasOwnProperty(i)) {
                            result = result && this.rows[i].validate();
                        }
                    }
                    return result;
                };
                Table.prototype.dispose = function () {
                    for (var i in this.rows) {
                        if (this.rows[i] !== undefined) {
                            this.rows[i].dispose();
                        }
                    }
                    this.clearObservers();
                };
                Table.prototype.setValues = function (values) {
                    this.clearRows();
                    if (Array.isArray(values)) {
                        var rows = values;
                        for (var i = 0; i < rows.length; i++) {
                            this.addRow(rows[i]);
                        }
                    }
                    else {
                        this.addRow(values);
                    }
                };
                Table.prototype.getValues = function () {
                    var values = [];
                    for (var i = 0; i < this.rows.length; i++) {
                        values.push(this.rows[i].getValues());
                    }
                    return values;
                };
                Table.prototype.fireOnAddRowToTableEvent = function (index, model) {
                    var event = new OnAddRowToTable(this, index, model);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnRemoveRowFromTableEvent = function (index) {
                    var event = new OnRemoveRowFromTable(this, index);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnClearTableEvent = function () {
                    var event = new OnClearTable(this);
                    this.notifyObservers(event);
                };
                Table.TYPE_TABLE = Table["name"];
                return Table;
            }(Container));
            Container_6.Table = Table;
        })(Container = Model_4.Container || (Model_4.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_23) {
            var Container;
            (function (Container_7) {
                "use strict";
                var Table = Ompluscript.Model.Container.Table;
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TableConfiguration = (function (_super) {
                    __extends(TableConfiguration, _super);
                    function TableConfiguration() {
                        _super.apply(this, arguments);
                    }
                    TableConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Table.TYPE_TABLE;
                    };
                    TableConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    TableConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var attributes = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES);
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Table(name, attributes, proxies);
                    };
                    return TableConfiguration;
                }(Container_7.ContainerConfiguration));
                Container_7.TableConfiguration = TableConfiguration;
            })(Container = Configuration_23.Container || (Configuration_23.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_24) {
            var Container;
            (function (Container_8) {
                "use strict";
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
                var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
                var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
                var Translation = Ompluscript.Model.Container.Translation;
                var TranslationConfiguration = (function (_super) {
                    __extends(TranslationConfiguration, _super);
                    function TranslationConfiguration() {
                        var proxies = [
                            Configuration.getInstance(AjaxProxyConfiguration),
                            Configuration.getInstance(SessionStorageProxyConfiguration),
                            Configuration.getInstance(LocalStorageProxyConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_PROXIES] = proxies;
                        _super.call(this, configurations);
                    }
                    TranslationConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Translation.TYPE_TRANSLATION;
                    };
                    TranslationConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
                        if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_PROXIES));
                        }
                        return this.filterErrors(errors);
                    };
                    TranslationConfiguration.prototype.create = function (definition) {
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Translation(proxies);
                    };
                    return TranslationConfiguration;
                }(GroupConfiguration));
                Container_8.TranslationConfiguration = TranslationConfiguration;
            })(Container = Configuration_24.Container || (Configuration_24.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
        var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
        var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
        var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
        var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
        var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
        var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
        var ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
        var TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
        var Translation = Ompluscript.Model.Container.Translation;
        var TranslationConfiguration = Ompluscript.Model.Configuration.Container.TranslationConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    Configuration.getInstance(BooleanConfiguration),
                    Configuration.getInstance(DatetimeConfiguration),
                    Configuration.getInstance(MultipleChoiceConfiguration),
                    Configuration.getInstance(NumberConfiguration),
                    Configuration.getInstance(SingleChoiceConfiguration),
                    Configuration.getInstance(StringConfiguration),
                    Configuration.getInstance(ModelConfiguration),
                    Configuration.getInstance(TableConfiguration),
                    Configuration.getInstance(TranslationConfiguration),
                    Configuration.getInstance(ErrorConfiguration),
                ];
                _super.call(this, configurations);
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            Creator.prototype.getTranslation = function () {
                if (this.translation === undefined) {
                    if (!this.ifDefined(Translation.TYPE_TRANSLATION)) {
                        this.translation = new Translation();
                    }
                    else {
                        this.translation = this.create(Translation.TYPE_TRANSLATION);
                    }
                }
                return this.translation;
            };
            return Creator;
        }(CreatorParent));
        Model.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        Model.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        Model.create = create;
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Creator = Ompluscript.Model.Creator;
            var Field = (function (_super) {
                __extends(Field, _super);
                function Field(name, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, styles);
                    this.translation = Creator.getInstance().getTranslation();
                }
                Field.prototype.render = function () {
                    return this.htmlElement;
                };
                return Field;
            }(Component));
            Field_1.Field = Field;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event_5) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnUpdateInput = (function (_super) {
                __extends(OnUpdateInput, _super);
                function OnUpdateInput(sender, value) {
                    _super.call(this, sender, OnUpdateInput.ON_UPDATE_INPUT);
                    this.value = value;
                }
                OnUpdateInput.prototype.getValue = function () {
                    return this.value;
                };
                OnUpdateInput.ON_UPDATE_INPUT = "onUpdateInput";
                return OnUpdateInput;
            }(Event));
            Event_5.OnUpdateInput = OnUpdateInput;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var Input = (function (_super) {
                __extends(Input, _super);
                function Input(name, attribute, placeholder, styles, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = undefined; }
                    _super.call(this, name, styles);
                    this.setAttribute(Input.ATTRIBUTE_TYPE, type);
                    this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
                    this.addClass(Input.CLASS_INPUT);
                    this.attribute = undefined;
                    this.setBinding(attribute);
                    this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
                    this.placeholder = placeholder;
                    if (this.isTranslated()) {
                        this.translation.attachToAsset(placeholder, this);
                    }
                }
                Input.prototype.update = function (event) {
                    if (event instanceof OnUpdateAttribute) {
                        var onUpdateAttribute = event;
                        this.updateValue(onUpdateAttribute.getNewValue());
                    }
                    else if (event instanceof OnUpdateInput && this.isBound()) {
                        var onUpdateInput = event;
                        this.attribute.setValue(onUpdateInput.getValue());
                    }
                    else if (event instanceof OnUpdateAsset && this.isTranslated()) {
                        var onUpdateAsset = event;
                        this.updatePlaceholder(onUpdateAsset.getNewValue());
                    }
                };
                Input.prototype.setBinding = function (attribute) {
                    this.removeBinding();
                    this.attribute = attribute;
                    if (this.isBound()) {
                        this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                    }
                };
                Input.prototype.isBound = function () {
                    return this.attribute !== undefined;
                };
                Input.prototype.getBindingAttribute = function () {
                    return this.attribute;
                };
                Input.prototype.removeBinding = function () {
                    if (this.isBound()) {
                        this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                        this.attribute = undefined;
                    }
                };
                Input.prototype.setValue = function (value) {
                    this.updateValue(value);
                    if (this.isBound()) {
                        this.attribute.setValue(this.getValue());
                    }
                };
                Input.prototype.isTranslated = function () {
                    return this.translation !== undefined && this.placeholder !== undefined;
                };
                Input.prototype.getPlaceholderContent = function () {
                    if (this.placeholderContent !== undefined) {
                        return this.placeholderContent;
                    }
                    return this.placeholder;
                };
                Input.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    if (this.isBound()) {
                        trace["attribute"] = this.attribute.getStackTrace();
                    }
                    else {
                        trace["attribute"] = undefined;
                    }
                    return trace;
                };
                Input.prototype.updatePlaceholder = function (value) {
                    this.placeholderContent = value;
                    this.setAttribute(Input.ATTRIBUTE_PLACEHOLDER, this.getPlaceholderContent());
                };
                Input.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Input.ELEMENT_INPUT);
                    this.addOnUpdateInputEvent();
                };
                Input.prototype.fireOnUpdateInputEvent = function (value) {
                    var event = new OnUpdateInput(this, value);
                    this.notifyObservers(event);
                };
                Input.PARAMETER_ATTRIBUTE = "attribute";
                Input.PARAMETER_PLACEHOLDER = "placeholder";
                Input.ELEMENT_INPUT = "input";
                Input.CLASS_INPUT = "input";
                Input.ATTRIBUTE_TYPE = "type";
                Input.ATTRIBUTE_VALUE = "value";
                Input.ATTRIBUTE_NAME = "name";
                Input.ATTRIBUTE_PLACEHOLDER = "placeholder";
                return Input;
            }(Field.Field));
            Field.Input = Input;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_25) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Creator = Ompluscript.Model.Creator;
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var InputConfiguration = (function (_super) {
                    __extends(InputConfiguration, _super);
                    function InputConfiguration(attributes, type) {
                        attributes.push(Configuration.getInstance(ErrorConfiguration));
                        var configurations = {};
                        configurations[Input.PARAMETER_ATTRIBUTE] = attributes;
                        _super.call(this, configurations);
                        this.type = type;
                    }
                    InputConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, Input.PARAMETER_PLACEHOLDER));
                        var error = this.shouldBeStringOrObjectBoolean(definition, Input.PARAMETER_ATTRIBUTE);
                        if (error === undefined) {
                            if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                                if (!Creator.getInstance().ifDefined(definition[Input.PARAMETER_ATTRIBUTE])) {
                                    errors.push(definition[Input.PARAMETER_ATTRIBUTE] + Configuration.MUST_BE_DEFINED);
                                }
                            }
                            else if (definition[Input.PARAMETER_ATTRIBUTE] !== undefined) {
                                if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "boolean") {
                                    definition[Input.PARAMETER_ATTRIBUTE] = {};
                                }
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                                errors.push.apply(errors, this.getErrorsForChildren(definition, Input.PARAMETER_ATTRIBUTE));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        return this.filterErrors(errors);
                    };
                    InputConfiguration.prototype.createAttribute = function (definition, attribute) {
                        if (attribute === undefined && definition.hasOwnProperty(Input.PARAMETER_ATTRIBUTE)) {
                            if (typeof definition[Input.PARAMETER_ATTRIBUTE] !== "string") {
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                            }
                            attribute = this.createChild(definition, Input.PARAMETER_ATTRIBUTE, Creator.getInstance());
                        }
                        return attribute;
                    };
                    return InputConfiguration;
                }(ComponentConfiguration));
                Field.InputConfiguration = InputConfiguration;
            })(Field = Configuration_25.Field || (Configuration_25.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var CheckBoxInput = (function (_super) {
                __extends(CheckBoxInput, _super);
                function CheckBoxInput(name, booleanAttribute, styles) {
                    if (booleanAttribute === void 0) { booleanAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, booleanAttribute, undefined, styles, CheckBoxInput.INPUT_CHECK_BOX);
                }
                CheckBoxInput.prototype.getValue = function () {
                    return this.htmlElement["checked"];
                };
                CheckBoxInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(CheckBoxInput.EVENT_CHANGE, listener, false);
                };
                CheckBoxInput.prototype.updateValue = function (value) {
                    this.htmlElement["checked"] = value;
                };
                CheckBoxInput.TYPE_CHECK_BOX_INPUT = CheckBoxInput["name"];
                CheckBoxInput.INPUT_CHECK_BOX = "checkbox";
                CheckBoxInput.EVENT_CHANGE = "change";
                return CheckBoxInput;
            }(Field.Input));
            Field.CheckBoxInput = CheckBoxInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_26) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
                var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
                var Boolean = Ompluscript.Model.Attribute.Boolean;
                var CheckBoxInputConfiguration = (function (_super) {
                    __extends(CheckBoxInputConfiguration, _super);
                    function CheckBoxInputConfiguration() {
                        var attributes = [
                            Configuration.getInstance(BooleanConfiguration),
                        ];
                        _super.call(this, attributes, Boolean.TYPE_BOOLEAN);
                    }
                    CheckBoxInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    CheckBoxInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === CheckBoxInput.TYPE_CHECK_BOX_INPUT;
                    };
                    CheckBoxInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new CheckBoxInput(name, attribute, styles);
                    };
                    return CheckBoxInputConfiguration;
                }(Field.InputConfiguration));
                Field.CheckBoxInputConfiguration = CheckBoxInputConfiguration;
            })(Field = Configuration_26.Field || (Configuration_26.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var TextInput = (function (_super) {
                __extends(TextInput, _super);
                function TextInput(name, attribute, placeholder, styles, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = TextInput.INPUT_TEXT; }
                    _super.call(this, name, attribute, placeholder, styles, type);
                }
                TextInput.prototype.getValue = function () {
                    var value = this.getAttribute(Field.Input.ATTRIBUTE_VALUE);
                    if (typeof value === "string") {
                        return value;
                    }
                    return undefined;
                };
                TextInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(TextInput.EVENT_KEY_PRESS, listener, false);
                };
                TextInput.prototype.updateValue = function (value) {
                    this.setAttribute(Field.Input.ATTRIBUTE_VALUE, value);
                };
                TextInput.TYPE_TEXT_INPUT = TextInput["name"];
                TextInput.INPUT_TEXT = "text";
                TextInput.EVENT_KEY_PRESS = "keypress";
                return TextInput;
            }(Field.Input));
            Field.TextInput = TextInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_27) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TextInput = Ompluscript.View.Field.TextInput;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
                var String = Ompluscript.Model.Attribute.String;
                var TextInputConfiguration = (function (_super) {
                    __extends(TextInputConfiguration, _super);
                    function TextInputConfiguration() {
                        var attributes = [
                            Configuration.getInstance(StringConfiguration),
                        ];
                        _super.call(this, attributes, String.TYPE_STRING);
                    }
                    TextInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === TextInput.TYPE_TEXT_INPUT;
                    };
                    TextInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    TextInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new TextInput(name, attribute, placeholder, styles);
                    };
                    return TextInputConfiguration;
                }(Field.InputConfiguration));
                Field.TextInputConfiguration = TextInputConfiguration;
            })(Field = Configuration_27.Field || (Configuration_27.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var EmailInput = (function (_super) {
                __extends(EmailInput, _super);
                function EmailInput(name, stringAttribute, placeholder, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, placeholder, styles, EmailInput.INPUT_EMAIL);
                }
                EmailInput.TYPE_EMAIL_INPUT = EmailInput["name"];
                EmailInput.INPUT_EMAIL = "email";
                return EmailInput;
            }(Field.TextInput));
            Field.EmailInput = EmailInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_28) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var EmailInput = Ompluscript.View.Field.EmailInput;
                var EmailInputConfiguration = (function (_super) {
                    __extends(EmailInputConfiguration, _super);
                    function EmailInputConfiguration() {
                        _super.apply(this, arguments);
                    }
                    EmailInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === EmailInput.TYPE_EMAIL_INPUT;
                    };
                    EmailInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    EmailInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new EmailInput(name, attribute, placeholder, styles);
                    };
                    return EmailInputConfiguration;
                }(Field.TextInputConfiguration));
                Field.EmailInputConfiguration = EmailInputConfiguration;
            })(Field = Configuration_28.Field || (Configuration_28.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var NumberInput = (function (_super) {
                __extends(NumberInput, _super);
                function NumberInput(name, numberAttribute, placeholder, styles) {
                    if (numberAttribute === void 0) { numberAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, numberAttribute, placeholder, styles, NumberInput.INPUT_NUMBER);
                }
                NumberInput.prototype.getValue = function () {
                    var value = this.getAttribute(Field.Input.ATTRIBUTE_VALUE);
                    if (typeof value === "string") {
                        if (isNaN(parseInt(value, 10))) {
                            return value;
                        }
                        return parseInt(value, 10);
                    }
                    return undefined;
                };
                NumberInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_KEY_PRESS, listener, false);
                };
                NumberInput.prototype.updateValue = function (value) {
                    this.setAttribute(Field.Input.ATTRIBUTE_VALUE, value.toString());
                };
                NumberInput.TYPE_NUMBER_INPUT = NumberInput["name"];
                NumberInput.INPUT_NUMBER = "number";
                return NumberInput;
            }(Field.Input));
            Field.NumberInput = NumberInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_29) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
                var Number = Ompluscript.Model.Attribute.Number;
                var NumberInput = Ompluscript.View.Field.NumberInput;
                var NumberInputConfiguration = (function (_super) {
                    __extends(NumberInputConfiguration, _super);
                    function NumberInputConfiguration() {
                        var attributes = [
                            Configuration.getInstance(NumberConfiguration),
                        ];
                        _super.call(this, attributes, Number.TYPE_NUMBER);
                    }
                    NumberInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NumberInput.TYPE_NUMBER_INPUT;
                    };
                    NumberInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    NumberInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new NumberInput(name, attribute, placeholder, styles);
                    };
                    return NumberInputConfiguration;
                }(Field.InputConfiguration));
                Field.NumberInputConfiguration = NumberInputConfiguration;
            })(Field = Configuration_29.Field || (Configuration_29.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var PasswordInput = (function (_super) {
                __extends(PasswordInput, _super);
                function PasswordInput(name, stringAttribute, placeholder, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, placeholder, styles, PasswordInput.INPUT_PASSWORD);
                }
                PasswordInput.TYPE_PASSWORD_INPUT = PasswordInput["name"];
                PasswordInput.INPUT_PASSWORD = "password";
                return PasswordInput;
            }(Field.TextInput));
            Field.PasswordInput = PasswordInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_30) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var PasswordInput = Ompluscript.View.Field.PasswordInput;
                var PasswordInputConfiguration = (function (_super) {
                    __extends(PasswordInputConfiguration, _super);
                    function PasswordInputConfiguration() {
                        _super.apply(this, arguments);
                    }
                    PasswordInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === PasswordInput.TYPE_PASSWORD_INPUT;
                    };
                    PasswordInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    PasswordInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new PasswordInput(name, attribute, placeholder, styles);
                    };
                    return PasswordInputConfiguration;
                }(Field.TextInputConfiguration));
                Field.PasswordInputConfiguration = PasswordInputConfiguration;
            })(Field = Configuration_30.Field || (Configuration_30.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container_9) {
            "use strict";
            var Layout = Ompluscript.View.Layout.Layout;
            var NullLayout = Ompluscript.View.Layout.NullLayout;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, layout, children, styles) {
                    if (layout === void 0) { layout = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.layout = layout;
                    if (this.layout === undefined) {
                        this.layout = new NullLayout();
                    }
                    if (Array.isArray(children)) {
                        for (var i = 0; i < children.length; i++) {
                            this.addChild(children[i]);
                        }
                    }
                    this.removeClass(Layout.CLASS_LAYOUT);
                }
                Container.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Container.PARAMETER_LAYOUT] = this.layout.getStackTrace();
                    return trace;
                };
                Container.prototype.render = function () {
                    this.clear();
                    this.layout.clearChildren();
                    for (var i = 0; i < this.children.length; i++) {
                        this.layout.addChild(this.children[i]);
                    }
                    this.appendChild(this.layout);
                    return this.htmlElement;
                };
                Container.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                Container.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                Container.PARAMETER_LAYOUT = "layout";
                return Container;
            }(Layout));
            Container_9.Container = Container;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event_6) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var PageEvent = (function (_super) {
                __extends(PageEvent, _super);
                function PageEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                PageEvent.ON_PAGE_LOAD = "onPageLoad";
                PageEvent.ON_PAGE_CLOSE = "onPageClose";
                return PageEvent;
            }(Event));
            Event_6.PageEvent = PageEvent;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnPageLoad = (function (_super) {
                __extends(OnPageLoad, _super);
                function OnPageLoad(sender) {
                    _super.call(this, sender, Event.PageEvent.ON_PAGE_LOAD);
                }
                return OnPageLoad;
            }(Event.PageEvent));
            Event.OnPageLoad = OnPageLoad;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnPageClose = (function (_super) {
                __extends(OnPageClose, _super);
                function OnPageClose(sender) {
                    _super.call(this, sender, Event.PageEvent.ON_PAGE_CLOSE);
                }
                return OnPageClose;
            }(Event.PageEvent));
            Event.OnPageClose = OnPageClose;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var OnPageLoad = Ompluscript.View.Event.OnPageLoad;
            var OnPageClose = Ompluscript.View.Event.OnPageClose;
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(name, layout, children, styles) {
                    if (layout === void 0) { layout = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, layout, children, styles);
                    this.addClass(Page.CLASS_PAGE);
                    this.addClass(name);
                    this.active = false;
                }
                Page.prototype.isActive = function () {
                    return this.active;
                };
                Page.prototype.setActive = function (active) {
                    var beforeChange = this.active;
                    this.active = active;
                    if (this.active === true && this.active !== beforeChange) {
                        this.fireOnPageLoadEvent();
                    }
                    else if (this.active === false && this.active !== beforeChange) {
                        this.fireOnPageCloseEvent();
                    }
                };
                Page.prototype.fireOnPageLoadEvent = function () {
                    var event = new OnPageLoad(this);
                    this.notifyObservers(event);
                };
                Page.prototype.fireOnPageCloseEvent = function () {
                    var event = new OnPageClose(this);
                    this.notifyObservers(event);
                };
                Page.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["active"] = this.active;
                    return trace;
                };
                Page.TYPE_PAGE = Page["name"];
                Page.CLASS_PAGE = "page";
                return Page;
            }(Container.Container));
            Container.Page = Page;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Viewport;
        (function (Viewport_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Viewport = (function (_super) {
                __extends(Viewport, _super);
                function Viewport(pages) {
                    if (pages === void 0) { pages = []; }
                    _super.call(this, Viewport.TYPE_VIEWPORT);
                    this.pages = pages;
                    if (pages.length > 0) {
                        this.setActivePageIndex(0);
                    }
                }
                Viewport.prototype.getPageByIndex = function (index) {
                    return this.pages[index];
                };
                Viewport.prototype.findPageIndexByName = function (name) {
                    for (var i = 0; i < this.pages.length; i++) {
                        if (this.pages[i].getName() === name) {
                            return i;
                        }
                    }
                    return undefined;
                };
                Viewport.prototype.setActivePageIndex = function (index) {
                    this.activePageIndex = index;
                    for (var i = 0; i < this.pages.length; i++) {
                        if (this.getPageByIndex(i).isActive() === true) {
                            this.getPageByIndex(i).setActive(false);
                        }
                    }
                    this.getPageByIndex(index).setActive(true);
                };
                Viewport.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["activePageIndex"] = this.activePageIndex;
                    trace[Viewport.PARAMETER_PAGES] = [];
                    for (var i = 0; i < this.pages.length; i++) {
                        trace[Viewport.PARAMETER_PAGES].push(this.pages[i].getStackTrace());
                    }
                    return trace;
                };
                Viewport.prototype.render = function () {
                    this.clear();
                    this.pages[this.activePageIndex].render();
                    this.appendChild(this.pages[this.activePageIndex]);
                    return this.htmlElement;
                };
                Viewport.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                Viewport.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                Viewport.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.body;
                    this.addClass(Viewport.CLASS_VIEWPORT);
                };
                Viewport.TYPE_VIEWPORT = Viewport["name"];
                Viewport.PARAMETER_PAGES = "pages";
                Viewport.CLASS_VIEWPORT = "viewport";
                return Viewport;
            }(Component));
            Viewport_1.Viewport = Viewport;
        })(Viewport = View.Viewport || (View.Viewport = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event_7) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnActionRun = (function (_super) {
                __extends(OnActionRun, _super);
                function OnActionRun(sender, action, parameters) {
                    _super.call(this, sender, OnActionRun.ON_ACTION_RUN);
                    this.action = action;
                    this.parameters = parameters;
                }
                OnActionRun.prototype.getAction = function () {
                    return this.action;
                };
                OnActionRun.prototype.getParameters = function () {
                    return this.parameters;
                };
                OnActionRun.ON_ACTION_RUN = "onActionRun";
                return OnActionRun;
            }(Event));
            Event_7.OnActionRun = OnActionRun;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_5) {
        var Controller;
        (function (Controller) {
            "use strict";
            var Page = Ompluscript.View.Container.Page;
            var Viewport = Ompluscript.View.Viewport.Viewport;
            var OnActionRun = Ompluscript.Controller.Event.OnActionRun;
            var NavigationController = (function (_super) {
                __extends(NavigationController, _super);
                function NavigationController(pages) {
                    _super.call(this, NavigationController.NAVIGATION_CONTROLLER);
                    this.setup(pages);
                }
                NavigationController.prototype.switchPageByName = function (name) {
                    var index = this.viewport.findPageIndexByName(name);
                    this.viewport.setActivePageIndex(index);
                    this.viewport.render();
                };
                NavigationController.prototype.switchPageByIndex = function (index) {
                    this.viewport.setActivePageIndex(index);
                    this.viewport.render();
                };
                NavigationController.prototype.updatePath = function (page, action, parameters) {
                    if (action === void 0) { action = undefined; }
                    if (parameters === void 0) { parameters = undefined; }
                    if (action !== undefined && parameters !== undefined) {
                        var paths = [page, action];
                        for (var i in parameters) {
                            if (parameters.hasOwnProperty(i)) {
                                paths.push(i, parameters[i]);
                            }
                        }
                        this.history.pushState(undefined, page, paths.join(NavigationController.PATH_SEPARATOR));
                    }
                    else {
                        this.history.pushState(undefined, page, page);
                    }
                };
                NavigationController.prototype.showPageFromPath = function (path) {
                    var paths = path.split(NavigationController.PATH_SEPARATOR);
                    var page = paths[0];
                    this.switchPageByName(page);
                    if (paths.length > 1) {
                        var action = paths[1];
                        paths.splice(0, 2);
                        var parameters = {};
                        for (var i = 0; i < paths.length; i += 2) {
                            parameters[paths[i]] = paths[i + 1];
                        }
                        var pageController = this.findControllerByName(page);
                        if (pageController !== undefined) {
                            pageController.runAction(action, parameters);
                        }
                    }
                };
                NavigationController.prototype.findControllerByName = function (name) {
                    for (var i = 0; i < this.pageControllers.length; i++) {
                        if (this.pageControllers[i].getName() === name) {
                            return this.pageControllers[i];
                        }
                    }
                    return undefined;
                };
                NavigationController.prototype.setup = function (pages) {
                    this.pageControllers = [];
                    var pageList = [];
                    for (var i = 0; i < pages.length; i++) {
                        if (pages[i] instanceof Page) {
                            var page = pages[i];
                            var pageController = new Controller.PageController(page.getName(), page);
                            pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                            this.pageControllers.push(pageController);
                            pageList.push(page);
                        }
                        else if (pages[i] instanceof Controller.PageController) {
                            var pageController = pages[i];
                            pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                            this.pageControllers.push(pageController);
                            pageList.push(pageController.getPage());
                        }
                    }
                    this.viewport = new Viewport(pageList);
                    this.history = window.history;
                    var path = location.pathname;
                    path = path.slice(1);
                    if (path.length > 0) {
                        this.showPageFromPath(path);
                    }
                    else {
                        this.switchPageByIndex(0);
                    }
                };
                NavigationController.NAVIGATION_CONTROLLER = "navigationController";
                NavigationController.PATH_SEPARATOR = "/";
                return NavigationController;
            }(Controller.Controller));
            Controller.NavigationController = NavigationController;
        })(Controller = Controller_5.Controller || (Controller_5.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var TextContent = (function (_super) {
                __extends(TextContent, _super);
                function TextContent(name, text, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, styles);
                    this.text = text;
                    if (this.isTranslated()) {
                        this.translation.attachToAsset(text, this);
                    }
                }
                TextContent.prototype.update = function (event) {
                    if (event instanceof OnUpdateAsset && this.isTranslated()) {
                        var onUpdateAsset = event;
                        this.updateText(onUpdateAsset.getNewValue());
                    }
                };
                TextContent.prototype.getTextContent = function () {
                    if (this.textContent !== undefined) {
                        return this.textContent;
                    }
                    return this.text;
                };
                TextContent.prototype.isTranslated = function () {
                    return this.translation !== undefined && this.text !== undefined;
                };
                TextContent.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[TextContent.PARAMETER_TEXT] = this.text;
                    return trace;
                };
                TextContent.prototype.updateText = function (value) {
                    this.textContent = value;
                    this.htmlElement.innerHTML = this.getTextContent();
                };
                TextContent.PARAMETER_TEXT = "text";
                return TextContent;
            }(Field.Field));
            Field.TextContent = TextContent;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Paragraph = (function (_super) {
                __extends(Paragraph, _super);
                function Paragraph(name, text, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Paragraph.CLASS_PARAGRAPH);
                }
                Paragraph.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Paragraph.ELEMENT_PARAGRAPH);
                };
                Paragraph.TYPE_PARAGRAPH = Paragraph["name"];
                Paragraph.CLASS_PARAGRAPH = "paragraph";
                Paragraph.ELEMENT_PARAGRAPH = "p";
                return Paragraph;
            }(Field.TextContent));
            Field.Paragraph = Paragraph;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Header = (function (_super) {
                __extends(Header, _super);
                function Header(name, text, level, styles) {
                    if (level === void 0) { level = Header.LEVEL_FIRST; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, Header.ELEMENT_HEADER + level, text, styles);
                    this.name = name;
                    this.level = level;
                    this.addClass(Header.CLASS_HEADER);
                }
                Header.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Header.PARAMETER_LEVEL] = this.level;
                    return trace;
                };
                Header.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(this.name);
                };
                Header.TYPE_HEADER = Header["name"];
                Header.PARAMETER_LEVEL = "level";
                Header.LEVEL_FIRST = "1";
                Header.LEVEL_SECOND = "2";
                Header.LEVEL_THIRD = "3";
                Header.LEVEL_FOURTH = "4";
                Header.LEVEL_FIFTH = "5";
                Header.LEVEL_SIXTH = "6";
                Header.CLASS_HEADER = "header";
                Header.ELEMENT_HEADER = "h";
                return Header;
            }(Field.TextContent));
            Field.Header = Header;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Header = Ompluscript.View.Field.Header;
            var Paragraph = Ompluscript.View.Field.Paragraph;
            var WrongConfigurationContainer = (function (_super) {
                __extends(WrongConfigurationContainer, _super);
                function WrongConfigurationContainer(error) {
                    var children = [];
                    var title = error[Ompluscript.Core.Configuration.Creator.PARAMETER_TYPE]
                        + ": " + error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME];
                    children.push(new Header(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], title, Header.LEVEL_FIRST));
                    for (var i = 0; i < error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS].length; i++) {
                        var description = error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS][i];
                        children.push(new Paragraph(description, description));
                    }
                    var definition = "<pre>" +
                        JSON.stringify(error[Ompluscript.Core.Configuration.Creator.PARAMETER_DEFINITION], undefined, 2)
                        + "</pre>";
                    children.push(new Paragraph(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], definition));
                    _super.call(this, WrongConfigurationContainer.TYPE_WRONG_CONFIGURATION_CONTAINER, undefined, children);
                    this.addClass(WrongConfigurationContainer.CLASS_WRONG_CONFIGURATION_CONTAINER);
                }
                WrongConfigurationContainer.TYPE_WRONG_CONFIGURATION_CONTAINER = WrongConfigurationContainer["name"];
                WrongConfigurationContainer.CLASS_WRONG_CONFIGURATION_CONTAINER = "wrong-configuration";
                return WrongConfigurationContainer;
            }(Container.Container));
            Container.WrongConfigurationContainer = WrongConfigurationContainer;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event_8) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var ApplicationControllerEvent = (function (_super) {
                __extends(ApplicationControllerEvent, _super);
                function ApplicationControllerEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                ApplicationControllerEvent.ON_APPLICATION_START = "onApplicationStart";
                ApplicationControllerEvent.ON_COMPONENT_LOAD = "onComponentLoad";
                return ApplicationControllerEvent;
            }(Event));
            Event_8.ApplicationControllerEvent = ApplicationControllerEvent;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OnApplicationStart = (function (_super) {
                __extends(OnApplicationStart, _super);
                function OnApplicationStart(sender) {
                    _super.call(this, sender, Event.ApplicationControllerEvent.ON_APPLICATION_START);
                }
                return OnApplicationStart;
            }(Event.ApplicationControllerEvent));
            Event.OnApplicationStart = OnApplicationStart;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OnComponentLoad = (function (_super) {
                __extends(OnComponentLoad, _super);
                function OnComponentLoad(sender, component) {
                    _super.call(this, sender, Event.ApplicationControllerEvent.ON_COMPONENT_LOAD);
                    this.component = component;
                }
                OnComponentLoad.prototype.getComponent = function () {
                    return this.component;
                };
                return OnComponentLoad;
            }(Event.ApplicationControllerEvent));
            Event.OnComponentLoad = OnComponentLoad;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_6) {
        var Controller;
        (function (Controller) {
            "use strict";
            var Page = Ompluscript.View.Container.Page;
            var OnApplicationStart = Ompluscript.Controller.Event.OnApplicationStart;
            var OnComponentLoad = Ompluscript.Controller.Event.OnComponentLoad;
            var ApplicationControllerEvent = Ompluscript.Controller.Event.ApplicationControllerEvent;
            var WrongConfigurationContainer = Ompluscript.View.Container.WrongConfigurationContainer;
            var ApplicationController = (function (_super) {
                __extends(ApplicationController, _super);
                function ApplicationController(components) {
                    _super.call(this, ApplicationController.TYPE_APPLICATION_CONTROLLER);
                    this.components = {};
                    for (var i = 0; i < components.length; i++) {
                        this.components[components[i]] = undefined;
                    }
                    window.addEventListener("load", this.setup.bind(this));
                }
                ApplicationController.prototype.attachOnApplicationStartEvent = function (handler) {
                    this.attachEventHandler(this, ApplicationControllerEvent.ON_APPLICATION_START, handler);
                };
                ApplicationController.prototype.attachOnComponentLoadEvent = function (handler) {
                    this.attachEventHandler(this, ApplicationControllerEvent.ON_COMPONENT_LOAD, handler);
                };
                ApplicationController.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[ApplicationController.PARAMETER_COMPONENTS] = this.components;
                    trace[ApplicationController.PARAMETER_NAVIGATION_CONTROLLER] = this.navigationController;
                    return trace;
                };
                ApplicationController.prototype.setup = function () {
                    var that = this;
                    var _loop_1 = function(key) {
                        if (that.components.hasOwnProperty(key)) {
                            var ajax_1 = new XMLHttpRequest();
                            var source = ApplicationController.COMPONENTS_FOLDER + key + ".js";
                            var listener = function () {
                                if (ajax_1.readyState === ajax_1.DONE && ajax_1.status === 200) {
                                    that.execute(key, ajax_1.responseText, true);
                                }
                                else if (ajax_1.readyState === ajax_1.DONE) {
                                    that.execute(key, undefined, false);
                                }
                            };
                            ajax_1.addEventListener("readystatechange", listener, false);
                            ajax_1.open("GET", source, true);
                            ajax_1.send();
                        }
                    };
                    for (var key in that.components) {
                        _loop_1(key);
                    }
                };
                ApplicationController.prototype.execute = function (name, content, status) {
                    this.components[name] = status;
                    if (status === true) {
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        script.text = content;
                        document.head.appendChild(script);
                        document.head.removeChild(script);
                        if (this.isValidConfiguration()) {
                            this.fireOnComponentLoadEvent(name);
                        }
                    }
                    var numberOfUndefined = 0;
                    var numberOfFalse = 0;
                    for (var key in this.components) {
                        if (this.components.hasOwnProperty(key)) {
                            if (this.components[key] === undefined) {
                                numberOfUndefined++;
                            }
                            else if (this.components[key] === false) {
                                numberOfFalse++;
                            }
                        }
                    }
                    if (numberOfFalse === 0 && numberOfUndefined === 0) {
                        this.launch();
                    }
                    else if (numberOfFalse > 0 && numberOfUndefined === 0) {
                        this.exit();
                    }
                };
                ApplicationController.prototype.launch = function () {
                    var pages = [];
                    if (this.isValidConfiguration()) {
                        var pageNames = Ompluscript.View.Creator.getInstance().getPages();
                        for (var i = 0; i < pageNames.length; i++) {
                            pages.push(Ompluscript.View.Creator.getInstance().create(pageNames[i]));
                        }
                    }
                    else {
                        var components = [];
                        var creators = [
                            Ompluscript.Model.Creator.getInstance(),
                            Ompluscript.View.Creator.getInstance(),
                            Ompluscript.Controller.Creator.getInstance(),
                        ];
                        for (var i = 0; i < creators.length; i++) {
                            components.push.apply(components, this.createWrongConfigurationContainers(creators[i]));
                        }
                        pages = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, undefined, components)];
                    }
                    this.navigationController = new Controller.NavigationController(pages);
                    if (this.isValidConfiguration()) {
                        this.fireOnApplicationStartEvent();
                    }
                };
                ApplicationController.prototype.exit = function () {
                    var components = [];
                    for (var key in this.components) {
                        if (this.components.hasOwnProperty(key)) {
                            components.push(new WrongConfigurationContainer({
                                definition: this.components,
                                errors: [ApplicationController.COMPONENTS_FOLDER + key + ".js not found"],
                                name: ApplicationController.COMPONENTS_FOLDER + key + ".js",
                                type: "Script",
                            }));
                        }
                    }
                    var pages = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, undefined, components)];
                    this.navigationController = new Controller.NavigationController(pages);
                };
                ApplicationController.prototype.isValidConfiguration = function () {
                    return !Ompluscript.View.Creator.getInstance().hasErrors()
                        && !Ompluscript.Model.Creator.getInstance().hasErrors()
                        && !Ompluscript.Controller.Creator.getInstance().hasErrors();
                };
                ApplicationController.prototype.createWrongConfigurationContainers = function (creator) {
                    var components = [];
                    var errors = creator.getErrors();
                    for (var i = 0; i < errors.length; i++) {
                        components.push(new WrongConfigurationContainer(errors[i]));
                    }
                    return components;
                };
                ApplicationController.prototype.fireOnApplicationStartEvent = function () {
                    var event = new OnApplicationStart(this);
                    this.notifyObservers(event);
                };
                ApplicationController.prototype.fireOnComponentLoadEvent = function (component) {
                    var event = new OnComponentLoad(this, component);
                    this.notifyObservers(event);
                };
                ApplicationController.TYPE_APPLICATION_CONTROLLER = ApplicationController["name"];
                ApplicationController.PARAMETER_COMPONENTS = "components";
                ApplicationController.PARAMETER_NAVIGATION_CONTROLLER = "navigationController";
                ApplicationController.PARAMETER_ON_APPLICATION_START = "onApplicationStart";
                ApplicationController.PARAMETER_ON_COMPONENT_LOAD = "onComponentLoad";
                ApplicationController.COMPONENTS_FOLDER = "app/";
                return ApplicationController;
            }(Controller.Controller));
            Controller.ApplicationController = ApplicationController;
        })(Controller = Controller_6.Controller || (Controller_6.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_7) {
        var Configuration;
        (function (Configuration_31) {
            var Controller;
            (function (Controller_8) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
                var Controller = Ompluscript.Controller.Controller.Controller;
                var ApplicationControllerConfiguration = (function (_super) {
                    __extends(ApplicationControllerConfiguration, _super);
                    function ApplicationControllerConfiguration() {
                        _super.call(this, undefined);
                    }
                    ApplicationControllerConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === ApplicationController.TYPE_APPLICATION_CONTROLLER;
                    };
                    ApplicationControllerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, ApplicationController.PARAMETER_COMPONENTS));
                        if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                            errors.push(this.shouldBeFunction(definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_APPLICATION_START));
                            errors.push(this.shouldBeFunction(definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_COMPONENT_LOAD));
                        }
                        return this.filterErrors(errors);
                    };
                    ApplicationControllerConfiguration.prototype.create = function (definition) {
                        var components = definition[ApplicationController.PARAMETER_COMPONENTS];
                        var applicationController = new ApplicationController(components);
                        if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                            var onApplicationStart = definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_APPLICATION_START];
                            if (onApplicationStart !== undefined) {
                                applicationController.attachOnApplicationStartEvent(onApplicationStart);
                            }
                            var onComponentLoad = definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_COMPONENT_LOAD];
                            if (onComponentLoad !== undefined) {
                                applicationController.attachOnComponentLoadEvent(onComponentLoad);
                            }
                        }
                        return applicationController;
                    };
                    return ApplicationControllerConfiguration;
                }(Controller_8.ControllerConfiguration));
                Controller_8.ApplicationControllerConfiguration = ApplicationControllerConfiguration;
            })(Controller = Configuration_31.Controller || (Configuration_31.Controller = {}));
        })(Configuration = Controller_7.Configuration || (Controller_7.Configuration = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_9) {
        var Controller;
        (function (Controller) {
            "use strict";
            var ComponentController = (function (_super) {
                __extends(ComponentController, _super);
                function ComponentController(name, models, views) {
                    if (models === void 0) { models = {}; }
                    if (views === void 0) { views = {}; }
                    _super.call(this, name);
                    this.models = models;
                    this.views = views;
                }
                ComponentController.prototype.getModel = function (name) {
                    if (this.models.hasOwnProperty(name)) {
                        return this.models[name];
                    }
                    return undefined;
                };
                ComponentController.prototype.getView = function (name) {
                    if (this.views.hasOwnProperty(name)) {
                        return this.views[name];
                    }
                    return undefined;
                };
                return ComponentController;
            }(Controller.Controller));
            Controller.ComponentController = ComponentController;
        })(Controller = Controller_9.Controller || (Controller_9.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_10) {
        var Controller;
        (function (Controller) {
            "use strict";
            var OnActionRun = Ompluscript.Controller.Event.OnActionRun;
            var PageController = (function (_super) {
                __extends(PageController, _super);
                function PageController(name, page) {
                    _super.call(this, name);
                    this.page = page;
                    this.actions = {};
                }
                PageController.prototype.getPage = function () {
                    return this.page;
                };
                PageController.prototype.addAction = function (action, method) {
                    this.actions[action] = method;
                };
                PageController.prototype.runAction = function (action, parameters) {
                    if (parameters === void 0) { parameters = {}; }
                    if (this.actions.hasOwnProperty(action)) {
                        var names = this.getActionParamameterNames(this.actions[action]);
                        var values = [];
                        for (var i = 0; i < names.length; i++) {
                            if (parameters.hasOwnProperty(names[i])) {
                                values.push(parameters[names[i]]);
                            }
                            else {
                                values.push(undefined);
                            }
                        }
                        this.actions[action].apply(this, values);
                        this.fireOnActionRunEvent(action, parameters);
                    }
                };
                PageController.prototype.fireOnActionRunEvent = function (action, parameters) {
                    var event = new OnActionRun(this, action, parameters);
                    this.notifyObservers(event);
                };
                PageController.prototype.getActionParamameterNames = function (action) {
                    var definition = action.toString();
                    return definition.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
                };
                return PageController;
            }(Controller.Controller));
            Controller.PageController = PageController;
        })(Controller = Controller_10.Controller || (Controller_10.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
        var ApplicationControllerConfiguration = Ompluscript.Controller.Configuration.Controller.ApplicationControllerConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    Configuration.getInstance(ApplicationControllerConfiguration),
                    Configuration.getInstance(ErrorConfiguration),
                ];
                _super.call(this, configurations);
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            return Creator;
        }(CreatorParent));
        Controller.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        Controller.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        Controller.create = create;
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    "use strict";
    var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    var Configuration = Ompluscript.Core.Configuration.Configuration;
    var Creator = Ompluscript.Controller.Creator;
    function application(definition) {
        if (definition === void 0) { definition = {}; }
        definition[Configuration.PARAMETER_TYPE] = ApplicationController.TYPE_APPLICATION_CONTROLLER;
        Creator.getInstance().define(definition);
        Creator.getInstance().create(ApplicationController.TYPE_APPLICATION_CONTROLLER);
    }
    Ompluscript.application = application;
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var DateInput = (function (_super) {
                __extends(DateInput, _super);
                function DateInput(name, datetimeAttribute, placeholder, styles) {
                    if (datetimeAttribute === void 0) { datetimeAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, datetimeAttribute, placeholder, styles, DateInput.INPUT_DATE);
                }
                DateInput.TYPE_DATE_INPUT = DateInput["name"];
                DateInput.INPUT_DATE = "date";
                return DateInput;
            }(Field.TextInput));
            Field.DateInput = DateInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_32) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var DateInput = Ompluscript.View.Field.DateInput;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
                var Datetime = Ompluscript.Model.Attribute.Datetime;
                var DateInputConfiguration = (function (_super) {
                    __extends(DateInputConfiguration, _super);
                    function DateInputConfiguration() {
                        var attributes = [
                            Configuration.getInstance(DatetimeConfiguration),
                        ];
                        _super.call(this, attributes, Datetime.TYPE_DATETIME);
                    }
                    DateInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === DateInput.TYPE_DATE_INPUT;
                    };
                    DateInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    DateInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new DateInput(name, attribute, placeholder, styles);
                    };
                    return DateInputConfiguration;
                }(Field.InputConfiguration));
                Field.DateInputConfiguration = DateInputConfiguration;
            })(Field = Configuration_32.Field || (Configuration_32.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration) {
            var Field;
            (function (Field) {
                "use strict";
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var TextContent = Ompluscript.View.Field.TextContent;
                var TextContentConfiguration = (function (_super) {
                    __extends(TextContentConfiguration, _super);
                    function TextContentConfiguration() {
                        _super.call(this, undefined);
                    }
                    TextContentConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, TextContent.PARAMETER_TEXT));
                        return this.filterErrors(errors);
                    };
                    return TextContentConfiguration;
                }(ComponentConfiguration));
                Field.TextContentConfiguration = TextContentConfiguration;
            })(Field = Configuration.Field || (Configuration.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_33) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Paragraph = Ompluscript.View.Field.Paragraph;
                var TextContent = Ompluscript.View.Field.TextContent;
                var ParagraphConfiguration = (function (_super) {
                    __extends(ParagraphConfiguration, _super);
                    function ParagraphConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ParagraphConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Paragraph.TYPE_PARAGRAPH;
                    };
                    ParagraphConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    ParagraphConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new Paragraph(name, text, styles);
                    };
                    return ParagraphConfiguration;
                }(Field.TextContentConfiguration));
                Field.ParagraphConfiguration = ParagraphConfiguration;
            })(Field = Configuration_33.Field || (Configuration_33.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_34) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var TextContent = Ompluscript.View.Field.TextContent;
                var Header = Ompluscript.View.Field.Header;
                var HeaderConfiguration = (function (_super) {
                    __extends(HeaderConfiguration, _super);
                    function HeaderConfiguration() {
                        _super.apply(this, arguments);
                    }
                    HeaderConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Header.TYPE_HEADER;
                    };
                    HeaderConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, Header.PARAMETER_LEVEL));
                        if (typeof definition[Header.PARAMETER_LEVEL] === "string") {
                            var values = [
                                Header.LEVEL_FIRST,
                                Header.LEVEL_SECOND,
                                Header.LEVEL_THIRD,
                                Header.LEVEL_FOURTH,
                                Header.LEVEL_FIFTH,
                                Header.LEVEL_SIXTH,
                            ];
                            errors.push(this.mustBeValue(definition, Header.PARAMETER_LEVEL, values));
                        }
                        return this.filterErrors(errors);
                    };
                    HeaderConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var level = definition[Header.PARAMETER_LEVEL];
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new Header(name, text, level, styles);
                    };
                    return HeaderConfiguration;
                }(Field.TextContentConfiguration));
                Field.HeaderConfiguration = HeaderConfiguration;
            })(Field = Configuration_34.Field || (Configuration_34.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_35) {
            var Container;
            (function (Container_10) {
                "use strict";
                var Container = Ompluscript.View.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
                var RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
                var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
                var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
                var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
                var ContainerConfiguration = (function (_super) {
                    __extends(ContainerConfiguration, _super);
                    function ContainerConfiguration() {
                        var layouts = [
                            Configuration.getInstance(NullLayoutConfiguration),
                            Configuration.getInstance(RelativeLayoutConfiguration),
                            Configuration.getInstance(LinearLayoutConfiguration),
                            Configuration.getInstance(TableLayoutConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var children = [
                            Configuration.getInstance(CheckBoxInputConfiguration),
                            Configuration.getInstance(EmailInputConfiguration),
                            Configuration.getInstance(NumberInputConfiguration),
                            Configuration.getInstance(PasswordInputConfiguration),
                            Configuration.getInstance(TextInputConfiguration),
                            Configuration.getInstance(DateInputConfiguration),
                            Configuration.getInstance(ParagraphConfiguration),
                            Configuration.getInstance(HeaderConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_LAYOUT] = layouts;
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        _super.call(this, configurations);
                    }
                    ContainerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
                        errors = this.filterErrors(errors);
                        if (Array.isArray(definition[Container.PARAMETER_CHILDREN])) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()));
                        }
                        errors.push(this.shouldBeObject(definition, Container.PARAMETER_LAYOUT));
                        if (typeof definition[Container.PARAMETER_LAYOUT] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_LAYOUT));
                        }
                        return this.filterErrors(errors);
                    };
                    return ContainerConfiguration;
                }(ComponentConfiguration));
                Container_10.ContainerConfiguration = ContainerConfiguration;
            })(Container = Configuration_35.Container || (Configuration_35.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_36) {
            var Container;
            (function (Container_11) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Page = Ompluscript.View.Container.Page;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var PageConfiguration = (function (_super) {
                    __extends(PageConfiguration, _super);
                    function PageConfiguration() {
                        _super.apply(this, arguments);
                    }
                    PageConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
                    };
                    PageConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    PageConfiguration.prototype.create = function (definition, children) {
                        if (children === void 0) { children = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        var layout = _super.prototype.createChild.call(this, definition, Container.PARAMETER_LAYOUT);
                        if (children === undefined) {
                            children = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance());
                        }
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new Page(name, layout, children, styles);
                    };
                    return PageConfiguration;
                }(Container_11.ContainerConfiguration));
                Container_11.PageConfiguration = PageConfiguration;
            })(Container = Configuration_36.Container || (Configuration_36.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_37) {
            var Viewport;
            (function (Viewport_2) {
                "use strict";
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var Viewport = Ompluscript.View.Viewport.Viewport;
                var ViewportConfiguration = (function (_super) {
                    __extends(ViewportConfiguration, _super);
                    function ViewportConfiguration() {
                        var pages = [
                            Configuration.getInstance(PageConfiguration),
                            Configuration.getInstance(ErrorConfiguration),
                        ];
                        var configurations = {};
                        configurations[Viewport.PARAMETER_PAGES] = pages;
                        _super.call(this, configurations);
                    }
                    ViewportConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Viewport.TYPE_VIEWPORT;
                    };
                    ViewportConfiguration.prototype.getErrors = function (definition) {
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, Viewport.PARAMETER_PAGES));
                        if (Array.isArray(definition[Viewport.PARAMETER_PAGES])) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Viewport.PARAMETER_PAGES, Ompluscript.View.Creator.getInstance()));
                        }
                        return this.filterErrors(errors);
                    };
                    ViewportConfiguration.prototype.create = function (definition, pages) {
                        if (pages === void 0) { pages = undefined; }
                        if (pages === undefined) {
                            pages = this.createChildren(definition, Viewport.PARAMETER_PAGES, Ompluscript.View.Creator.getInstance());
                        }
                        return new Viewport(pages);
                    };
                    return ViewportConfiguration;
                }(ComponentConfiguration));
                Viewport_2.ViewportConfiguration = ViewportConfiguration;
            })(Viewport = Configuration_37.Viewport || (Configuration_37.Viewport = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
        var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
        var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
        var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
        var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
        var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
        var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
        var Page = Ompluscript.View.Container.Page;
        var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
        var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    Configuration.getInstance(CheckBoxInputConfiguration),
                    Configuration.getInstance(EmailInputConfiguration),
                    Configuration.getInstance(NumberInputConfiguration),
                    Configuration.getInstance(PasswordInputConfiguration),
                    Configuration.getInstance(TextInputConfiguration),
                    Configuration.getInstance(DateInputConfiguration),
                    Configuration.getInstance(ParagraphConfiguration),
                    Configuration.getInstance(HeaderConfiguration),
                    Configuration.getInstance(PageConfiguration),
                ];
                _super.call(this, configurations);
                this.pages = [];
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            Creator.prototype.define = function (definition) {
                _super.prototype.define.call(this, definition);
                if (definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE) {
                    this.pages.push(definition[Configuration.PARAMETER_NAME]);
                }
            };
            Creator.prototype.getPages = function () {
                return this.pages;
            };
            return Creator;
        }(CreatorParent));
        View.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        View.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        View.create = create;
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
