const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    try {
        const token = req.headers['x-api-key'];
        if (!token) return res.status(400).send({
            status: false,
            message: 'login first!'
        });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).send({
                status: false,
                error: err.message
            })

            req.userData = decoded;
            next();
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = authentication;