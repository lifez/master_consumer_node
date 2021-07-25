"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var consumer_1 = require("./consumer");
var master_1 = require("./master");
master_1.startMaster();
consumer_1.startConsumer();
