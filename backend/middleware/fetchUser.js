var jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    const token = req.header('auth_token') ;
    if (!token) {
        res.status(401).send({ error: 'Please authenticate with valid token'})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET) ;
        req.user = data.user ;
        next();    
    } catch (error) {
        console.error(error)
        res.status(401).send({ error: 'Please authenticate with valid token'})
    }
}


module.exports = fetchUser ;