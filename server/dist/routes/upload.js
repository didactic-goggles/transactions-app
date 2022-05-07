"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
router.post("/", (0, multer_1.default)().any(), upload_1.uploadFile);
exports.default = router;
