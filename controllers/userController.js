const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/usermodel"); // ✅ Capitalized


const registeruser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate all required fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            email: newUser.email
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign( 
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, // match this with your .env key
            { expiresIn: "14m" }
        );

        res.status(200).json({ accesstoken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

const currentuser = asyncHandler(async (req, res) => {
    res.json(req.user);
}
);

module.exports = {registeruser,loginuser,currentuser}

