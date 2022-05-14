"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const download_1 = __importDefault(require("./routes/download"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use("/transactions", transactions_1.default);
app.use("/download", download_1.default);
app.get('*', (req, res, next) => {
    res.status(404).json({ status: false, message: 'Not found' });
});
app.use((err, req, res, next) => {
    res.status(500).json({ status: false, message: err.message });
});
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
