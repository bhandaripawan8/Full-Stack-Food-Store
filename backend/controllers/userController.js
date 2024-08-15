
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found, please register a new user" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = await createToken(user._id);
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


// create token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists, please login" });
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please use a valid email' });
        }
        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password, at least 8 characters' });
        }
        // Hash user password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create and save the new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(newUser._id);
        return res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

export {loginUser, registerUser};