"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const react_1 = __importDefault(require("react"));
function LoginPage({}) {
    return (react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null,
            react_1.default.createElement("title", null, "Private Login"),
            react_1.default.createElement("link", { rel: "stylesheet", href: "/LoginPage.css" }),
            react_1.default.createElement("meta", { name: "robots", content: "noindex" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" })),
        react_1.default.createElement("body", null,
            react_1.default.createElement("aside", null,
                react_1.default.createElement("small", null,
                    "Hi! This is my personal login for writing posts. You can see ",
                    react_1.default.createElement("a", { href: "/actor/michael/outbox" }, "all my posts here"),
                    ".")),
            react_1.default.createElement("main", null,
                react_1.default.createElement("h1", null, "Private Login"),
                react_1.default.createElement(SignUpForm, null),
                react_1.default.createElement(LoginForm, null)))));
}
exports.LoginPage = LoginPage;
;
function LoginForm({}) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", { noValidate: true, id: "LoginForm" },
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Email"),
                react_1.default.createElement("input", { type: "email", name: "email" })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password" })),
            react_1.default.createElement("button", { type: "submit" }, "Log In")),
        react_1.default.createElement("script", { type: "module", src: "/LoginForm.js" })));
}
function SignUpForm({}) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", { noValidate: true, id: "SignUpForm" },
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Email"),
                react_1.default.createElement("input", { type: "email", name: "email" })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password" })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Username"),
                react_1.default.createElement("input", { type: "text", name: "preferredUsername" })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Name"),
                react_1.default.createElement("input", { type: "text", name: "name" })),
            react_1.default.createElement("button", { type: "submit" }, "Sign Up")),
        react_1.default.createElement("script", { type: "module", src: "/SignUpForm.js" })));
}
//# sourceMappingURL=LoginPage.js.map