"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.ResizableHandle = exports.ResizablePanel = exports.ResizablePanelGroup = void 0;
var lucide_react_1 = require("lucide-react");
var ResizablePrimitive = require("react-resizable-panels");
var utils_1 = require("@/lib/utils");
var ResizablePanelGroup = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(ResizablePrimitive.PanelGroup, __assign({ className: utils_1.cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className) }, props)));
};
exports.ResizablePanelGroup = ResizablePanelGroup;
var ResizablePanel = ResizablePrimitive.Panel;
exports.ResizablePanel = ResizablePanel;
var ResizableHandle = function (_a) {
    var withHandle = _a.withHandle, className = _a.className, props = __rest(_a, ["withHandle", "className"]);
    return (React.createElement(ResizablePrimitive.PanelResizeHandle, __assign({ className: utils_1.cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className) }, props), withHandle && (React.createElement("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border" },
        React.createElement(lucide_react_1.GripVertical, { className: "h-2.5 w-2.5" })))));
};
exports.ResizableHandle = ResizableHandle;
