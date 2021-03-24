const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

//Image upload to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', auth, authAdmin, async (req,res)=>{
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({msg: "No Images Selected"})
        }

        const file = req.files.file
        if(file.size > 1024*1024){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "Invalid File format"})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err, result)=>{
            if(err) throw err.message

            removeTemp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/destory', auth, authAdmin, async (req,res)=>{
    try {
        const {public_id} = req.body
        if(!public_id) return res.status(400).json({msg: "Image not available"})
        cloudinary.v2.uploader.destroy(public_id, (err, result)=>{
            if(err) throw err.message
            res.json({msg: "Image Deleted Successfully"})
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err=>{
        if(err) throw err
    })
}

module.exports = router