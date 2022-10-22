"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityPage = void 0;
const react_1 = __importDefault(require("react"));
const activitypub_core_types_1 = require("activitypub-core-types");
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
const OutboxPage_1 = require("./OutboxPage");
function EntityPage({ entity, actor: user }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, "ActivityPub - Entity"),
                react_1.default.createElement("link", { rel: "stylesheet", href: "/EntityPage.css" }),
                react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" })),
            react_1.default.createElement("body", null,
                react_1.default.createElement("main", null,
                    react_1.default.createElement(Entity, { headingLevel: 1, entity: entity, user: user }),
                    react_1.default.createElement("textarea", { defaultValue: JSON.stringify(entity) })))));
}
exports.EntityPage = EntityPage;
;
function Entity({ headingLevel, entity, user }) {
    if ((0, activitypub_core_utilities_1.isType)(entity, activitypub_core_types_1.AP.ExtendedObjectTypes.ARTICLE)) {
        return react_1.default.createElement(ArticleEntity, { article: entity });
    }
    if ((0, activitypub_core_utilities_1.isType)(entity, activitypub_core_types_1.AP.ExtendedObjectTypes.NOTE)) {
        return react_1.default.createElement(NoteEntity, { headingLevel: headingLevel, note: entity, user: user });
    }
    if ((0, activitypub_core_utilities_1.isTypeOf)(entity, activitypub_core_types_1.AP.ActivityTypes)) {
        return react_1.default.createElement(ActivityEntity, { headingLevel: headingLevel, activity: entity, user: user });
    }
    if ((0, activitypub_core_utilities_1.isTypeOf)(entity, activitypub_core_types_1.AP.ActorTypes)) {
        return react_1.default.createElement(ActorEntity, { headingLevel: headingLevel, actor: entity, user: user });
    }
    if ((0, activitypub_core_utilities_1.isType)(entity, activitypub_core_types_1.AP.CollectionTypes.COLLECTION)) {
        return react_1.default.createElement(CollectionEntity, { headingLevel: headingLevel, collection: entity, user: user });
    }
    if ((0, activitypub_core_utilities_1.isType)(entity, activitypub_core_types_1.AP.CollectionTypes.ORDERED_COLLECTION)) {
        if (entity.name === 'Outbox') {
            return react_1.default.createElement(OutboxPage_1.OutboxPage, { headingLevel: headingLevel, collection: entity, user: user });
        }
        return react_1.default.createElement(OrderedCollectionEntity, { headingLevel: headingLevel, collection: entity, user: user });
    }
    if ((0, activitypub_core_utilities_1.isTypeOf)(entity, activitypub_core_types_1.AP.ExtendedObjectTypes)) {
        return react_1.default.createElement(ExtendedObjectEntity, { headingLevel: headingLevel, extendedObject: entity, user: user });
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
}
function ExtendedObjectEntity({ headingLevel, extendedObject, user }) {
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("div", { role: "heading", "aria-level": headingLevel },
            "An ",
            extendedObject.type,
            ".")));
}
function ActorEntity({ headingLevel, actor, user }) {
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("div", { role: "heading", "aria-level": headingLevel },
            "@",
            actor.preferredUsername)));
}
function NoteEntity({ headingLevel, note, user }) {
    const rawAttributedTo = note.attributedTo;
    const untypedAttributedTo = rawAttributedTo && !(rawAttributedTo instanceof URL) && !(Array.isArray(rawAttributedTo)) ? rawAttributedTo : null;
    let attributedTo = null;
    for (const type of Object.values(activitypub_core_types_1.AP.ActorTypes)) {
        if (type === untypedAttributedTo.type) {
            attributedTo = untypedAttributedTo;
        }
    }
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("div", { role: "heading", "aria-level": headingLevel },
            "A note by",
            react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(attributedTo).toString() ?? '#' },
                "@",
                attributedTo.preferredUsername))));
}
function CollectionEntity({ headingLevel, collection, user }) {
    if (!('items' in collection) || !Array.isArray(collection.items)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("ul", null, collection.items.map(item => {
        if (item instanceof URL) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        return react_1.default.createElement(Entity, { headingLevel: headingLevel + 1, entity: item, user: user });
    })));
}
function OrderedCollectionEntity({ headingLevel, collection, user }) {
    if (!('orderedItems' in collection) || !Array.isArray(collection.orderedItems)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("ul", null, collection.orderedItems.map(item => {
        if (item instanceof URL) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        return react_1.default.createElement(Entity, { headingLevel: headingLevel + 1, entity: item, user: user });
    })));
}
function ActivityEntity({ headingLevel, activity, user }) {
    const activityActor = activity.actor;
    if (activityActor instanceof URL || !('preferredUsername' in activityActor)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const rawActivityObject = 'object' in activity ? activity.object : null;
    const activityObject = rawActivityObject && !(rawActivityObject instanceof URL) && !(Array.isArray(rawActivityObject)) ? rawActivityObject : null;
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("div", { role: "heading", "aria-level": headingLevel },
            react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(activityActor).toString() ?? '#' },
                "@",
                activityActor.preferredUsername),
            ' ',
            "performed a(n)",
            ' ',
            react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(activity).toString() ?? '#' },
                activity.type,
                " activity"),
            activityObject ? react_1.default.createElement(react_1.default.Fragment, null,
                ' ',
                "on a(n)",
                ' ',
                react_1.default.createElement("a", { href: (0, activitypub_core_utilities_1.getId)(activityObject).toString() ?? '#' }, activityObject.type)) : null,
            ".")));
}
function ArticleEntity({ article }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, article.summary),
        react_1.default.createElement("p", null, article.published.toString()),
        react_1.default.createElement("p", null, article.attributedTo.toString()),
        article.content);
}
//# sourceMappingURL=EntityPage.js.map