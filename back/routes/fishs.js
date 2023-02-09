import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createFish, getAllFishs, getFish, getSellFishs, editFish } from '../controllers/fishs.js'

const router = Router()

// multipart/form-data上傳型態 -> jwt驗證 -> 驗證是否為管理員 -> 上傳 -> 新增商品
router.post('/', content('multipart/form-data'), jwt, admin, upload, createFish)
router.get('/', getSellFishs) // 取上架商品
router.get('/all', jwt, admin, getAllFishs) // 取所有商品，管理員用
router.get('/:id', getFish) // 取單個商品
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editFish) // 編輯商品

export default router
