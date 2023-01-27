import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        max: 6,
        min: 3
    },
    address: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: "0"
    }
},
{
    timestemps: true,
    versionKey: false
});

export default mongoose.model("User", userSchema);