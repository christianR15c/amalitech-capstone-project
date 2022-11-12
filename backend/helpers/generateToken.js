const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.secretKey, {
        expiresIn: '20d'
    })
}

module.exports = generateToken