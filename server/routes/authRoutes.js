import express from 'express'
import { login, register, test } from '../controllers/authController.js';

const authRouter=express.Router();

authRouter.get('/test', test);
authRouter.post('/register',register);
authRouter.post('/login', login)


export default authRouter;