const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const responce = await axios.get(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
        const user = responce.data;

        if(!user) {
            return res.status(401).json({ message: "Unauthorize"})
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.captainAuth = async (req, res, next) => {
    next()
}