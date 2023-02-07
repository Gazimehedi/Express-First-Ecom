import express from 'express';
import {register, login,updateProfile,secret} from "../controller/authController.js";
import {requireSignin, isAdmin} from "../middleware/auth.js";
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