const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require('../models')

const { user } = model

const signup = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: 'Please enter a valid username or password' })
        const data = {
            name,
            email,
            pic,
            password: await bcrypt.hash(password, 10),
        };
        const newUser = await user.create(data);

        if (newUser) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            return res.status(201).json(newUser);
        } else {
            return res.status(409).json({ error: "Details are not correct" });
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await user.findOne({
            where: {
                email
            },
        });

        if (userExist) {
            const isSame = await bcrypt.compare(password, userExist.password);

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                return res.status(201).json(userExist);
            } else {
                return res.status(401).json({ error: "Invalid Password" });
            }
        } else {
            return res.status(401).json({ error: "Authentication failed, User doesn't exist" });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};