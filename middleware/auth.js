import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const requireSignin = (req,res,next) => {
    try{
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json(err);
    }
};
export const isAdmin = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).json("Unauthorized");
        }else{
            next();
        }
    }catch(err){
        console.log(err);
    }
}