import express from 'express';
import { login, register, secret, updateProfile } from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/auth-check', requireSignin, (req,res) => {
    res.json({ok: true});
});
router.get('/admin-check', requireSignin, isAdmin, (req,res) => {
    res.json({ok: true});
});
router.put('/profile', requireSignin, updateProfile);
router.get('/secret', requireSignin, isAdmin, secret);
export default router;