import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    desiredJobTitle: {type: String, required: true},
    aboutMe: {type: String},
    password: {type: String, required: true,},
}, {
    timestamps: true,
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);

export default User;
