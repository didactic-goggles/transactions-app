import { Router } from "express"
import multer from 'multer'
import { downloadFile } from "../controllers/download"

const router = Router()
router.post("/", multer().any(), downloadFile)

export default router
