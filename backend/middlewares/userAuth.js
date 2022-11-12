const express = require("express");
const model = require('../models')
const jwt = require('jsonwebtoken')

const { user } = model

const existingUser = async (req, res, next) => {
    try {
        const emailExist = await user.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (emailExist) return res.status(400).json({ error: 'Email already exists' })
        next();

    } catch (error) {
        console.log(error);
    }
};

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.secretKey);

            req.user = decoded



            next();
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }

    if (!token) {
        res.status(401).json({ error: "Not authorized, no token" })
    }
};

module.exports = {
    existingUser,
    protect
};