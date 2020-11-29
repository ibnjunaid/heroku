"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSpaceAndDotsWith_ = exports.findPlaceByWoeid = void 0;
var WOEID_json_1 = __importDefault(require("../data/WOEID.json"));
//find the place by Woeid
function findPlaceByWoeid(Woeid) {
    return WOEID_json_1.default.find(function (d) { return d.woeid == Woeid; });
}
exports.findPlaceByWoeid = findPlaceByWoeid;
//Replace spaces with _ so that it can be used for collection naming 
function replaceSpaceAndDotsWith_(name) {
    var x = name.replace(/\s/g, '_');
    return x.replace(/\./g, '_');
}
exports.replaceSpaceAndDotsWith_ = replaceSpaceAndDotsWith_;
//# sourceMappingURL=Woeid-methods.js.map