const mongoose = require('mongoose')
const User = mongoose.model("User")

const authAdmin = async (req,res,next)=>{
    try {
        const user = await User.findOne({_id: req.user.id})
        if(user.role === 0) return res.status(401).json({msg: "Admin Resources, Access Denied"})
        next()
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports = authAdmin