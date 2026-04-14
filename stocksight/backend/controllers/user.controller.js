import User from "../schemas/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "Account created successfully!",
            user: userResponse,
        });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server error during registration." });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Login successful!",
            user: userResponse,
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error during login." });
    }
};

export const getUserProfile = async (req, res) => {
    try {

        const identifier = req.query.email || req.query.username || req.body.email || req.body.username;

        if (!identifier) {
            return res.status(400).json({ message: "An email or username is required." });
        }

        const user = await User.findOne({
            $or: [{ email: identifier }, { name: identifier }],
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Profile Error:", error.message);
        res.status(500).json({ message: "Server error fetching profile." });
    }
};
