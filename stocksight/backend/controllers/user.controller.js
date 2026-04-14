import User from "../schemas/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User registered",
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Login successful",
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        // Accept email or username from query or body
        const { email, username } = req.query.email || req.query.username ? req.query : req.body;
        
        const identifier = email || username;
        if (!identifier) {
            return res.status(400).json({ message: "Email or username is required" });
        }

        // Find user (treating name as username since we don't have a separate username field)
        const user = await User.findOne({
            $or: [{ email: identifier }, { name: identifier }]
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
