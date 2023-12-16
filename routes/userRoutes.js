import express from 'express'
const router = express.Router()

import userController from '../controllers/userController.js'
import validateToken from '../middleware/validateTokenHandler.js';

const { registerUser, loginUser, currentUser } = userController;

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken, currentUser)

export default router;