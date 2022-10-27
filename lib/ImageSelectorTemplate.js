"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSelectorTemplate = void 0;
const react_1 = __importDefault(require("react"));
function ImageSelectorTemplate({}) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("template", { id: "ImageSelector-template" },
            react_1.default.createElement("details", null,
                react_1.default.createElement("summary", null, "Select an Image"),
                react_1.default.createElement("select", null))),
        react_1.default.createElement("script", { src: "/ImageSelector.js", type: "module" }));
}
exports.ImageSelectorTemplate = ImageSelectorTemplate;
;
//# sourceMappingURL=ImageSelectorTemplate.js.map