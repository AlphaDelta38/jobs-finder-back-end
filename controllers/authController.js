import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUserObjFields } from '../utils/functions.js'
import { userValidateFieldsKeys } from '../constants/userConstants.js'

const SECRET_KEY = process.env.SECRET_KEY || 'test_secret_key';

export const registerUser = async (req, res) => {
    const { email, password, ...other } = req.body;

    try {
        const validateObj = checkUserObjFields({email, password, ...other}, userValidateFieldsKeys)
        if(validateObj != null) throw new Error(validateObj)

        const checkExistUser = await User.findOne({email: email}).select('-password');
        if (checkExistUser) throw new Error('User with same email has been registered')

        const hashedPassword = await bcrypt.hash(password.toString(),4);

        const user = new User({ email, password: hashedPassword, ...other })
        await user.save();

        const token = createJWT(user);

        res.status(201).json({ message: 'User has been created', token });
    } catch (err) {
        res.status(400).json({ error: 'Error with register', details: err.message});
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) throw new Error('Email and password is required');

        const user = await User.findOne({email: email});
        if (!user) throw new Error('Email or password not correct')

        const isMatch = await bcrypt.compare(password.toString(), user.password.toString());

        if (!isMatch) throw new Error('Email or password not correct');

        const token = createJWT(user);

        res.status(201).json({ message: 'Login successfully', token });
    } catch (err) {
        res.status(400).json({ error: 'Error with register', details: err.message});
    }
};

export const checkAuth = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'User not login' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        return res.status(200).json(createJWT(decoded));
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

function createJWT(user){
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            aboutMe: user.aboutMe,
            desiredJobTitle: user.desiredJobTitle
        },
        SECRET_KEY,
        { expiresIn: '24h' }
    )
}
