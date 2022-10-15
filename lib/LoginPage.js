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
            react_1.default.createElement(Styles, null),
            react_1.default.createElement("meta", { name: "robots", content: "noindex" })),
        react_1.default.createElement("body", null,
            react_1.default.createElement("aside", null,
                react_1.default.createElement("small", null,
                    "Hi! This is my personal login for writing posts. You can see ",
                    react_1.default.createElement("a", { href: "/actor/michael/outbox" }, "all my posts here"),
                    ".")),
            react_1.default.createElement("main", null,
                react_1.default.createElement("h1", null, "Private Login"),
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
function Styles({}) {
    return (react_1.default.createElement("style", null, `
        * {
          box-sizing: border-box;
        }
        :root {
          color-scheme: dark light;
          min-height: 100%;
        }
        body {
          font-family: system-ui, sans-serif;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }
        main {
          display: grid;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        h1 {
          font-weight: normal;
          text-align: center;
        }
        h2 {
          font-weight: normal;
        }
        form {
          display: flex;
          gap: 20px;
          flex-direction: column;
          width: 320px;
          border: 1px solid;
          border-radius: 6px;
          padding: 20px;
        }
        label {
          display: flex;
          gap: 12px;
          width: 100%;
          flex-direction: column;
        }
        label span {
          display: flex;
          width: 100px;
        }
        input {
          width: 100%;
          border: 1px solid;
          box-shadow: 0;
          border-radius: 6px;
          padding: 6px;
          font: inherit;
          line-height: inherit;
          text-align: center;
        }
        button {
          appearance: none;
          border-radius: 6px;
          padding: 12px 6px;
          background: Canvas;
          border: 1px solid;
          font: inherit;
          line-height: inherit;
        }
        aside {
          text-align: center;
          padding: 20px;
          display: inline-flex;
        }
      `));
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