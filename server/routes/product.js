const router = require('express').Router()
const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/product', auth, async (req,res)=>{
    try {
        const product = await Product.find();
        if(product){
            res.status(200).json({product})
        }else{
            return res.status(400).json({msg: "Product doesn't exists"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/product', auth, authAdmin, async (req,res)=>{
    try {
        const {product_id, title, price, description, content, images, category} = req.body
        if(!product_id || !title || !price || !description || !content || !images || !category){
            return res.status(400).json({msg: "Please Enter all the fields"})
        }

        const product = await Product.findOne({product_id})
        if(product) return res.status(409).json({msg: "Product ID already exists"})

        if(!images){
            return res.status(400).json({msg: "No Images Selected"})
        }

        const product1 = await Product.findOne({title})
        if(product1) return res.status(409).json({msg: "Product already exists"})

        const newProduct = new Product({
            product_id,
            title,
            price,
            description,
            content,
            images,
            category
        })

        await newProduct.save()

        res.status(201).json({msg: "Product Created Successfully"})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.put('/product/:id', auth, authAdmin, async (req,res)=>{
    try {
        const {product_id, title, price, description, content, images, category} = req.body
        if(!product_id || !title || !price || !description || !content || !images || !category){
            return res.status(400).json({msg: "Please Enter all the fields"})
        }

        if(!images) return res.status(400).json({msg: "No Images Selected"})

        const product = await Product.findOne({product_id})
        if(product) return res.status(409).json({msg: "Product ID already exists"})

        if(images.length == 0){
            return res.status(400).json({msg: "No Images Selected"})
        }

        const product1 = await Product.findOne({title})
        if(product1) return res.status(409).json({msg: "Product already exists"})

        await Product.findOneAndUpdate({_id: req.params.id}, {
            product_id, title, price, description, content, images, category
        })
        res.json({msg: "Product Updated Successfully"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.delete("/product/:id", auth, authAdmin, async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(product){
            res.json({msg: "Product Deleted Successfully"})
        }else{
            return res.status(400).json({msg: "Product cannot be deleted"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

module.exports = router
