"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.databaseName = exports.TWITTER_TOKEN = exports.URI = void 0;
var mongodb_1 = require("mongodb");
require('dotenv').config();
exports.URI = "mongodb+srv://pengooX:Cyanide7Licker8@cluster0.pp3rq.mongodb.net/trends?retryWrites=true&w=majority";
exports.TWITTER_TOKEN = "Bearer AAAAAAAAAAAAAAAAAAAAABmeBQEAAAAAmzrYEOjmTefDQ342sQtNLO2eWkI%3DnLjh6by8TpUF6Jx492oP7220NedIGMFlwXno2NRVnIsT1908FL";
exports.databaseName = "trends";
exports.client = new mongodb_1.MongoClient(exports.URI, { useUnifiedTopology: true });
//# sourceMappingURL=Configs.js.map