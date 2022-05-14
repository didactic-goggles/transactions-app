import { RequestHandler } from "express"
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

const availableTypes = ["txt", "json", "csv", "xlsx"]

const settings: any = {
  writeOptions: {
    type: "buffer",
    bookType: "xlsx",
  },
}

export const downloadFile: RequestHandler = async (req, res, next) => {
  const { type } = req.body
  if (availableTypes.indexOf(type) === -1) {
    res.status(500).json({
      message: "Invalid file type",
    })
  }
  const dbData = db.get("transactions").value()
  let fileContent
  switch (type) {
    case "json":
      fileContent = JSON.stringify(dbData)
      break
    case "txt":
      const json2txtParser = new Parser()
      fileContent = json2txtParser.parse(dbData)

      break
    case "csv":
      const json2csvParser = new Parser()
      fileContent = json2csvParser.parse(dbData)
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
          content: dbData,
        },
      ]
      // @ts-ignore
      fileContent = xlsx(data, settings)
      break
  }
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-disposition": `attachment; filename=export.${type}`,
  })
  res.end(fileContent)
}
