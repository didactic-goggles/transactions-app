import { RequestHandler } from "express"
import fs from "fs"
import { Parser } from "json2csv"
import xlsx from "json-as-xlsx"
import lowdb = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import { Transaction } from "../models/transaction"
type Data = {
  transactions: Transaction[]
}
const adapter = new FileSync<Data>("data/db.json")
const db = lowdb(adapter)

const settings: any = {
  writeOptions: {
    type: "buffer",
    bookType: "xlsx",
  },
}

export const downloadFile: RequestHandler = async (req, res, next) => {
  const { type } = req.body

  switch (type) {
    case "json":
      fs.writeFile(
        "dist/export.json",
        JSON.stringify(db.get("transactions").value()),
        () => res.sendFile("export.json", { root: "dist/" })
      )
      break
    case "txt":
      const json2txtParser = new Parser()
      const txt = json2txtParser.parse(db.get("transactions").value())
      fs.writeFile("dist/export.txt", txt, () =>
        res.sendFile("export.txt", { root: "dist/" })
      )
      break
    case "csv":
      const json2csvParser = new Parser()
      const csv = json2csvParser.parse(db.get("transactions").value())
      fs.writeFile("dist/export.csv", csv, () =>
        res.sendFile("export.csv", { root: "dist/" })
      )
      break
    case "xlsx":
      const data: any[] = [
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
      ]
      const buffer = xlsx(data, settings)
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-disposition": "attachment; filename=export.xlsx",
      })
      res.end(buffer)
      break
    default:
      res.status(500).json({
        message: "Invalid file type",
      })
      break
  }
}
