"use strict";
/*******************************************************
 * Copyright (C) 2010-2011 Osamabinjunaid <Osamabinjunaid36@gmail.com>
 *
 * This file is part of trendsVisualizer.
 *
 * TrendsVisualizer can not be copied and/or distributed without the express
 * permission of Osama Bin Junaid
 *******************************************************/
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
/*##############################
* This is file is the entry to the App.
* setInterval calls the start() after each 59 minutes passed
* start() loops over the woeidList and passes an object of type place and index to distributeWork
* distributeWork() limits the request by sending only 74 request in a 15 minutes window
* fetchAndPause() helps by fetching and saving only 74 request and pausing for 17 minutes
* sleep() returns a promise which resloves after *ms milliseconds
################################*/
var server_1 = require("./Server/server");
var fetcher_1 = require("./Fetcher/fetcher");
var WOEID_json_1 = __importDefault(require("./data/WOEID.json"));
var Configs_1 = require("./Commons/Configs");
var mongoose = require("mongoose");
var min = 1000 * 60;
var interval = 59 * min;
var conn = mongoose.connect(Configs_1.URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: Configs_1.databaseName });
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function fetchAndPause(woeid, mul) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(mul * min)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetcher_1.fetchAndSaveTrends(woeid, conn)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function distributeWork(d, i) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(i < 74)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchAndPause(d.woeid, 0)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 2:
                    if (!(i >= 74 && i <= 148)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchAndPause(d.woeid, 17)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    if (!(i >= 149 && i <= 222)) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetchAndPause(d.woeid, 35)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    console.error("Check Woeid : if it contains more than 222 places");
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Fetch Started at " + new Date());
            WOEID_json_1.default.forEach(distributeWork);
            return [2 /*return*/];
        });
    });
}
server_1.app.listen(8080, "localhost", function () {
    console.log("Server listening on http://localhost:8080");
});
start()
    .catch(function (err) { console.log("ERROR IS BEING HANDELED"); });
var intervalID = setInterval(function () {
    console.log("Fetch Registred at " + new Date());
    start();
}, interval);
//# sourceMappingURL=start.js.map