const jwt = require('jsonwebtoken');
console.log(process.env.JWT_SECRET, "jwt secret")
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = generateToken