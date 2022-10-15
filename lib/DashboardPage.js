"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
const react_1 = __importDefault(require("react"));
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
function DashboardPage({ actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, "ActivityPub Dashboard"),
                react_1.default.createElement("link", { rel: "stylesheet", href: "DashboardPage.css" })),
            react_1.default.createElement("body", null,
                react_1.default.createElement("main", null,
                    react_1.default.createElement("h1", null,
                        "Welcome, ",
                        actor.name,
                        "."),
                    react_1.default.createElement(Nav, { actor: actor }),
                    react_1.default.createElement("div", { className: "container" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(CreateNoteForm, { actor: actor }),
                            react_1.default.createElement(OutboxFeed, { actor: actor })),
                        react_1.default.createElement(InboxFeed, { actor: actor }))))));
}
exports.DashboardPage = DashboardPage;
function BoxLink({ collection, children }) {
    if (!collection) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    ;
    return collection instanceof URL ? (react_1.default.createElement("li", null,
        react_1.default.createElement("a", { href: collection.toString() }, children))) : collection.id instanceof URL ? (react_1.default.createElement("li", null,
        react_1.default.createElement("a", { href: collection.id.toString() }, children))) : react_1.default.createElement(react_1.default.Fragment, null, "Test");
}
function Nav({ actor }) {
    return (react_1.default.createElement("nav", null,
        react_1.default.createElement("ul", null,
            actor.url instanceof URL ? (react_1.default.createElement("li", null,
                react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(actor).toString() ?? '#' }, "You"))) : null,
            react_1.default.createElement(BoxLink, { collection: actor.inbox }, "Inbox"),
            react_1.default.createElement(BoxLink, { collection: actor.outbox }, "Outbox"),
            react_1.default.createElement(BoxLink, { collection: actor.following }, "Following"),
            react_1.default.createElement(BoxLink, { collection: actor.followers }, "Followers"),
            react_1.default.createElement(BoxLink, { collection: actor.liked }, "Liked"),
            actor.streams ? actor.streams.map(stream => (typeof stream !== 'string' && 'id' in stream && stream.id && 'name' in stream && stream.name && !Array.isArray(stream.name)) ?
                react_1.default.createElement(BoxLink, { collection: stream.id }, stream.name) : react_1.default.createElement(react_1.default.Fragment, null)) : react_1.default.createElement(react_1.default.Fragment, null))));
}
function CreateNoteForm({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Post"),
        react_1.default.createElement("form", { id: "CreateNoteForm", action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), noValidate: true },
            react_1.default.createElement("input", { type: "hidden", name: "actor", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "What's on your mind?"),
                react_1.default.createElement("textarea", { name: "content" })),
            react_1.default.createElement("button", { type: "submit" }, "Post")),
        react_1.default.createElement("script", { type: "module", src: "/CreateNoteForm.js" })));
}
function InboxFeed({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Feed"),
        react_1.default.createElement("ul", null, 'orderedItems' in actor.inbox && Array.isArray(actor.inbox.orderedItems) ? actor.inbox.orderedItems.map(item => {
            if (item instanceof URL) {
                return react_1.default.createElement(react_1.default.Fragment, null);
            }
            if ('object' in item && item.object && !(item.object instanceof URL) && 'content' in item.object) {
                return (react_1.default.createElement("li", { key: (0, activitypub_core_utilities_1.getId)(item).toString() },
                    react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(item).toString() ?? '#' }, item.object.content)));
            }
            return react_1.default.createElement(react_1.default.Fragment, null);
        }) : null)));
}
function OutboxFeed({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Recent Posts"),
        react_1.default.createElement("ul", null, 'orderedItems' in actor.outbox && Array.isArray(actor.outbox.orderedItems) ? actor.outbox.orderedItems.map(item => {
            if (item instanceof URL) {
                return react_1.default.createElement(react_1.default.Fragment, null);
            }
            if ('object' in item && item.object && !(item.object instanceof URL) && 'content' in item.object) {
                return (react_1.default.createElement("li", { key: (0, activitypub_core_utilities_1.getId)(item).toString() },
                    react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(item).toString() ?? '#' }, item.object.content)));
            }
            return react_1.default.createElement(react_1.default.Fragment, null);
        }) : null)));
}
//# sourceMappingURL=DashboardPage.js.map