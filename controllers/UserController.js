import User from "../models/userModel.js";

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).json({message: "User already exists"});
        const user = new User({username, password})
        await user.save()
        return res.status(201).json({message: "signup successful"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({username: username});
        if (!existingUser) return res.status(400).json({message: "User does not exists"});
        const isPasswordValid = await existingUser.comparePassword(password);
        if (!isPasswordValid) return res.status(400).json({message: "Invalid email or password"});
        return res.status(200).json({
            message: 'Login successful',
            success: true,
            existingUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

