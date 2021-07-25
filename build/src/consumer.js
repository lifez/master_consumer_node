"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = void 0;
var amqplib_1 = __importDefault(require("amqplib"));
var startConsumer = function () {
    amqplib_1.default.connect("amqp://localhost").then(function (connection) {
        connection.createChannel().then(function (channel) {
            var queue = "user_snapshot";
            channel.consume(queue, function (msg) {
                console.log(" [x] Receive %s", msg.content);
                channel.ack(msg);
            });
        });
    });
};
exports.startConsumer = startConsumer;
