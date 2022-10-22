"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPage = void 0;
const react_1 = __importDefault(require("react"));
function IndexPage({}) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, "ActivityPub - Welcome"),
                react_1.default.createElement("link", { rel: "stylesheet", href: "/IndexPage.css" }),
                react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" })),
            react_1.default.createElement("body", null,
                react_1.default.createElement("main", null,
                    react_1.default.createElement("p", null,
                        "Hi! My name is ",
                        react_1.default.createElement("a", { href: "https://michaelpuckett.engineer" }, "Michael Puckett"),
                        "."),
                    react_1.default.createElement("p", null, "This server is for my presence on the Fediverse."),
                    react_1.default.createElement("ul", null,
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/actor/michael/outbox" }, "All Fediverse Posts")))))));
}
exports.IndexPage = IndexPage;
;
//# sourceMappingURL=IndexPage.js.map