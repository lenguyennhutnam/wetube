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
exports.Calendar = void 0;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var react_day_picker_1 = require("react-day-picker");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
function Calendar(_a) {
    var className = _a.className, classNames = _a.classNames, _b = _a.showOutsideDays, showOutsideDays = _b === void 0 ? true : _b, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    return (React.createElement(react_day_picker_1.DayPicker, __assign({ showOutsideDays: showOutsideDays, className: utils_1.cn("p-3", className), classNames: __assign({ months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", month: "space-y-4", caption: "flex justify-center pt-1 relative items-center", caption_label: "text-sm font-medium", nav: "space-x-1 flex items-center", nav_button: utils_1.cn(button_1.buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"), nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-y-1", head_row: "flex", head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", row: "flex w-full mt-2", cell: utils_1.cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"), day: utils_1.cn(button_1.buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"), day_range_start: "day-range-start", day_range_end: "day-range-end", day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", day_today: "bg-accent text-accent-foreground", day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground", day_disabled: "text-muted-foreground opacity-50", day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground", day_hidden: "invisible" }, classNames), components: {
            IconLeft: function (_a) {
                var className = _a.className, props = __rest(_a, ["className"]);
                return (React.createElement(lucide_react_1.ChevronLeft, __assign({ className: utils_1.cn("h-4 w-4", className) }, props)));
            },
            IconRight: function (_a) {
                var className = _a.className, props = __rest(_a, ["className"]);
                return (React.createElement(lucide_react_1.ChevronRight, __assign({ className: utils_1.cn("h-4 w-4", className) }, props)));
            }
        } }, props)));
}
exports.Calendar = Calendar;
Calendar.displayName = "Calendar";
