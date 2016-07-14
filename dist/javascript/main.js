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
    var Contoller;
    (function (Contoller) {
        var Controller;
        (function (Controller_1) {
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
                    if (!this.handlers.hasOwnProperty(event.getSender().getName())) {
                        if (!this.handlers[event.getSender().getName()].hasOwnProperty(event.getType())) {
                            var handlers = this.handlers[event.getSender().getName()][event.getType()];
                            for (var i = 0; i < handlers.length; i++) {
                                handlers[i].bind(this)();
                            }
                        }
                    }
                };
                Controller.prototype.getName = function () {
                    return this.name;
                };
                Controller.prototype.getStackTrace = function () {
                    return undefined;
                };
                return Controller;
            }(Observable));
            Controller_1.Controller = Controller;
        })(Controller = Contoller.Controller || (Contoller.Controller = {}));
    })(Contoller = Ompluscript.Contoller || (Ompluscript.Contoller = {}));
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
                Component.STYLE_WIDTH = "width";
                Component.STYLE_HEIGHT = "height";
                return Component;
            }(Observable));
            Component_1.Component = Component;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component) {
            "use strict";
            var Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout(name, styles) {
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.children = [];
                }
                Layout.prototype.addChild = function (component) {
                    this.children.push(component);
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
                Layout.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Layout.DIV_ELEMENT);
                    this.addClass(Layout.LAYOUT_CLASS);
                };
                Layout.DIV_ELEMENT = "div";
                Layout.LAYOUT_CLASS = "layout";
                return Layout;
            }(Component.Component));
            Component.Layout = Layout;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout_1) {
            "use strict";
            var Layout = Ompluscript.View.Component.Layout;
            var NullLayout = (function (_super) {
                __extends(NullLayout, _super);
                function NullLayout() {
                    _super.call(this, NullLayout.NULL_LAYOUT_CLASS);
                }
                NullLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                NullLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                NullLayout.prototype.initializeHtmlElement = function () {
                    _super.prototype.initializeHtmlElement.call(this);
                    this.addClass(NullLayout.NULL_LAYOUT_CLASS);
                };
                NullLayout.TYPE_NULL_LAYOUT = NullLayout["name"];
                NullLayout.NULL_LAYOUT_CLASS = "null-layout";
                return NullLayout;
            }(Layout));
            Layout_1.NullLayout = NullLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
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
                Configuration.prototype.shouldBeStringOrObject = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeBoolean = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "boolean") {
                        return this.getName(definition, key) + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED;
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
                    return definition[Configuration.PARAMETER_NAME] + "." + key;
                };
                Configuration.IS_WRONG_CONFIGURATION = "Is wrong configuration.";
                Configuration.HAS_WRONG_VALUE = " has wrong value.";
                Configuration.MUST_BE_STRING = " must be a string.";
                Configuration.MUST_BE_STRING_OR_UNDEFINED = " must be a string or undefined.";
                Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED = " must be a string or object or undefined.";
                Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED = " must be a boolean or undefined.";
                Configuration.MUST_BE_NUMBER_OR_UNDEFINED = " must be a number or undefined.";
                Configuration.MUST_BE_REGEX_OR_UNDEFINED = " must be a regex object or undefined.";
                Configuration.MUST_BE_DATETIME_OR_UNDEFINED = " must be in datetime format or undefined.";
                Configuration.MUST_BE_ARRAY_OR_UNDEFINED = " must be an array object or undefined.";
                Configuration.MUST_BE_OBJECT_OR_UNDEFINED = " must be an object or undefined.";
                Configuration.MUST_BE_GREATER = " must be greater than ";
                Configuration.MODEL_MUST_BE_DEFINED = " model must be defined ";
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
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_2) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Component = Ompluscript.View.Component.Component;
            var ComponentConfiguration = (function (_super) {
                __extends(ComponentConfiguration, _super);
                function ComponentConfiguration() {
                    _super.apply(this, arguments);
                }
                ComponentConfiguration.prototype.getErrors = function (definition) {
                    var errors = [];
                    errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                    errors.push(this.shouldBeBoolean(definition, Component.PARAMETER_STYLES));
                    return this.filterErrors(errors);
                };
                return ComponentConfiguration;
            }(Configuration));
            Configuration_2.ComponentConfiguration = ComponentConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_3) {
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
            }(Configuration_3.ComponentConfiguration));
            Configuration_3.NullLayoutConfiguration = NullLayoutConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout_2) {
            "use strict";
            var Layout = Ompluscript.View.Component.Layout;
            var RelativeLayout = (function (_super) {
                __extends(RelativeLayout, _super);
                function RelativeLayout() {
                    _super.call(this, RelativeLayout.RELATIVE_LAYOUT_CLASS);
                }
                RelativeLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                RelativeLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                RelativeLayout.prototype.initializeHtmlElement = function () {
                    _super.prototype.initializeHtmlElement.call(this);
                    this.addClass(RelativeLayout.RELATIVE_LAYOUT_CLASS);
                };
                RelativeLayout.TYPE_RELATIVE_LAYOUT = RelativeLayout["name"];
                RelativeLayout.RELATIVE_LAYOUT_CLASS = "relative-layout";
                return RelativeLayout;
            }(Layout));
            Layout_2.RelativeLayout = RelativeLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_4) {
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
            }(Configuration_4.ComponentConfiguration));
            Configuration_4.RelativeLayoutConfiguration = RelativeLayoutConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout_3) {
            "use strict";
            var Layout = Ompluscript.View.Component.Layout;
            var LinearLayout = (function (_super) {
                __extends(LinearLayout, _super);
                function LinearLayout(direction, reverse, align) {
                    if (direction === void 0) { direction = LinearLayout.DIRECTION_HORIZONTAL; }
                    if (reverse === void 0) { reverse = false; }
                    if (align === void 0) { align = LinearLayout.ALIGN_START; }
                    _super.call(this, LinearLayout.LINEAR_LAYOUT_CLASS);
                    if (direction === undefined) {
                        direction = LinearLayout.DIRECTION_HORIZONTAL;
                    }
                    if (reverse !== true) {
                        reverse = false;
                    }
                    if (align === undefined) {
                        align = LinearLayout.ALIGN_START;
                    }
                    this.setUpLayout(direction, reverse, align);
                }
                LinearLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                LinearLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                LinearLayout.prototype.initializeHtmlElement = function () {
                    _super.prototype.initializeHtmlElement.call(this);
                    this.addClass(LinearLayout.LINEAR_LAYOUT_CLASS);
                };
                LinearLayout.prototype.setUpLayout = function (direction, reverse, align) {
                    this.addClass(LinearLayout.CLASS_PREFIX + direction);
                    this.addClass(LinearLayout.CLASS_PREFIX + align);
                    if (reverse === true) {
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
                LinearLayout.LINEAR_LAYOUT_CLASS = "linear-layout";
                LinearLayout.CLASS_PREFIX = "flex-";
                LinearLayout.CLASS_REVERSE = "flex-";
                return LinearLayout;
            }(Layout));
            Layout_3.LinearLayout = LinearLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_5) {
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
                        var values = [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL];
                        errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_DIRECTION, values));
                    }
                    else {
                        errors.push(error);
                    }
                    error = this.shouldBeString(definition, LinearLayout.PARAMETER_ALIGN);
                    if (error === undefined) {
                        var values = [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END];
                        errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_ALIGN, values));
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
            }(Configuration_5.ComponentConfiguration));
            Configuration_5.LinearLayoutConfiguration = LinearLayoutConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var TableLayout = (function (_super) {
                __extends(TableLayout, _super);
                function TableLayout(rows, cells) {
                    if (rows === void 0) { rows = 1; }
                    if (cells === void 0) { cells = 1; }
                    _super.call(this, Layout.LinearLayout.DIRECTION_VERTICAL, false, Layout.LinearLayout.ALIGN_CENTER);
                    this.rows = rows;
                    this.cells = cells;
                    if (this.rows === undefined) {
                        this.rows = 1;
                    }
                    if (this.cells === undefined) {
                        this.cells = 1;
                    }
                    for (var i = 0; i < this.rows; i++) {
                        var layout = new Layout.LinearLayout();
                        for (var j = 0; j < this.cells; j++) {
                            var container = new Layout.NullLayout();
                            container.setStyle(Component.STYLE_WIDTH, "calc(100% / " + this.cells + ")");
                            container.setStyle(Component.STYLE_HEIGHT, "1px");
                            layout.addChild(container);
                        }
                        this.addChild(layout);
                    }
                }
                TableLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                TableLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                TableLayout.prototype.initializeHtmlElement = function () {
                    _super.prototype.initializeHtmlElement.call(this);
                    this.addClass(Layout.LinearLayout.LINEAR_LAYOUT_CLASS);
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
        (function (Configuration_6) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var TableLayout = Ompluscript.View.Layout.TableLayout;
            var TableLayoutConfiguration = (function (_super) {
                __extends(TableLayoutConfiguration, _super);
                function TableLayoutConfiguration() {
                    _super.apply(this, arguments);
                }
                TableLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === TableLayout.TYPE_LINEAR_LAYOUT;
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
            }(Configuration_6.ComponentConfiguration));
            Configuration_6.TableLayoutConfiguration = TableLayoutConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component) {
            "use strict";
            var Field = (function (_super) {
                __extends(Field, _super);
                function Field(name, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, styles);
                }
                Field.prototype.render = function () {
                    return this.htmlElement;
                };
                return Field;
            }(Component.Component));
            Component.Field = Field;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_1) {
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
            Event_1.AttributeEvent = AttributeEvent;
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
                    this.required = false;
                    if (required === true) {
                        this.required = true;
                    }
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
    var View;
    (function (View) {
        var Event;
        (function (Event_2) {
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
            Event_2.OnUpdateInput = OnUpdateInput;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field_1) {
            "use strict";
            var Field = Ompluscript.View.Component.Field;
            var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
            var Input = (function (_super) {
                __extends(Input, _super);
                function Input(name, attribute, styles, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = undefined; }
                    _super.call(this, name, styles);
                    this.setAttribute(Input.ATTRIBUTE_TYPE, type);
                    this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
                    this.addClass(Input.FIELD_INPUT);
                    this.attribute = undefined;
                    this.setBinding(attribute);
                    this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
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
                Input.prototype.removeBinding = function () {
                    if (this.isBound()) {
                        this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                        this.attribute = undefined;
                    }
                };
                Input.prototype.setValue = function (value) {
                    this.updateValue(value);
                    if (this.isBound()) {
                        this.attribute.setValue(value);
                    }
                };
                Input.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Input.FIELD_INPUT);
                    this.addOnUpdateInputEvent();
                };
                Input.prototype.fireOnUpdateInputEvent = function (value) {
                    var event = new OnUpdateInput(this, value);
                    this.notifyObservers(event);
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
                Input.PARAMETER_ATTRIBUTE = "attribute";
                Input.FIELD_INPUT = "input";
                Input.ATTRIBUTE_TYPE = "type";
                Input.ATTRIBUTE_VALUE = "value";
                Input.ATTRIBUTE_NAME = "name";
                return Input;
            }(Field));
            Field_1.Input = Input;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
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
                        this.definition[definition[ConfigurationClass.PARAMETER_NAME]] = {
                            definition: definition,
                            name: definition[ConfigurationClass.PARAMETER_NAME],
                            type: definition[ConfigurationClass.PARAMETER_TYPE],
                        };
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
                return Creator;
            }());
            Configuration.Creator = Creator;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_7) {
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
            Configuration_7.ErrorConfiguration = ErrorConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_8) {
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
            Configuration_8.AttributeConfiguration = AttributeConfiguration;
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
                    this.mustBeTrue = false;
                    if (mustBeTrue === true) {
                        this.mustBeTrue = true;
                    }
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
        (function (Configuration_9) {
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
            }(Configuration_9.AttributeConfiguration));
            Configuration_9.BooleanConfiguration = BooleanConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_2) {
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
                Datetime.TYPE_DATETIME = Datetime["name"];
                return Datetime;
            }(Attribute));
            Attribute_2.Datetime = Datetime;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_10) {
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
                    errors.push(this.shouldBeDatetime(definition, Attribute.PARAMETER_MINIMUM));
                    errors.push(this.shouldBeDatetime(definition, Attribute.PARAMETER_MAXIMUM));
                    errors = this.filterErrors(errors);
                    if (errors.length === 0) {
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
            }(Configuration_10.AttributeConfiguration));
            Configuration_10.DatetimeConfiguration = DatetimeConfiguration;
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
            }(Configuration.AttributeConfiguration));
            Configuration.ChoiceConfiguration = ChoiceConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_3) {
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
                                this.error = Attribute_3.Choice.ERROR_VALUE_NOT_ALLOWED;
                                return false;
                            }
                        }
                    }
                    return true;
                };
                MultipleChoice.TYPE_MULTIPLE_CHOICE = MultipleChoice["name"];
                return MultipleChoice;
            }(Attribute_3.Choice));
            Attribute_3.MultipleChoice = MultipleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_11) {
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
                MultipleChoiceConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var choices = definition[Choice.PARAMETER_CHOICES];
                    return new MultipleChoice(name, value, required, choices);
                };
                return MultipleChoiceConfiguration;
            }(Configuration_11.ChoiceConfiguration));
            Configuration_11.MultipleChoiceConfiguration = MultipleChoiceConfiguration;
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
                    this.includeMinimum = false;
                    if (includeMinimum === true) {
                        this.includeMinimum = true;
                    }
                    this.includeMaximum = false;
                    if (includeMaximum === true) {
                        this.includeMaximum = true;
                    }
                }
                Number.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Number.prototype.getMaximum = function () {
                    return this.maximum;
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
                Number.PARAMETER_INCLUDE_MINIMUM = "includeMinimum";
                Number.PARAMETER_INCLUDE_MAXIMUM = "includeMaximum";
                Number.TYPE_NUMBER = Number["name"];
                return Number;
            }(Attribute));
            Attribute_4.Number = Number;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_12) {
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
            }(Configuration_12.AttributeConfiguration));
            Configuration_12.NumberConfiguration = NumberConfiguration;
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
        (function (Configuration_13) {
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
                SingleChoiceConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var choices = definition[Choice.PARAMETER_CHOICES];
                    return new SingleChoice(name, value, required, choices);
                };
                return SingleChoiceConfiguration;
            }(Configuration_13.ChoiceConfiguration));
            Configuration_13.SingleChoiceConfiguration = SingleChoiceConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
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
        var Configuration;
        (function (Configuration_14) {
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
            }(Configuration_14.AttributeConfiguration));
            Configuration_14.StringConfiguration = StringConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_15) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var GroupConfiguration = (function (_super) {
                __extends(GroupConfiguration, _super);
                function GroupConfiguration(configurations) {
                    _super.call(this);
                    this.configurations = configurations;
                }
                GroupConfiguration.prototype.getErrors = function (definition, key) {
                    if (key === void 0) { key = undefined; }
                    var errors = [];
                    if (this.configurations.hasOwnProperty(key)) {
                        var configuration = this.configurations[key];
                        if (definition.hasOwnProperty(key)) {
                            for (var i = 0; i < definition[key].length; i++) {
                                for (var j = 0; j < configuration.length; j++) {
                                    if (configuration[j].isRelatedTo(definition[key][i])) {
                                        errors.push.apply(errors, configuration[j].getErrors(definition[key][i]));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return this.filterErrors(errors);
                };
                return GroupConfiguration;
            }(Configuration));
            Configuration_15.GroupConfiguration = GroupConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_3) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnDoneProxyEvent = (function (_super) {
                __extends(OnDoneProxyEvent, _super);
                function OnDoneProxyEvent(sender, action, response) {
                    _super.call(this, sender, OnDoneProxyEvent.ON_DONE_PROXY);
                    this.action = action;
                    this.response = response;
                }
                OnDoneProxyEvent.prototype.getAction = function () {
                    return this.action;
                };
                OnDoneProxyEvent.prototype.getResult = function () {
                    return this.response;
                };
                OnDoneProxyEvent.ON_DONE_PROXY = "onDoneProxy";
                OnDoneProxyEvent.TYPE_SAVED = "saved";
                OnDoneProxyEvent.TYPE_UPDATED = "updated";
                OnDoneProxyEvent.TYPE_DELETED = "deleted";
                OnDoneProxyEvent.TYPE_SELECTED = "selected";
                OnDoneProxyEvent.TYPE_FAILED = "failed";
                return OnDoneProxyEvent;
            }(Event));
            Event_3.OnDoneProxyEvent = OnDoneProxyEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_16) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var ProxyConfiguration = (function (_super) {
                __extends(ProxyConfiguration, _super);
                function ProxyConfiguration() {
                    _super.apply(this, arguments);
                }
                return ProxyConfiguration;
            }(Configuration));
            Configuration_16.ProxyConfiguration = ProxyConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy_1) {
            "use strict";
            var Proxy = (function () {
                function Proxy(name, container) {
                    this.name = name;
                    this.container = container;
                }
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
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;
            var AjaxProxy = (function (_super) {
                __extends(AjaxProxy, _super);
                function AjaxProxy(container, saveLink, updateLink, deleteLink, selectLink) {
                    if (saveLink === void 0) { saveLink = undefined; }
                    if (updateLink === void 0) { updateLink = undefined; }
                    if (deleteLink === void 0) { deleteLink = undefined; }
                    if (selectLink === void 0) { selectLink = undefined; }
                    _super.call(this, AjaxProxy.TYPE_AJAX_PROXY, container);
                    this.saveLink = saveLink;
                    this.updateLink = updateLink;
                    this.deleteLink = deleteLink;
                    this.selectLink = selectLink;
                }
                AjaxProxy.prototype.save = function () {
                    var link = this.saveLink;
                    if (link === undefined) {
                        link = "/save" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_SAVED);
                };
                AjaxProxy.prototype.update = function () {
                    var link = this.updateLink;
                    if (link === undefined) {
                        link = "/update" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_UPDATED);
                };
                AjaxProxy.prototype.delete = function () {
                    var link = this.deleteLink;
                    if (link === undefined) {
                        link = "/delete" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxyEvent.TYPE_DELETED);
                };
                AjaxProxy.prototype.select = function (query) {
                    var link = this.selectLink;
                    if (link === undefined) {
                        link = "/select" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_GET, link, query, OnDoneProxyEvent.TYPE_SELECTED);
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
                                that.finish(OnDoneProxyEvent.TYPE_FAILED, JSON.parse(ajax.responseText));
                            }
                        }
                        catch (ex) {
                            that.finish(OnDoneProxyEvent.TYPE_FAILED, ajax.responseText);
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
                AjaxProxy.TYPE_AJAX_PROXY = "ajax";
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
        var Configuration;
        (function (Configuration_17) {
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
                    errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_SAVE_LINK));
                    errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_UPDATE_LINK));
                    errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_DELETE_LINK));
                    errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_SELECT_LINK));
                    return this.filterErrors(errors);
                };
                AjaxProxyConfiguration.prototype.create = function (definition, container) {
                    if (container === void 0) { container = undefined; }
                    var saveLink = definition[AjaxProxy.PARAMETER_SAVE_LINK];
                    var updateLink = definition[AjaxProxy.PARAMETER_UPDATE_LINK];
                    var deleteLink = definition[AjaxProxy.PARAMETER_DELETE_LINK];
                    var selectLink = definition[AjaxProxy.PARAMETER_SELECT_LINK];
                    return new AjaxProxy(container, saveLink, updateLink, deleteLink, selectLink);
                };
                return AjaxProxyConfiguration;
            }(Configuration_17.ProxyConfiguration));
            Configuration_17.AjaxProxyConfiguration = AjaxProxyConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;
            var StorageProxy = (function (_super) {
                __extends(StorageProxy, _super);
                function StorageProxy(name, container, storage) {
                    _super.call(this, name, container);
                    this.storage = storage;
                }
                StorageProxy.prototype.save = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxyEvent.TYPE_SAVED, this.container.getValues());
                };
                StorageProxy.prototype.update = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxyEvent.TYPE_UPDATED, this.container.getValues());
                };
                StorageProxy.prototype.delete = function () {
                    this.storage.removeItem(this.container.getName());
                    this.finish(OnDoneProxyEvent.TYPE_DELETED, this.container.getValues());
                };
                StorageProxy.prototype.select = function () {
                    var result = this.storage.getItem(this.container.getName());
                    this.finish(OnDoneProxyEvent.TYPE_SELECTED, JSON.parse(result));
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
            var LocaleStorageProxy = (function (_super) {
                __extends(LocaleStorageProxy, _super);
                function LocaleStorageProxy(container) {
                    _super.call(this, LocaleStorageProxy.TYPE_LOCAL_STORAGE_PROXY, container, window.localStorage);
                }
                LocaleStorageProxy.TYPE_LOCAL_STORAGE_PROXY = "localStorage";
                return LocaleStorageProxy;
            }(Proxy.StorageProxy));
            Proxy.LocaleStorageProxy = LocaleStorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_18) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var LocaleStorageProxy = Ompluscript.Model.Proxy.LocaleStorageProxy;
            var LocalStorageProxyConfiguration = (function (_super) {
                __extends(LocalStorageProxyConfiguration, _super);
                function LocalStorageProxyConfiguration() {
                    _super.apply(this, arguments);
                }
                LocalStorageProxyConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === LocaleStorageProxy.TYPE_LOCAL_STORAGE_PROXY;
                };
                LocalStorageProxyConfiguration.prototype.getErrors = function (definition) {
                    return [];
                };
                LocalStorageProxyConfiguration.prototype.create = function (definition, container) {
                    if (container === void 0) { container = undefined; }
                    return new LocaleStorageProxy(container);
                };
                return LocalStorageProxyConfiguration;
            }(Configuration_18.ProxyConfiguration));
            Configuration_18.LocalStorageProxyConfiguration = LocalStorageProxyConfiguration;
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
                function SessionStorageProxy(container) {
                    _super.call(this, SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, container, window.sessionStorage);
                }
                SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY = "sessionStorage";
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
        (function (Configuration_19) {
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
                SessionStorageProxyConfiguration.prototype.create = function (definition, container) {
                    if (container === void 0) { container = undefined; }
                    return new SessionStorageProxy(container);
                };
                return SessionStorageProxyConfiguration;
            }(Configuration_19.ProxyConfiguration));
            Configuration_19.SessionStorageProxyConfiguration = SessionStorageProxyConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var AjaxProxyConfiguration = Ompluscript.Model.Configuration.AjaxProxyConfiguration;
            var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.SessionStorageProxyConfiguration;
            var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.LocalStorageProxyConfiguration;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, definition, proxies) {
                    if (definition === void 0) { definition = []; }
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this);
                    this.name = name;
                    this.definition = definition;
                    this.proxies = {};
                    this.createProxies(proxies);
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
                        definition: this.definition,
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
                    if (action === OnDoneProxyEvent.TYPE_SELECTED) {
                        this.setValues(response);
                    }
                    this.fireOnDoneProxyEvent(action, response);
                };
                Container.prototype.fireOnDoneProxyEvent = function (action, response) {
                    var event = new OnDoneProxyEvent(this, action, response);
                    this.notifyObservers(event);
                };
                Container.prototype.createProxies = function (proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    if (proxies !== undefined) {
                        var configurations = [
                            Configuration.getInstance(AjaxProxyConfiguration),
                            Configuration.getInstance(SessionStorageProxyConfiguration),
                            Configuration.getInstance(LocalStorageProxyConfiguration),
                        ];
                        for (var i = 0; i < proxies.length; i++) {
                            for (var j = 0; j < configurations.length; j++) {
                                if (configurations[j].isRelatedTo(proxies[i])) {
                                    this.proxies[proxies[i][Configuration.PARAMETER_TYPE]] = configurations[j].create(proxies[i], this);
                                    break;
                                }
                            }
                        }
                    }
                };
                Container.PARAMETER_DEFINITION = "definition";
                Container.PARAMETER_PROXIES = "proxies";
                return Container;
            }(Observable));
            Container_1.Container = Container;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_20) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
            var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
            var ContainerConfiguration = (function (_super) {
                __extends(ContainerConfiguration, _super);
                function ContainerConfiguration() {
                    var definition = [
                        Configuration.getInstance(Configuration_20.BooleanConfiguration),
                        Configuration.getInstance(Configuration_20.DatetimeConfiguration),
                        Configuration.getInstance(Configuration_20.MultipleChoiceConfiguration),
                        Configuration.getInstance(Configuration_20.NumberConfiguration),
                        Configuration.getInstance(Configuration_20.SingleChoiceConfiguration),
                        Configuration.getInstance(Configuration_20.StringConfiguration),
                        Configuration.getInstance(ErrorConfiguration),
                    ];
                    var proxies = [
                        Configuration.getInstance(Configuration_20.AjaxProxyConfiguration),
                        Configuration.getInstance(Configuration_20.SessionStorageProxyConfiguration),
                        Configuration.getInstance(Configuration_20.LocalStorageProxyConfiguration),
                        Configuration.getInstance(ErrorConfiguration),
                    ];
                    var configurations = {};
                    configurations[Container.PARAMETER_DEFINITION] = definition;
                    configurations[Container.PARAMETER_PROXIES] = proxies;
                    _super.call(this, configurations);
                }
                ContainerConfiguration.prototype.getErrors = function (definition) {
                    var errors = [];
                    errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                    errors.push(this.shouldBeArray(definition, Container.PARAMETER_DEFINITION));
                    errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
                    if (definition.hasOwnProperty(Container.PARAMETER_DEFINITION)) {
                        errors.push.apply(errors, _super.prototype.getErrors.call(this, definition, Container.PARAMETER_DEFINITION));
                    }
                    if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                        errors.push.apply(errors, _super.prototype.getErrors.call(this, definition, Container.PARAMETER_PROXIES));
                    }
                    return this.filterErrors(errors);
                };
                return ContainerConfiguration;
            }(GroupConfiguration));
            Configuration_20.ContainerConfiguration = ContainerConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_1) {
        var Container;
        (function (Container_2) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
            var DatetimeConfiguration = Ompluscript.Model.Configuration.DatetimeConfiguration;
            var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.MultipleChoiceConfiguration;
            var NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
            var SingleChoiceConfiguration = Ompluscript.Model.Configuration.SingleChoiceConfiguration;
            var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
            var Model = (function (_super) {
                __extends(Model, _super);
                function Model(name, definition, proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, definition, proxies);
                    this.configurations = [
                        Configuration.getInstance(BooleanConfiguration),
                        Configuration.getInstance(DatetimeConfiguration),
                        Configuration.getInstance(MultipleChoiceConfiguration),
                        Configuration.getInstance(NumberConfiguration),
                        Configuration.getInstance(SingleChoiceConfiguration),
                        Configuration.getInstance(StringConfiguration),
                    ];
                    this.attributes = {};
                    for (var i = 0; i < this.definition.length; i++) {
                        this.addAttribute(this.definition[i]);
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
                Model.prototype.addAttribute = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    for (var i = 0; i < this.configurations.length; i++) {
                        if (this.configurations[i].isRelatedTo(definition)) {
                            this.attributes[name] = this.configurations[i].create(definition);
                        }
                    }
                };
                Model.TYPE_MODEL = Model["name"];
                return Model;
            }(Container));
            Container_2.Model = Model;
        })(Container = Model_1.Container || (Model_1.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_2) {
        var Configuration;
        (function (Configuration_21) {
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
                ModelConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attributes = definition[Container.PARAMETER_DEFINITION];
                    return new Model(name, attributes);
                };
                return ModelConfiguration;
            }(Configuration_21.ContainerConfiguration));
            Configuration_21.ModelConfiguration = ModelConfiguration;
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
        (function (Container_3) {
            "use strict";
            var Model = Ompluscript.Model.Container.Model;
            var Container = Ompluscript.Model.Container.Container;
            var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
            var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
            var OnClearTable = Ompluscript.Model.Event.OnClearTable;
            var Table = (function (_super) {
                __extends(Table, _super);
                function Table(name, definition, proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, definition, proxies);
                    this.rows = [];
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
                    var model = new Model(this.name, this.definition);
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
            Container_3.Table = Table;
        })(Container = Model_4.Container || (Model_4.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_22) {
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
                TableConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attributes = definition[Container.PARAMETER_DEFINITION];
                    return new Table(name, attributes);
                };
                return TableConfiguration;
            }(Configuration_22.ContainerConfiguration));
            Configuration_22.TableConfiguration = TableConfiguration;
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
        var DatetimeConfiguration = Ompluscript.Model.Configuration.DatetimeConfiguration;
        var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.MultipleChoiceConfiguration;
        var NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
        var SingleChoiceConfiguration = Ompluscript.Model.Configuration.SingleChoiceConfiguration;
        var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
        var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
        var ModelConfiguration = Ompluscript.Model.Configuration.ModelConfiguration;
        var TableConfiguration = Ompluscript.Model.Configuration.TableConfiguration;
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
        var Configuration;
        (function (Configuration_23) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Input = Ompluscript.View.Field.Input;
            var create = Ompluscript.Model.create;
            var InputConfiguration = (function (_super) {
                __extends(InputConfiguration, _super);
                function InputConfiguration(configuration, type) {
                    _super.call(this);
                    this.configuration = configuration;
                    this.type = type;
                }
                InputConfiguration.prototype.getErrors = function (definition) {
                    var errors = _super.prototype.getErrors.call(this, definition);
                    var error = this.shouldBeStringOrObject(definition, Input.PARAMETER_ATTRIBUTE);
                    if (error === undefined) {
                        if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "object") {
                            definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                            definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                            errors.push.apply(errors, this.configuration.getErrors(definition));
                        }
                        else if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                            if (create(definition[Input.PARAMETER_ATTRIBUTE]) === undefined) {
                                errors.push(definition[Input.PARAMETER_ATTRIBUTE] + Configuration.MODEL_MUST_BE_DEFINED);
                            }
                        }
                    }
                    else {
                        errors.push(error);
                    }
                    return this.filterErrors(errors);
                };
                InputConfiguration.prototype.createAttribute = function (definition) {
                    if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "object") {
                        definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                        definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                        return this.configuration.create(definition);
                    }
                    else if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                        return create(definition[Input.PARAMETER_ATTRIBUTE]);
                    }
                    return undefined;
                };
                return InputConfiguration;
            }(Configuration_23.ComponentConfiguration));
            Configuration_23.InputConfiguration = InputConfiguration;
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
                    _super.call(this, name, booleanAttribute, styles, CheckBoxInput.INPUT_CHECK_BOX);
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
        (function (Configuration_24) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Input = Ompluscript.View.Field.Input;
            var Component = Ompluscript.View.Component.Component;
            var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
            var BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
            var Boolean = Ompluscript.Model.Attribute.Boolean;
            var CheckBoxInputConfiguration = (function (_super) {
                __extends(CheckBoxInputConfiguration, _super);
                function CheckBoxInputConfiguration() {
                    _super.call(this, Configuration.getInstance(BooleanConfiguration), Boolean.TYPE_BOOLEAN);
                }
                CheckBoxInputConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === CheckBoxInput.TYPE_CHECK_BOX_INPUT;
                };
                CheckBoxInputConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attribute = this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new CheckBoxInput(name, attribute, styles);
                };
                return CheckBoxInputConfiguration;
            }(Configuration_24.InputConfiguration));
            Configuration_24.CheckBoxInputConfiguration = CheckBoxInputConfiguration;
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
                function TextInput(name, stringAttribute, styles, type) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = TextInput.INPUT_TEXT; }
                    _super.call(this, name, stringAttribute, styles, type);
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
        var Field;
        (function (Field) {
            "use strict";
            var EmailInput = (function (_super) {
                __extends(EmailInput, _super);
                function EmailInput(name, stringAttribute, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, styles, EmailInput.INPUT_EMAIL);
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
        (function (Configuration_25) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Input = Ompluscript.View.Field.Input;
            var Component = Ompluscript.View.Component.Component;
            var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
            var String = Ompluscript.Model.Attribute.String;
            var EmailInput = Ompluscript.View.Field.EmailInput;
            var EmailInputConfiguration = (function (_super) {
                __extends(EmailInputConfiguration, _super);
                function EmailInputConfiguration() {
                    _super.call(this, Configuration.getInstance(StringConfiguration), String.TYPE_STRING);
                }
                EmailInputConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === EmailInput.TYPE_EMAIL_INPUT;
                };
                EmailInputConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attribute = this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new EmailInput(name, attribute, styles);
                };
                return EmailInputConfiguration;
            }(Configuration_25.InputConfiguration));
            Configuration_25.EmailInputConfiguration = EmailInputConfiguration;
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
                function NumberInput(name, numberAttribute, styles) {
                    if (numberAttribute === void 0) { numberAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, numberAttribute, styles, NumberInput.INPUT_NUMBER);
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
                NumberInput.EVENT_KEY_PRESS = "keypress";
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
        (function (Configuration_26) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Input = Ompluscript.View.Field.Input;
            var Component = Ompluscript.View.Component.Component;
            var NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
            var Number = Ompluscript.Model.Attribute.Number;
            var NumberInput = Ompluscript.View.Field.NumberInput;
            var NumberInputConfiguration = (function (_super) {
                __extends(NumberInputConfiguration, _super);
                function NumberInputConfiguration() {
                    _super.call(this, Configuration.getInstance(NumberConfiguration), Number.TYPE_NUMBER);
                }
                NumberInputConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === NumberInput.TYPE_NUMBER_INPUT;
                };
                NumberInputConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attribute = this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new NumberInput(name, attribute, styles);
                };
                return NumberInputConfiguration;
            }(Configuration_26.InputConfiguration));
            Configuration_26.NumberInputConfiguration = NumberInputConfiguration;
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
                function PasswordInput(name, stringAttribute, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, styles, PasswordInput.INPUT_PASSWORD);
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
        (function (Configuration_27) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Input = Ompluscript.View.Field.Input;
            var Component = Ompluscript.View.Component.Component;
            var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
            var String = Ompluscript.Model.Attribute.String;
            var PasswordInput = Ompluscript.View.Field.PasswordInput;
            var PasswordInputConfiguration = (function (_super) {
                __extends(PasswordInputConfiguration, _super);
                function PasswordInputConfiguration() {
                    _super.call(this, Configuration.getInstance(StringConfiguration), String.TYPE_STRING);
                }
                PasswordInputConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === PasswordInput.TYPE_PASSWORD_INPUT;
                };
                PasswordInputConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attribute = this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new PasswordInput(name, attribute, styles);
                };
                return PasswordInputConfiguration;
            }(Configuration_27.InputConfiguration));
            Configuration_27.PasswordInputConfiguration = PasswordInputConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_28) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var TextInput = Ompluscript.View.Field.TextInput;
            var Input = Ompluscript.View.Field.Input;
            var Component = Ompluscript.View.Component.Component;
            var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
            var String = Ompluscript.Model.Attribute.String;
            var TextInputConfiguration = (function (_super) {
                __extends(TextInputConfiguration, _super);
                function TextInputConfiguration() {
                    _super.call(this, Configuration.getInstance(StringConfiguration), String.TYPE_STRING);
                }
                TextInputConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === TextInput.TYPE_TEXT_INPUT;
                };
                TextInputConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var attribute = this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new TextInput(name, attribute, styles);
                };
                return TextInputConfiguration;
            }(Configuration_28.InputConfiguration));
            Configuration_28.TextInputConfiguration = TextInputConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component_2) {
            "use strict";
            var NullLayout = Ompluscript.View.Layout.NullLayout;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var NullLayoutConfiguration = Ompluscript.View.Configuration.NullLayoutConfiguration;
            var RelativeLayoutConfiguration = Ompluscript.View.Configuration.RelativeLayoutConfiguration;
            var LinearLayoutConfiguration = Ompluscript.View.Configuration.LinearLayoutConfiguration;
            var TableLayoutConfiguration = Ompluscript.View.Configuration.TableLayoutConfiguration;
            var CheckBoxInputConfiguration = Ompluscript.View.Configuration.CheckBoxInputConfiguration;
            var EmailInputConfiguration = Ompluscript.View.Configuration.EmailInputConfiguration;
            var NumberInputConfiguration = Ompluscript.View.Configuration.NumberInputConfiguration;
            var PasswordInputConfiguration = Ompluscript.View.Configuration.PasswordInputConfiguration;
            var TextInputConfiguration = Ompluscript.View.Configuration.TextInputConfiguration;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, layoutDefinition, children, styles) {
                    if (layoutDefinition === void 0) { layoutDefinition = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.createLayout(layoutDefinition);
                    this.createChildren(children);
                }
                Container.prototype.addChild = function (component) {
                    _super.prototype.addChild.call(this, component);
                    this.layout.addChild(component);
                };
                Container.prototype.removeChild = function (component) {
                    _super.prototype.removeChild.call(this, component);
                    this.layout.removeChild(component);
                };
                Container.prototype.clearChildren = function () {
                    _super.prototype.clearChildren.call(this);
                    this.layout.clearChildren();
                };
                Container.prototype.render = function () {
                    this.clear();
                    this.layout.render();
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
                Container.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Component_2.Layout.DIV_ELEMENT);
                };
                Container.prototype.createLayout = function (layoutDefinition) {
                    if (layoutDefinition === void 0) { layoutDefinition = undefined; }
                    if (layoutDefinition === undefined) {
                        this.layout = new NullLayout();
                    }
                    else {
                        var configurations = [
                            Configuration.getInstance(NullLayoutConfiguration),
                            Configuration.getInstance(RelativeLayoutConfiguration),
                            Configuration.getInstance(LinearLayoutConfiguration),
                            Configuration.getInstance(TableLayoutConfiguration),
                        ];
                        for (var i = 0; i < configurations.length; i++) {
                            if (configurations[i].isRelatedTo(layoutDefinition)) {
                                this.layout = configurations[i].create(layoutDefinition);
                            }
                        }
                    }
                };
                Container.prototype.createChildren = function (children) {
                    if (children === void 0) { children = undefined; }
                    if (children !== undefined) {
                        var configurations = [
                            Configuration.getInstance(CheckBoxInputConfiguration),
                            Configuration.getInstance(EmailInputConfiguration),
                            Configuration.getInstance(NumberInputConfiguration),
                            Configuration.getInstance(PasswordInputConfiguration),
                            Configuration.getInstance(TextInputConfiguration),
                        ];
                        for (var i = 0; i < children.length; i++) {
                            for (var j = 0; j < configurations.length; j++) {
                                if (configurations[j].isRelatedTo(children[i])) {
                                    this.addChild(configurations[i].create(children[i]));
                                }
                            }
                        }
                    }
                };
                Container.PARAMETER_LAYOUT = "layout";
                Container.PARAMETER_CHILDREN = "children";
                Container.CONTAINER_PAGE = "page";
                return Container;
            }(Component_2.Layout));
            Component_2.Container = Container;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container_4) {
            "use strict";
            var Container = Ompluscript.View.Component.Container;
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(name, layoutDefinition, children, styles) {
                    if (layoutDefinition === void 0) { layoutDefinition = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, layoutDefinition, children, styles);
                }
                Page.TYPE_PAGE = Page["name"];
                return Page;
            }(Container));
            Container_4.Page = Page;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component_3) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Viewport = (function (_super) {
                __extends(Viewport, _super);
                function Viewport(pages) {
                    _super.call(this, Viewport.VIEWPORT, undefined);
                    this.pages = pages;
                    this.activePageIndex = 0;
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
                    this.addClass(Viewport.VIEWPORT_CLASS);
                };
                Viewport.VIEWPORT_CLASS = "viewport";
                Viewport.VIEWPORT = "viewport";
                return Viewport;
            }(Component));
            Component_3.Viewport = Viewport;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event_5) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnActionRunEvent = (function (_super) {
                __extends(OnActionRunEvent, _super);
                function OnActionRunEvent(sender, action, parameters) {
                    _super.call(this, sender, OnActionRunEvent.ON_ACTION_RUN);
                    this.action = action;
                    this.parameters = parameters;
                }
                OnActionRunEvent.prototype.getAction = function () {
                    return this.action;
                };
                OnActionRunEvent.prototype.getParameters = function () {
                    return this.parameters;
                };
                OnActionRunEvent.ON_ACTION_RUN = "onActionRun";
                return OnActionRunEvent;
            }(Event));
            Event_5.OnActionRunEvent = OnActionRunEvent;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Contoller;
    (function (Contoller) {
        var Controller;
        (function (Controller) {
            "use strict";
            var Page = Ompluscript.View.Container.Page;
            var Viewport = Ompluscript.View.Component.Viewport;
            var OnActionRunEvent = Ompluscript.Controller.Event.OnActionRunEvent;
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
                            pageController.addObserverByType(this, OnActionRunEvent.ON_ACTION_RUN);
                            this.pageControllers.push(pageController);
                            pageList.push(page);
                        }
                        else if (pages[i] instanceof Controller.PageController) {
                            var pageController = pages[i];
                            pageController.addObserverByType(this, OnActionRunEvent.ON_ACTION_RUN);
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
        })(Controller = Contoller.Controller || (Contoller.Controller = {}));
    })(Contoller = Ompluscript.Contoller || (Ompluscript.Contoller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Contoller;
    (function (Contoller) {
        var Controller;
        (function (Controller) {
            "use strict";
            var ApplicationController = (function (_super) {
                __extends(ApplicationController, _super);
                function ApplicationController(components) {
                    _super.call(this, ApplicationController.APPLICATION_CONTROLLER);
                    this.components = components;
                    window.addEventListener("load", this.setup.bind(this));
                }
                ApplicationController.prototype.setup = function () {
                    for (var i = 0; i < this.components.length; i++) {
                        var xhrObj = new XMLHttpRequest();
                        var source = ApplicationController.APPLICATION_FOLDER + ApplicationController.FOLDER_SEPARATOR;
                        source += this.components + ApplicationController.JAVASCRIPT_EXTENSION;
                        xhrObj.open("GET", source, false);
                        xhrObj.send("");
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        script.text = xhrObj.responseText;
                        document.head.appendChild(script);
                        document.head.removeChild(script);
                    }
                };
                ApplicationController.PARAMETER_COMPONENTS = "components";
                ApplicationController.APPLICATION_CONTROLLER = "applicationController";
                ApplicationController.APPLICATION_FOLDER = "app";
                ApplicationController.FOLDER_SEPARATOR = "/";
                ApplicationController.JAVASCRIPT_EXTENSION = ".js";
                return ApplicationController;
            }(Controller.Controller));
            Controller.ApplicationController = ApplicationController;
        })(Controller = Contoller.Controller || (Contoller.Controller = {}));
    })(Contoller = Ompluscript.Contoller || (Ompluscript.Contoller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Contoller;
    (function (Contoller) {
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
        })(Controller = Contoller.Controller || (Contoller.Controller = {}));
    })(Contoller = Ompluscript.Contoller || (Ompluscript.Contoller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Contoller;
    (function (Contoller) {
        var Controller;
        (function (Controller) {
            "use strict";
            var OnActionRunEvent = Ompluscript.Controller.Event.OnActionRunEvent;
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
                    var event = new OnActionRunEvent(this, action, parameters);
                    this.notifyObservers(event);
                };
                PageController.prototype.getActionParamameterNames = function (action) {
                    var definition = action.toString();
                    return definition.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
                };
                return PageController;
            }(Controller.Controller));
            Controller.PageController = PageController;
        })(Controller = Contoller.Controller || (Contoller.Controller = {}));
    })(Contoller = Ompluscript.Contoller || (Ompluscript.Contoller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_5) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var String = Ompluscript.Model.Attribute.String;
            var StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
            var Translation = (function (_super) {
                __extends(Translation, _super);
                function Translation() {
                    var definition = {};
                    definition[Configuration.PARAMETER_NAME] = Translation.ATTRIBUTE_ASSET;
                    definition[Configuration.PARAMETER_TYPE] = String.TYPE_STRING;
                    _super.call(this, Translation.TYPE_TRANSLATION, [definition]);
                }
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
                    return trace;
                };
                Translation.prototype.dispose = function () {
                    this.clearAssets();
                };
                Translation.prototype.setValues = function (values) {
                    this.clearAssets();
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            this.addAsset(key, values[key]);
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
                Translation.prototype.addAsset = function (key, value) {
                    this.assets[key] = Configuration.getInstance(StringConfiguration).create(this.definition);
                    this.assets[key].setValue(value);
                };
                Translation.prototype.clearAssets = function () {
                    for (var i in this.assets) {
                        if (this.assets.hasOwnProperty(i)) {
                            this.assets[i].dispose();
                        }
                    }
                    this.assets = {};
                };
                Translation.TYPE_TRANSLATION = Translation["name"];
                Translation.ATTRIBUTE_ASSET = "asset";
                return Translation;
            }(Container));
            Container_5.Translation = Translation;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_29) {
            "use strict";
            var Container = Ompluscript.View.Component.Container;
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
            var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
            var ContainerConfiguration = (function (_super) {
                __extends(ContainerConfiguration, _super);
                function ContainerConfiguration() {
                    var layouts = [
                        Configuration.getInstance(Configuration_29.NullLayoutConfiguration),
                        Configuration.getInstance(Configuration_29.RelativeLayoutConfiguration),
                        Configuration.getInstance(Configuration_29.LinearLayoutConfiguration),
                        Configuration.getInstance(Configuration_29.TableLayoutConfiguration),
                        Configuration.getInstance(ErrorConfiguration),
                    ];
                    var children = [
                        Configuration.getInstance(Configuration_29.CheckBoxInputConfiguration),
                        Configuration.getInstance(Configuration_29.EmailInputConfiguration),
                        Configuration.getInstance(Configuration_29.NumberInputConfiguration),
                        Configuration.getInstance(Configuration_29.PasswordInputConfiguration),
                        Configuration.getInstance(Configuration_29.TextInputConfiguration),
                        Configuration.getInstance(ErrorConfiguration),
                    ];
                    var configurations = {};
                    configurations[Container.PARAMETER_LAYOUT] = layouts;
                    configurations[Container.PARAMETER_CHILDREN] = children;
                    _super.call(this, configurations);
                }
                ContainerConfiguration.prototype.getErrors = function (definition) {
                    var errors = [];
                    errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                    errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
                    errors = this.filterErrors(errors);
                    if (errors.length === 0) {
                        errors.push.apply(errors, _super.prototype.getErrors.call(this, definition, Container.PARAMETER_CHILDREN));
                    }
                    if (definition.hasOwnProperty(Container.PARAMETER_LAYOUT)) {
                        errors.push.apply(errors, _super.prototype.getErrors.call(this, definition, Container.PARAMETER_LAYOUT));
                    }
                    return this.filterErrors(errors);
                };
                return ContainerConfiguration;
            }(GroupConfiguration));
            Configuration_29.ContainerConfiguration = ContainerConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_30) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var Page = Ompluscript.View.Container.Page;
            var Component = Ompluscript.View.Component.Component;
            var Container = Ompluscript.View.Component.Container;
            var PageConfiguration = (function (_super) {
                __extends(PageConfiguration, _super);
                function PageConfiguration() {
                    _super.call(this);
                }
                PageConfiguration.prototype.isRelatedTo = function (definition) {
                    return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
                };
                PageConfiguration.prototype.create = function (definition) {
                    var name = definition[Configuration.PARAMETER_NAME];
                    var layoutDefinition = definition[Container.PARAMETER_LAYOUT];
                    var children = definition[Container.PARAMETER_CHILDREN];
                    var styles = definition[Component.PARAMETER_STYLES];
                    return new Page(name, layoutDefinition, children, styles);
                };
                return PageConfiguration;
            }(Configuration_30.ContainerConfiguration));
            Configuration_30.PageConfiguration = PageConfiguration;
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var PageConfiguration = Ompluscript.View.Configuration.PageConfiguration;
        var CheckBoxInputConfiguration = Ompluscript.View.Configuration.CheckBoxInputConfiguration;
        var EmailInputConfiguration = Ompluscript.View.Configuration.EmailInputConfiguration;
        var NumberInputConfiguration = Ompluscript.View.Configuration.NumberInputConfiguration;
        var PasswordInputConfiguration = Ompluscript.View.Configuration.PasswordInputConfiguration;
        var TextInputConfiguration = Ompluscript.View.Configuration.TextInputConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    Configuration.getInstance(CheckBoxInputConfiguration),
                    Configuration.getInstance(EmailInputConfiguration),
                    Configuration.getInstance(NumberInputConfiguration),
                    Configuration.getInstance(PasswordInputConfiguration),
                    Configuration.getInstance(TextInputConfiguration),
                    Configuration.getInstance(PageConfiguration),
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
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var DateInput = (function (_super) {
                __extends(DateInput, _super);
                function DateInput(name, datetimeAttribute, styles) {
                    if (datetimeAttribute === void 0) { datetimeAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, datetimeAttribute, styles, Field.TextInput.INPUT_TEXT);
                }
                DateInput.prototype.getValue = function () {
                    var value = this.getAttribute(Field.Input.ATTRIBUTE_VALUE);
                    if (typeof value === "string") {
                        if (isNaN(parseInt(value, 10))) {
                            return value;
                        }
                        return parseInt(value, 10);
                    }
                    return undefined;
                };
                DateInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_KEY_PRESS, listener, false);
                };
                DateInput.prototype.updateValue = function (value) {
                    this.setAttribute(Field.Input.ATTRIBUTE_VALUE, value.toString());
                };
                DateInput.EVENT_KEY_PRESS = "keypress";
                return DateInput;
            }(Field.Input));
            Field.DateInput = DateInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
