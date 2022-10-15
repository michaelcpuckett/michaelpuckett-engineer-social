"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityPage = void 0;
const react_1 = __importDefault(require("react"));
function EntityPage({ entity, actor }) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, "ActivityPub - Entity")),
            react_1.default.createElement("body", null,
                react_1.default.createElement("main", null, "There's an entity here!"))));
}
exports.EntityPage = EntityPage;
;
//# sourceMappingURL=EntityPage.js.map