"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMaster = void 0;
var amqplib_1 = __importDefault(require("amqplib"));
var startMaster = function () {
    amqplib_1.default.connect("amqp://localhost").then(function (connection) {
        connection.createChannel().then(function (channel) {
            var queue = "user_snapshot";
            var msg = "Hello world";
            channel.assertQueue(queue, {
                durable: false,
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
    });
};
exports.startMaster = startMaster;
