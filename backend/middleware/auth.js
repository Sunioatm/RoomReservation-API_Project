const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        res.status(403).send("There is no token.")
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded
    } catch (error) {
        return res.status(401).send("Invalid Token")
    }

    return next()

}

module.exports = verifyToken