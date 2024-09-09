import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required:true,
        },
        lastName: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            unique: true,
            required:true,
        },
        mobile: {
            type: String,
            required:true,
        },
        otp:{
            type: String,
            default: 0,
            required: true,
        },
        password: {
            type: String,
            unique: true,
            required:true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Users = mongoose.model('users', UserSchema);

export default Users;