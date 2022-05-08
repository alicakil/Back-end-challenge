var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("Features/Layout", ["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Layout = void 0;
    react_1 = __importDefault(react_1);
    const Layout = (props) => {
        const { children } = props;
        return (react_1.default.createElement("div", { className: "layout" }, children));
    };
    exports.Layout = Layout;
    exports.Layout.displayName = "Layout";
    const Header = (props) => {
        const { children } = props;
        return (react_1.default.createElement("div", { className: "layout__header" }, children));
    };
    Header.displayName = "Header";
    const Content = (props) => {
        const { children } = props;
        return (react_1.default.createElement("div", { className: "layout__content" }, children));
    };
    Content.displayName = "MainContent";
    const Footer = () => {
        return (react_1.default.createElement("div", { className: "layout__footer" },
            "\u00A9 ",
            new Date().getFullYear(),
            " - New Day at Work"));
    };
    Footer.displayName = "Footer";
    exports.Layout.Header = Header;
    exports.Layout.Content = Content;
    exports.Layout.Footer = Footer;
});
define("Components/Button", ["require", "exports", "classnames", "react"], function (require, exports, classnames_1, react_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    classnames_1 = __importDefault(classnames_1);
    react_2 = __importDefault(react_2);
    const Button = (props) => {
        const { text, type = "button", kind, onClick } = props;
        return (react_2.default.createElement("button", { type: type, className: classnames_1.default("button", `button--${kind}`), onClick: onClick }, text));
    };
    exports.Button = Button;
    exports.Button.displayName = "Button";
});
define("Components/ErrorMessage", ["require", "exports", "react"], function (require, exports, react_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorMessage = void 0;
    react_3 = __importDefault(react_3);
    const ErrorMessage = (props) => {
        const { text } = props;
        return (react_3.default.createElement("div", { className: "error-message" }, text));
    };
    exports.ErrorMessage = ErrorMessage;
    exports.ErrorMessage.displayName = "ErrorMessage";
});
define("Components/FormItem", ["require", "exports", "react"], function (require, exports, react_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormItem = void 0;
    react_4 = __importDefault(react_4);
    const FormItem = (props) => {
        const { label, children } = props;
        return (react_4.default.createElement("div", { className: "form-item" },
            react_4.default.createElement("label", { className: "form-item__label" }, label),
            react_4.default.createElement("div", { className: "form-item__content" }, children)));
    };
    exports.FormItem = FormItem;
    exports.FormItem.displayName = "FormItem";
});
define("Services/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BadRequestError = void 0;
    class BadRequestError extends Error {
        constructor(model) {
            super(`Server returned a bad request: ${JSON.stringify(model)}`);
            this.model = model;
        }
    }
    exports.BadRequestError = BadRequestError;
});
define("Services/authenticationService", ["require", "exports", "Services/common"], function (require, exports, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUserInfo = exports.logout = exports.login = void 0;
    async function login(login, password) {
        let response;
        try {
            response = await fetch("/api/Authentication/Login", {
                method: "POST",
                redirect: "error",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: login,
                    password
                })
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to login");
        }
        if (response.status !== 200) {
            if (response.status === 400) {
                throw new common_1.BadRequestError(await response.json());
            }
            throw new Error("Failed to login");
        }
    }
    exports.login = login;
    async function logout() {
        let response;
        try {
            response = await fetch("/api/Authentication/Logout", {
                method: "POST",
                redirect: "error"
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to logout");
        }
        if (response.status !== 200) {
            throw new Error("Failed to logout");
        }
    }
    exports.logout = logout;
    async function getUserInfo() {
        let response;
        try {
            response = await fetch("/api/Authentication/UserInfo", {
                method: "GET",
                redirect: "error"
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to get user info");
        }
        if (response.status !== 200) {
            throw new Error("Failed to get user info");
        }
        return (await response.json());
    }
    exports.getUserInfo = getUserInfo;
});
define("Components/TextInput", ["require", "exports", "react"], function (require, exports, react_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextInput = void 0;
    react_5 = __importDefault(react_5);
    const TextInput = (props) => {
        const { value, onChange, type = "text" } = props;
        const changeHandler = (args) => {
            onChange(args.currentTarget.value);
        };
        return (react_5.default.createElement("input", { type: type, value: value !== null && value !== void 0 ? value : "", onChange: changeHandler, className: "text-input" }));
    };
    exports.TextInput = TextInput;
    exports.TextInput.displayName = "TextInput";
});
define("Features/Login", ["require", "exports", "react", "Components/Button", "Components/ErrorMessage", "Components/FormItem", "Services/authenticationService", "Components/TextInput", "Services/common"], function (require, exports, react_6, Button_1, ErrorMessage_1, FormItem_1, authenticationService_1, TextInput_1, common_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Login = void 0;
    react_6 = __importStar(react_6);
    const Login = (props) => {
        const { onAuthenticated } = props;
        const [model, setModel] = react_6.useState({ login: "", password: "" });
        const [errorMessage, setErrorMessage] = react_6.useState();
        const submitHandler = async (args) => {
            args.preventDefault();
            setErrorMessage(undefined);
            try {
                await authenticationService_1.login(model.login, model.password);
                onAuthenticated();
            }
            catch (e) {
                if (e instanceof common_2.BadRequestError) {
                    setErrorMessage(e.model.Message);
                }
                else {
                    console.error(e);
                    alert("Something is not ok, check the console log");
                }
            }
        };
        return (react_6.default.createElement("form", { onSubmit: submitHandler },
            errorMessage && (react_6.default.createElement(ErrorMessage_1.ErrorMessage, { text: errorMessage })),
            react_6.default.createElement(FormItem_1.FormItem, { label: "Login" },
                react_6.default.createElement(TextInput_1.TextInput, { value: model.login, onChange: (v) => setModel((x) => (Object.assign(Object.assign({}, x), { login: v }))) })),
            react_6.default.createElement(FormItem_1.FormItem, { label: "Password" },
                react_6.default.createElement(TextInput_1.TextInput, { type: "password", value: model.password, onChange: (v) => setModel((x) => (Object.assign(Object.assign({}, x), { password: v }))) })),
            react_6.default.createElement(Button_1.Button, { type: "submit", kind: "primary", text: "Log in" })));
    };
    exports.Login = Login;
    exports.Login.displayName = "Login";
});
define("Features/NavBar", ["require", "exports", "react"], function (require, exports, react_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavBar = void 0;
    react_7 = __importDefault(react_7);
    const NavBar = (props) => {
        const { user, onChangeView } = props;
        const clickHandler = (args) => {
            args.preventDefault();
            const href = args.currentTarget.getAttribute("href");
            if (!href) {
                return;
            }
            onChangeView(href.substring(1));
        };
        return (react_7.default.createElement("ul", { className: "nav-bar" },
            react_7.default.createElement("li", { className: "nav-bar__item" },
                react_7.default.createElement("a", { href: "#home", onClick: clickHandler }, "Home")),
            user && (react_7.default.createElement(react_7.default.Fragment, null,
                react_7.default.createElement("li", { className: "nav-bar__item" },
                    react_7.default.createElement("a", { href: "#stock", onClick: clickHandler }, "Stock")),
                react_7.default.createElement("li", { className: "nav-bar__item" },
                    react_7.default.createElement("a", { href: "#buy", onClick: clickHandler }, "Buy")),
                react_7.default.createElement("li", { className: "nav-bar__item" },
                    react_7.default.createElement("a", { href: "#signout", onClick: clickHandler }, "Sign out"))))));
    };
    exports.NavBar = NavBar;
    exports.NavBar.displayName = "NavBar";
});
define("Components/Icon", ["require", "exports", "classnames", "react"], function (require, exports, classnames_2, react_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Icon = void 0;
    classnames_2 = __importDefault(classnames_2);
    react_8 = __importDefault(react_8);
    const Icon = (props) => {
        const { kind, } = props;
        return (react_8.default.createElement("i", { className: classnames_2.default("icon", `icon--${kind}`) }));
    };
    exports.Icon = Icon;
    exports.Icon.displayName = "Icon";
});
define("Components/ActionButton", ["require", "exports", "classnames", "react", "Components/Icon"], function (require, exports, classnames_3, react_9, Icon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionButton = void 0;
    classnames_3 = __importDefault(classnames_3);
    react_9 = __importDefault(react_9);
    const ActionButton = (props) => {
        const { icon, kind, onClick } = props;
        const clickHandler = (args) => {
            args.stopPropagation();
            onClick();
        };
        return (react_9.default.createElement("button", { type: "button", className: classnames_3.default("action-button", `action-button--${kind}`), onClick: clickHandler },
            react_9.default.createElement(Icon_1.Icon, { kind: icon })));
    };
    exports.ActionButton = ActionButton;
    exports.ActionButton.displayName = "ActionButton";
});
define("Components/QuantityInput", ["require", "exports", "react", "Components/ActionButton", "Components/TextInput"], function (require, exports, react_10, ActionButton_1, TextInput_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QuantityInput = void 0;
    react_10 = __importDefault(react_10);
    const QuantityInput = (props) => {
        const { value, onChange } = props;
        const changeHandler = (value) => {
            if (value === "") {
                onChange(0);
            }
            else if (value.match(/^\d+$/)) {
                onChange(parseInt(value, 10));
            }
        };
        const clickHandler = (amount) => {
            onChange(value + amount);
        };
        return (react_10.default.createElement("div", { className: "quantity-input" },
            react_10.default.createElement(ActionButton_1.ActionButton, { icon: "minus", kind: "secondary", onClick: () => clickHandler(-1) }),
            react_10.default.createElement("div", { className: "quantity-input__input" },
                react_10.default.createElement(TextInput_2.TextInput, { value: value.toString(), onChange: changeHandler })),
            react_10.default.createElement(ActionButton_1.ActionButton, { icon: "plus", kind: "secondary", onClick: () => clickHandler(+1) })));
    };
    exports.QuantityInput = QuantityInput;
    exports.QuantityInput.displayName = "QuantityInput";
});
define("Services/orderService", ["require", "exports", "Services/common"], function (require, exports, common_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.submitOrder = exports.listStockItemsForOrder = void 0;
    async function listStockItemsForOrder() {
        let response;
        try {
            response = await fetch("/api/Order/Items", {
                method: "GET",
                redirect: "error"
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to list stock items for order");
        }
        if (response.status !== 200) {
            throw new Error("Failed to list stock items for order");
        }
        return (await response.json());
    }
    exports.listStockItemsForOrder = listStockItemsForOrder;
    async function submitOrder(items) {
        let response;
        try {
            response = await fetch("/api/Order", {
                method: "POST",
                redirect: "error",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(items)
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to submit order");
        }
        if (response.status !== 200) {
            if (response.status === 400) {
                throw new common_3.BadRequestError(await response.json());
            }
            throw new Error("Failed to submit order");
        }
    }
    exports.submitOrder = submitOrder;
});
define("Features/OrderItem", ["require", "exports", "react", "Components/QuantityInput"], function (require, exports, react_11, QuantityInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderItem = void 0;
    react_11 = __importDefault(react_11);
    const OrderItem = (props) => {
        const { value, onChange, stockInfo } = props;
        return (react_11.default.createElement("div", { className: "order-item" },
            react_11.default.createElement("img", { className: "order-item__image", src: stockInfo.ImageUrl }),
            react_11.default.createElement("span", { className: "order-item__name" }, stockInfo.Name),
            react_11.default.createElement(QuantityInput_1.QuantityInput, { value: value, onChange: onChange }),
            react_11.default.createElement("span", { className: "order-item__total" },
                stockInfo.Price,
                " gold")));
    };
    exports.OrderItem = OrderItem;
    exports.OrderItem.displayName = "OrderItem";
});
define("Components/Portal", ["require", "exports", "react-dom"], function (require, exports, react_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Portal = void 0;
    const Portal = (props) => {
        const { children, container } = props;
        const containerElement = document.querySelector(container);
        if (!containerElement) {
            throw new Error(`${container} is not found in the DOM`);
        }
        return react_dom_1.createPortal(children, containerElement);
    };
    exports.Portal = Portal;
    exports.Portal.displayName = "Portal";
});
define("Features/OrderDialog", ["require", "exports", "react", "Components/ActionButton", "Components/Button", "Components/ErrorMessage", "Features/OrderItem", "Components/Portal", "Services/orderService", "Services/common"], function (require, exports, react_12, ActionButton_2, Button_2, ErrorMessage_2, OrderItem_1, Portal_1, orderService_1, common_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderDialog = void 0;
    react_12 = __importStar(react_12);
    const OrderDialog = (props) => {
        const { onPurchased, onClose } = props;
        const [orderItems, setOrderItems] = react_12.useState([]);
        const [errorMessage, setErrorMessage] = react_12.useState();
        react_12.useEffect(() => {
            const load = async () => {
                const items = await orderService_1.listStockItemsForOrder();
                setOrderItems(items.map((x) => ({ quantity: 0, stockInfo: x })));
            };
            load();
        }, []);
        const changeHandler = (id, quantity) => {
            setOrderItems((x) => {
                const result = [...x];
                const index = result.findIndex(x => x.stockInfo.Id === id);
                if (index !== -1) {
                    result[index] = Object.assign(Object.assign({}, result[index]), { quantity });
                }
                return result;
            });
        };
        const buyHandler = async () => {
            setErrorMessage(undefined);
            try {
                const order = orderItems.filter(x => x.quantity !== 0)
                    .map((x) => ({ id: x.stockInfo.Id, quantity: x.quantity }));
                await orderService_1.submitOrder(order);
                onPurchased();
            }
            catch (e) {
                if (e instanceof common_4.BadRequestError) {
                    setErrorMessage(e.model.Message);
                }
                else {
                    console.error(e);
                    alert("Something is not ok, check the console log");
                }
            }
        };
        return (react_12.default.createElement(Portal_1.Portal, { container: "body" },
            react_12.default.createElement("div", { className: "dialog-backdrop" }),
            react_12.default.createElement("div", { className: "dialog-container" },
                react_12.default.createElement("div", { className: "dialog" },
                    react_12.default.createElement("div", { className: "dialog__header" },
                        react_12.default.createElement("h2", { className: "dialog__title" }, "Order"),
                        react_12.default.createElement("div", { className: "dialog__close" },
                            react_12.default.createElement(ActionButton_2.ActionButton, { icon: "cross", kind: "transparent", onClick: onClose }))),
                    react_12.default.createElement("div", { className: "dialog__body" },
                        errorMessage && (react_12.default.createElement(ErrorMessage_2.ErrorMessage, { text: errorMessage })),
                        orderItems.map((x) => (react_12.default.createElement(OrderItem_1.OrderItem, { key: x.stockInfo.Id, stockInfo: x.stockInfo, value: x.quantity, onChange: (v) => changeHandler(x.stockInfo.Id, v) }))),
                        react_12.default.createElement("h3", { className: "order-dialog__total" },
                            react_12.default.createElement("span", null, "Total"),
                            react_12.default.createElement("span", null,
                                orderItems.reduce((prev, x) => prev + (x.quantity * x.stockInfo.Price), 0),
                                " gold"))),
                    react_12.default.createElement("div", { className: "dialog__footer" },
                        react_12.default.createElement(Button_2.Button, { kind: "primary", text: "Buy", onClick: buyHandler }),
                        react_12.default.createElement(Button_2.Button, { kind: "secondary", text: "Cancel", onClick: onClose }))))));
    };
    exports.OrderDialog = OrderDialog;
    exports.OrderDialog.displayName = "OrderDialog";
});
define("Services/stockService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.listStock = void 0;
    async function listStock() {
        let response;
        try {
            response = await fetch("/api/Stock", {
                method: "GET",
                redirect: "error"
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to request stock");
        }
        if (response.status !== 200) {
            throw new Error("Failed to request stock");
        }
        return (await response.json());
    }
    exports.listStock = listStock;
});
define("Features/Stock", ["require", "exports", "react", "Services/stockService"], function (require, exports, react_13, stockService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stock = void 0;
    react_13 = __importStar(react_13);
    const Stock = () => {
        const [items, setItems] = react_13.useState([]);
        react_13.useEffect(() => {
            const load = async () => {
                const stock = await stockService_1.listStock();
                setItems(stock);
            };
            load();
        }, []);
        return (react_13.default.createElement(react_13.default.Fragment, null,
            react_13.default.createElement("h2", null, "Current stock"),
            react_13.default.createElement("div", null, items.map(x => (react_13.default.createElement(react_13.Fragment, { key: x.Id },
                x.Name,
                " : ",
                x.Quantity,
                react_13.default.createElement("br", null)))))));
    };
    exports.Stock = Stock;
    exports.Stock.displayName = "Stock";
});
define("App", ["require", "exports", "react", "react-dom", "Features/Layout", "Features/Login", "Features/NavBar", "Features/OrderDialog", "Services/authenticationService", "Features/Stock"], function (require, exports, react_14, react_dom_2, Layout_1, Login_1, NavBar_1, OrderDialog_1, authenticationService_2, Stock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_14 = __importStar(react_14);
    react_dom_2 = __importDefault(react_dom_2);
    const { Header, Content, Footer } = Layout_1.Layout;
    const App = () => {
        const [didInitiallyLoad, setDidInitiallyLoad] = react_14.useState(false);
        const [user, setUser] = react_14.useState(null);
        const [view, setView] = react_14.useState(() => {
            const hash = window.location.hash;
            if ((hash === null || hash === void 0 ? void 0 : hash.length) > 0 && hash[0] === "#") {
                return hash.substring(1);
            }
            return "home";
        });
        const [isOrdering, setIsOrdering] = react_14.useState(false);
        react_14.useEffect(() => {
            window.history.replaceState(null, "", `#${view}`);
        }, [view]);
        react_14.useEffect(() => {
            const load = async () => {
                try {
                    const userInfo = await authenticationService_2.getUserInfo();
                    setUser(userInfo);
                }
                catch (e) {
                    setIsOrdering(false);
                    setView("home");
                    console.error(e);
                }
                finally {
                    setDidInitiallyLoad(true);
                }
            };
            load();
        }, []);
        const reloadUserInfo = async () => {
            try {
                const userInfo = await authenticationService_2.getUserInfo();
                setUser(userInfo);
            }
            catch (e) {
                console.error(e);
            }
        };
        const authenticatedHandler = async () => {
            await reloadUserInfo();
        };
        const purchasedHandled = async () => {
            setIsOrdering(false);
            await reloadUserInfo();
        };
        const signoutHandler = async () => {
            try {
                await authenticationService_2.logout();
                setView("home");
                setUser(null);
            }
            catch (e) {
                console.error(e);
            }
        };
        const changeViewHandler = async (name) => {
            console.log(name);
            switch (name) {
                case "buy":
                    setIsOrdering(true);
                    break;
                case "signout":
                    signoutHandler();
                    break;
                default:
                    setView(name);
            }
        };
        const renderContent = () => {
            if (!didInitiallyLoad) {
                return null;
            }
            if (!user) {
                return react_14.default.createElement(Login_1.Login, { onAuthenticated: authenticatedHandler });
            }
            switch (view) {
                case "stock":
                    return react_14.default.createElement(Stock_1.Stock, null);
                case "home":
                default:
                    return (react_14.default.createElement(react_14.default.Fragment, null,
                        react_14.default.createElement("h2", null,
                            "Hello, ",
                            user.Login),
                        react_14.default.createElement("p", null, "Have a nice day")));
            }
        };
        return (react_14.default.createElement(Layout_1.Layout, null,
            react_14.default.createElement(Header, null,
                react_14.default.createElement(NavBar_1.NavBar, { user: user, onChangeView: changeViewHandler }),
                user && (react_14.default.createElement("div", null,
                    user.Balance,
                    " gold"))),
            react_14.default.createElement(Content, null,
                renderContent(),
                (user && isOrdering) && (react_14.default.createElement(OrderDialog_1.OrderDialog, { onPurchased: purchasedHandled, onClose: () => setIsOrdering(false) }))),
            react_14.default.createElement(Footer, null)));
    };
    App.displayName = "App";
    react_dom_2.default.render(react_14.default.createElement(App, null), document.querySelector("#app-host"));
});
