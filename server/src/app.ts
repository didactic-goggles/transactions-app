import express, { Request, Response, NextFunction } from "express"
import { json } from "body-parser"
import cors from "cors"
import path from "path"
import open from "open"
import transactionRoutes from "./routes/transactions"
import downloadRoutes from "./routes/download"
const app = express()

app.use(json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, "../../client/build")))
app.use("/db/transactions", transactionRoutes)
app.use("/db/download", downloadRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: false, message: err.message })
})

app.get("*", function (_, response) {
  response.sendFile(path.join(__dirname, "../../client/build", "index.html"))
})

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))

// opens the url in the default browser
open("http://localhost:3000", { app: { name: "google chrome" } })
