"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const json2csv_1 = require("json2csv");
const json_as_xlsx_1 = __importDefault(require("json-as-xlsx"));
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowdb(adapter);
const availableTypes = ["txt", "json", "csv", "xlsx"];
const settings = {
    writeOptions: {
        type: "buffer",
        bookType: "xlsx",
    },
};
const downloadFile = async (req, res, next) => {
    const { type } = req.body;
    if (availableTypes.indexOf(type) === -1) {
        res.status(500).json({
            message: "Invalid file type",
        });
    }
    const dbData = db.get("transactions").value();
    let fileContent;
    switch (type) {
        case "json":
            fileContent = JSON.stringify(dbData);
            break;
        case "txt":
            const json2txtParser = new json2csv_1.Parser();
            fileContent = json2txtParser.parse(dbData);
            break;
        case "csv":
            const json2csvParser = new json2csv_1.Parser();
            fileContent = json2csvParser.parse(dbData);
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
                    content: dbData,
                },
            ];
            fileContent = (0, json_as_xlsx_1.default)(data, settings);
            break;
    }
    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-disposition": `attachment; filename=export.${type}`,
    });
    res.end(fileContent);
};
exports.downloadFile = downloadFile;
