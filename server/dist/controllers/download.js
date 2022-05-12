"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const json2csv_1 = require("json2csv");
const json_as_xlsx_1 = __importDefault(require("json-as-xlsx"));
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowdb(adapter);
const settings = {
    writeOptions: {
        type: "buffer",
        bookType: "xlsx",
    },
};
const downloadFile = async (req, res, next) => {
    const { type } = req.body;
    switch (type) {
        case "json":
            fs_1.default.writeFile("dist/export.json", JSON.stringify(db.get("transactions").value()), () => res.sendFile("export.json", { root: "dist/" }));
            break;
        case "txt":
            const json2txtParser = new json2csv_1.Parser();
            const txt = json2txtParser.parse(db.get("transactions").value());
            fs_1.default.writeFile("dist/export.txt", txt, () => res.sendFile("export.txt", { root: "dist/" }));
            break;
        case "csv":
            const json2csvParser = new json2csv_1.Parser();
            const csv = json2csvParser.parse(db.get("transactions").value());
            fs_1.default.writeFile("dist/export.csv", csv, () => res.sendFile("export.csv", { root: "dist/" }));
            break;
        case "xlsx":
            const data = [
                {
                    sheet: "Sheet1",
                    columns: [
                        {
                            label: "Description",
                            value: "description",
                        },
                        {
                            label: "Amount",
                            value: "amount",
                        },
                        {
                            label: "Date",
                            value: "date",
                        },
                    ],
                    content: db.get("transactions").value(),
                },
            ];
            const buffer = (0, json_as_xlsx_1.default)(data, settings);
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-disposition": "attachment; filename=export.xlsx",
            });
            res.end(buffer);
            break;
        default:
            res.status(500).json({
                message: "Invalid file type",
            });
            break;
    }
};
exports.downloadFile = downloadFile;
