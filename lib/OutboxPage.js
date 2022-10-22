"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxPage = void 0;
const react_1 = __importDefault(require("react"));
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
const BlogPostTemplate_1 = require("./BlogPostTemplate");
function OutboxPage({ headingLevel, collection, user }) {
    if (!('orderedItems' in collection) || !Array.isArray(collection.orderedItems)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("main", null,
        react_1.default.createElement("span", { role: "heading", "aria-level": headingLevel }, "Michael Puckett's Blog"),
        react_1.default.createElement("div", { className: "feed" }, collection.orderedItems.map(item => {
            return (react_1.default.createElement("blog-post", { "data-id": (0, activitypub_core_utilities_1.getId)(item).toString() }));
        })),
        react_1.default.createElement(BlogPostTemplate_1.BlogPostTemplate, { headingLevel: headingLevel + 1 })));
}
exports.OutboxPage = OutboxPage;
//# sourceMappingURL=OutboxPage.js.map