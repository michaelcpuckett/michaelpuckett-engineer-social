"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorEntityPage = void 0;
const react_1 = __importDefault(require("react"));
function ActorEntityPage({ actor, user }) {
    return (react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null,
            react_1.default.createElement("title", null,
                actor.name,
                " | Profile"),
            react_1.default.createElement("link", { rel: "stylesheet", href: "/ActorEntityPage.css" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" })),
        react_1.default.createElement("body", null,
            react_1.default.createElement("main", null,
                react_1.default.createElement("div", { className: "card" },
                    actor.icon && 'url' in actor.icon && actor.icon.url ? (react_1.default.createElement("img", { src: actor.icon.url.toString() })) : null,
                    react_1.default.createElement("div", { role: "heading", "aria-level": 1 },
                        "@",
                        actor.preferredUsername),
                    actor.summary ? (react_1.default.createElement("p", null, actor.summary)) : null)))));
}
exports.ActorEntityPage = ActorEntityPage;
//# sourceMappingURL=ActorEntityPage.js.map