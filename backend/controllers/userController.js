const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const model = require('../models')
const Sequelize = require('sequelize')
const generateToken = require("../helpers/generateToken")
const Op = Sequelize.Op

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

            return res.status(201).json(newUser);
        }
        return res.status(409).json({ error: "Details are not correct" });

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
                res.json({
                    id: userExist.id,
                    name: userExist.name,
                    email: userExist.email,
                    pic: userExist.pic,
                    token: generateToken(userExist.id)

                })

            } else {
                return res.status(401).json({ error: "Invalid Password" });
            }
        } else {
            return res.status(401).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error);
    }
};

const searchUsers = async (req, res) => {
    try {
        const { term } = req.query
        const users = await user.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
        if (users.length === 0) return res.status(200).json({ message: 'No User found' })
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signup,
    login,
    searchUsers
};