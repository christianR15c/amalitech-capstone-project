const express = require("express");
const model = require('../models')

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

module.exports = {
    existingUser,
};