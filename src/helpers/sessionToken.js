const jwt = require('jsonwebtoken')

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name1Person: user.name1Person,
            profilePerson: user.profilePerson,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => {
    return jwt.decode(token, null)
}

module.exports = { tokenSign, decodeSign, verifyToken }