import { Router } from "express"
import multer from 'multer'
import { uploadFile } from "../controllers/upload"

const router = Router()
router.post("/", multer().any(), uploadFile)

export default router
