"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostTemplate = void 0;
const react_1 = __importDefault(require("react"));
function BlogPostTemplate({ headingLevel }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("template", { id: "BlogPost-template" },
            react_1.default.createElement("div", { className: "BlogPost" },
                react_1.default.createElement("span", { role: "heading", "aria-level": headingLevel + 1 },
                    react_1.default.createElement("slot", { name: "summary" })),
                react_1.default.createElement("slot", { name: "content" }),
                react_1.default.createElement("slot", { name: "published" }),
                react_1.default.createElement("slot", { name: "likeButton" })),
            react_1.default.createElement("style", null, `
          :host(.card) .BlogPost {
            border: 1px solid;
            padding: 12px;
            border-radius: 6px;
          }
        `)),
        react_1.default.createElement("script", { src: "/BlogPost.js", type: "module" }));
}
exports.BlogPostTemplate = BlogPostTemplate;
;
//# sourceMappingURL=BlogPostTemplate.js.map