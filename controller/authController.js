import User from '../model/user.js';
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        if(!name){
            return res.json({error: 'Name is required'});
        }
        if(!email){
            return res.json({error: 'Email is required'});
        }
        if(!password){
            return res.json({error: 'Password is required'});
        }
        if(!password || password.length < 6){
            return res.json({error: 'Password must be at least 6 characters long'});
        }
        // check user
        const userExists = await User.findOne({email});
        if(userExists){
            return res.json({error: 'Email already taken'});
        }
        // console.log(password);
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            password: hashedPassword
        }).save();
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address
            },
            token
        });
    }catch(err){
        console.log(err);
    }
}
export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email){
            return res.json({error: 'Email is required'});
        }
        if(!password || password.length < 6){
            return res.json({error: 'password must be at least 6 characters long'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: "User not found"})
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.json({error: "Wrong password"});
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token
        });
    }catch (err) {
        console.log(err);
    }
}
export const updateProfile = async (req,res) => {
    try {
        const {name, password, address} = req.body;
        const user = User.findById(req.user._id);
        if(password && password.length < 6){
            return res.json({error: "Password is required and password should be min 6 characters long"});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updated = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                address: address || user.address
            },
            {
                new: true
            }
        );
        updated.password = undefined;
        res.json(updated);
    }catch (err) {
        console.log(err);
    }
}
export const secret = (req,res) => {
    res.json({currentUser: req.user});
}
