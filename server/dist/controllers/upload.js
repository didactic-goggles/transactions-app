"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const uploadFile = async (req, res, next) => {
    if (!req.files)
        throw new Error('No files');
    const files = Object.assign(req.files);
    const file = files[0];
    const xlsxFile = node_xlsx_1.default.parse(file.buffer);
    console.log(xlsxFile);
    res.status(200).json({
        status: true,
        data: xlsxFile[0].data
    });
};
exports.uploadFile = uploadFile;
