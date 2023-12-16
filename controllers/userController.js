import asyncHandler from 'express-async-handler'
import userSchema from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    console.log('in register');
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await userSchema.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // must hash password using bcrypt  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({ message: "Register the user" });
})

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await userSchema.findOne({ email })
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "35m" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }

})

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.query.user);
})

export default { currentUser, registerUser, loginUser };