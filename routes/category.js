import express from "express";
import { create, list, ProductByCategory, read, remove, update } from "../controllers/CategoryController.js";
import { isAdmin, requireSignin } from "../middleware/auth.js";
const router = express.Router();

router.post('/category', requireSignin, isAdmin, create);
router.put('/category/:id', requireSignin, isAdmin, update);
router.delete('/category/:id', requireSignin, isAdmin, remove);
router.get('/categories', list);
router.get('/category/:slug', read);
router.get('/products-by-category/:slug', ProductByCategory);

export default router;