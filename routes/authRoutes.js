import express from 'express';
import { registerUser, loginUser, checkAuth } from '../controllers/authController.js';
import {registerValidation} from '../validation/user-validation.js'
import {validationResult} from 'express-validator';

const authRoutes = express.Router();

authRoutes.post('/register', registerValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    registerUser(req, res, next);
});

authRoutes.post('/login', loginUser);
authRoutes.get('/check', checkAuth);

export default authRoutes;
