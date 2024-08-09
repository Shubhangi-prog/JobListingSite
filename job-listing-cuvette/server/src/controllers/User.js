const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userdata = await User.findOne({ email: email });

        if (userdata) {
            if (await bcrypt.compare(password, userdata.password)) {
                const token = jwt.sign({ uid: userdata._id, name: userdata.name }, process.env.JWT_SECRET);
                res.json({ status: "success", msg: "Login successful.", token });
            } else {
                throw Object.assign(Error("Wrong password entered"), { code: 401 });
            }
        } else {
            throw Object.assign(Error("No user found with this email"), { code: 404 });
        }
    } catch (err) {
        next(err);
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (await User.findOne({ email: email })) {
            throw Object.assign(Error("User with this email already exists"), { code: 409 });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userdata = await User.create({ name, email, mobile, password: hashedPassword });
            const token = jwt.sign({ uid: userdata._id, name: userdata.name }, process.env.JWT_SECRET);
            res.json({ status: "success", msg: "User registred successfully.", token });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { loginUser, registerUser }