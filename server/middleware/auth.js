const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(401).json({msg: "Access Denied"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(401).json({msg: "Register or Login required"})
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports = auth