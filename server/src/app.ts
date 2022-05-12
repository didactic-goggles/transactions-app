import express, { Request, Response, NextFunction } from "express"
import { json } from "body-parser"
import cors from "cors"
import transactionRoutes from "./routes/transactions"
import downloadRoutes from "./routes/download"
const app = express()

app.use(json())
app.use(cors())
app.use("/transactions", transactionRoutes)
app.use("/download", downloadRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))
