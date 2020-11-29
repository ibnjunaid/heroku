"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndSaveTrends = void 0;
var axios_1 = __importDefault(require("axios"));
var mongoose = require("mongoose");
var Trend_Model_1 = require("./Trend.Model");
var Configs_1 = require("../Commons/Configs");
var Woeid_methods_1 = require("../Commons/Woeid-methods");
//Set Twitter API token Here 
axios_1.default.defaults.headers.common['Authorization'] = Configs_1.TWITTER_TOKEN;
function fetchAndSaveTrends(Woeid, conn) {
    return __awaiter(this, void 0, void 0, function () {
        var mongoConn, responseData, match, place, trendModel, trendresponseData, savedDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn];
                case 1:
                    mongoConn = _a.sent();
                    //Switch to trends databaseName
                    mongoConn.connection.useDb(Configs_1.databaseName);
                    return [4 /*yield*/, getTrendsByCountry(Woeid)];
                case 2:
                    responseData = _a.sent();
                    if (!responseData) return [3 /*break*/, 4];
                    match = Woeid_methods_1.findPlaceByWoeid(Woeid);
                    place = Woeid_methods_1.replaceSpaceAndDotsWith_((match === null || match === void 0 ? void 0 : match.name) || '');
                    trendModel = mongoose.model(place, Trend_Model_1.responseSchema, place);
                    trendresponseData = new trendModel({
                        trends: responseData === null || responseData === void 0 ? void 0 : responseData.trends,
                        as_of: responseData === null || responseData === void 0 ? void 0 : responseData.as_of,
                        locations: responseData === null || responseData === void 0 ? void 0 : responseData.location
                    });
                    return [4 /*yield*/, trendresponseData.save()];
                case 3:
                    savedDoc = _a.sent();
                    if (savedDoc) {
                        console.info("Data Saved with id : " + savedDoc._id + " in " + savedDoc.collection.name + " at " + new Date());
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchAndSaveTrends = fetchAndSaveTrends;
/*
    * arg : woeid - A number uniquely idenifying places
    * fetches the data and passes to parseResponse function for adding trend index
    * and remove unnecessary data
*/
function getTrendsByCountry(woeid) {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/1.1/trends/place.json?id=" + woeid)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, parseResponse(response.data[0])];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function parseResponse(responseData) {
    var Response = {
        trends: responseData.trends.map(function (d, i) { return parseTrend(d, i); }).filter(function (d) { return d.index < 11; }),
        as_of: responseData.as_of,
        location: responseData.locations
    };
    return Response;
}
var parseTrend = function (d, i) {
    var t = {
        index: i + 1,
        name: d.name,
        tweet_volume: d.tweet_volume,
        url: d.url
    };
    return t;
};
//# sourceMappingURL=fetcher.js.map