"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSchema = void 0;
var mongoose = require("mongoose");
// export const trendSchema = new mongoose.Schema({
//     index :Number,
//     name : String,
//     url : String,
//     tweet_volume : Number
// })
// let locationSchema = new mongoose.Schema({
//     name : String,
//     woeid : Number,
// })
exports.responseSchema = new mongoose.Schema({
    trends: [],
    as_of: Date,
    created_at: Date,
    locations: []
});
//# sourceMappingURL=Trend.Model.js.map