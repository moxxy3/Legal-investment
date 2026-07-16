const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Register User
exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, country, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email address."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            fullName,
            email,
            phone,
            country,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                balance: user.balance,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Login User
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                balance: user.balance,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};