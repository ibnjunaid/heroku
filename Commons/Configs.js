"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.databaseName = exports.TWITTER_TOKEN = exports.URI = void 0;
var mongodb_1 = require("mongodb");
require('dotenv').config();
exports.URI = process.env.ALTAS_MONGO_URI || '';
exports.TWITTER_TOKEN = process.env.TWITTER_TOKEN || '';
exports.databaseName = "trends";
exports.client = new mongodb_1.MongoClient(exports.URI, { useUnifiedTopology: true });
//# sourceMappingURL=Configs.js.map