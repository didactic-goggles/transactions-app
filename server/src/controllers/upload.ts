import { RequestHandler, Response } from "express"
import xlsx from 'node-xlsx'
import lowdb = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import { ITransaction, Transaction } from "../models/transaction"

export const uploadFile: RequestHandler = async (req, res, next) => {
    if (!req.files) throw new Error('No files')
    const files = Object.assign(req.files)
    const file = files[0] as Express.Multer.File
    const xlsxFile = xlsx.parse(file.buffer);
    console.log(xlsxFile)
    res.status(200).json({
        status: true,
        data: xlsxFile[0].data
    })
}
