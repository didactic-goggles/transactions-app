"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const open_1 = __importDefault(require("open"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const download_1 = __importDefault(require("./routes/download"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/build")));
app.use("/db/transactions", transactions_1.default);
app.use("/db/download", download_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ status: false, message: err.message });
});
app.get("*", function (_, response) {
    response.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
// opens the url in the default browser
(0, open_1.default)("http://localhost:3000", { app: { name: "google chrome" } });
