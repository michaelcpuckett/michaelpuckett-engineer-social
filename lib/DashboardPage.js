"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
const react_1 = __importDefault(require("react"));
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
const BlogPostTemplate_1 = require("./BlogPostTemplate");
function DashboardPage({ actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, "ActivityPub Dashboard"),
                react_1.default.createElement("link", { rel: "stylesheet", href: "DashboardPage.css" }),
                react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" })),
            react_1.default.createElement("body", null,
                react_1.default.createElement("main", null,
                    react_1.default.createElement("h1", null,
                        "Welcome, ",
                        actor.name,
                        "."),
                    react_1.default.createElement("details", null,
                        react_1.default.createElement("summary", null, "Edit Profile"),
                        react_1.default.createElement("form", { noValidate: true, action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), id: "EditProfileForm" },
                            react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
                            react_1.default.createElement("input", { type: "hidden", name: "objectId", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
                            react_1.default.createElement("label", null,
                                react_1.default.createElement("span", null, "Bio"),
                                react_1.default.createElement("textarea", { name: "summary", defaultValue: actor.summary ?? '' })),
                            react_1.default.createElement("label", null,
                                react_1.default.createElement("span", null, "Icon"),
                                react_1.default.createElement("input", { type: "text", name: "icon", defaultValue: (actor.icon && 'href' in actor.icon && actor.icon.href) ? actor.icon.href.toString() : '' })),
                            react_1.default.createElement("button", { type: "submit" }, "Update")),
                        react_1.default.createElement("script", { src: "/EditProfileForm.js", type: "module" })),
                    react_1.default.createElement(Nav, { actor: actor }),
                    react_1.default.createElement("div", { className: "container" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(FollowForm, { actor: actor }),
                            react_1.default.createElement(CreateNoteForm, { actor: actor }),
                            react_1.default.createElement(CreateArticleForm, { actor: actor }),
                            react_1.default.createElement(OutboxFeed, { actor: actor })),
                        react_1.default.createElement(InboxFeed, { actor: actor })),
                    react_1.default.createElement(BlogPostTemplate_1.BlogPostTemplate, { headingLevel: 2 })))));
}
exports.DashboardPage = DashboardPage;
function FollowForm({ actor }) {
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("h2", null, "Follow a User"),
        react_1.default.createElement("form", { noValidate: true, id: "FollowForm", action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString() },
            react_1.default.createElement("input", { type: "hidden", name: "actor", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "User's @id"),
                react_1.default.createElement("input", { type: "text", name: "object" })),
            react_1.default.createElement("button", { type: "submit" }, "Follow")),
        react_1.default.createElement("script", { type: "module", src: "/FollowForm.js" })));
}
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
        react_1.default.createElement("h2", null, "Post a Status"),
        react_1.default.createElement("form", { id: "CreateNoteForm", action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), noValidate: true },
            react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "What's on your mind?"),
                react_1.default.createElement("textarea", { name: "content" })),
            react_1.default.createElement("button", { type: "submit" }, "Post Status")),
        react_1.default.createElement("script", { type: "module", src: "/CreateNoteForm.js" })));
}
function CreateArticleForm({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Post a Blog"),
        react_1.default.createElement("form", { id: "CreateArticleForm", action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), noValidate: true },
            react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Summary"),
                react_1.default.createElement("textarea", { name: "summary" })),
            react_1.default.createElement("label", null,
                react_1.default.createElement("span", null, "Content"),
                react_1.default.createElement("textarea", { name: "content" })),
            react_1.default.createElement("button", { type: "submit" }, "Post Blog")),
        react_1.default.createElement("script", { type: "module", src: "/CreateArticleForm.js" })));
}
function InboxFeed({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Feed"),
        react_1.default.createElement("ul", null, 'orderedItems' in actor.inbox && Array.isArray(actor.inbox.orderedItems) ? actor.inbox.orderedItems.map(item => {
            return react_1.default.createElement("blog-post", { "data-id": (0, activitypub_core_utilities_1.getId)(item).toString(), "data-user-id": (0, activitypub_core_utilities_1.getId)(actor).toString() });
        }) : null)));
}
function OutboxFeed({ actor }) {
    return (react_1.default.createElement("div", { className: "feed" },
        react_1.default.createElement("h2", null, "Recent Posts"),
        react_1.default.createElement("ul", null, 'orderedItems' in actor.outbox && Array.isArray(actor.outbox.orderedItems) ? actor.outbox.orderedItems.map(item => {
            return react_1.default.createElement("blog-post", { "data-id": (0, activitypub_core_utilities_1.getId)(item).toString() });
        }) : null)));
}
function LikeButton({ object, actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", { action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), className: "LikeButtonForm" },
            react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor.id).toString() }),
            react_1.default.createElement("input", { type: "hidden", name: "objectId", value: (0, activitypub_core_utilities_1.getId)(object.id).toString() }),
            'to' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectTo", value: JSON.stringify(object.to) })) : null,
            'cc' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectCC", value: JSON.stringify(object.cc) })) : null,
            'audience' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectAudience", value: JSON.stringify(object.audience) })) : null,
            react_1.default.createElement("button", { type: "submit" }, "Like")),
        react_1.default.createElement("script", { type: "module", src: "/LikeButtonForm.js" }));
}
function AnnounceButton({ object, actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", { action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString(), className: "AnnounceButtonForm" },
            react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor.id).toString() }),
            react_1.default.createElement("input", { type: "hidden", name: "objectId", value: (0, activitypub_core_utilities_1.getId)(object.id).toString() }),
            'to' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectTo", value: JSON.stringify(object.to) })) : null,
            'cc' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectCC", value: JSON.stringify(object.cc) })) : null,
            'audience' in object ? (react_1.default.createElement("input", { type: "hidden", name: "objectAudience", value: JSON.stringify(object.audience) })) : null,
            react_1.default.createElement("button", { type: "submit" }, "Announce")),
        react_1.default.createElement("script", { type: "module", src: "/AnnounceButtonForm.js" }));
}
function ReplyForm({ object, actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("details", null,
            react_1.default.createElement("summary", null, "Reply"),
            react_1.default.createElement("form", { className: "ReplyForm", noValidate: true, action: (0, activitypub_core_utilities_1.getId)(actor.outbox).toString() },
                react_1.default.createElement("input", { type: "hidden", name: "actorId", value: (0, activitypub_core_utilities_1.getId)(actor).toString() }),
                react_1.default.createElement("input", { type: "hidden", name: "inReplyTo", value: (0, activitypub_core_utilities_1.getId)(object).toString() }),
                react_1.default.createElement("label", null,
                    react_1.default.createElement("span", null, "Reply"),
                    react_1.default.createElement("textarea", { name: "content" })),
                react_1.default.createElement("button", { type: "submit" }, "Send Reply")),
            react_1.default.createElement("script", { type: "module", src: "/ReplyForm.js" })));
}
//# sourceMappingURL=DashboardPage.js.map