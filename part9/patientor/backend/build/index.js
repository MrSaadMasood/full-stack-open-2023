"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/ping", (_req, res) => {
    console.log("the endpoint is pinged");
    res.send("pong");
});
app.listen(PORT, () => console.log("server listening at port ", PORT));
