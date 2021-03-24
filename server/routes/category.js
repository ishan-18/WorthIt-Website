const router = require('express').Router()
const mongoose = require('mongoose')
const Category = mongoose.model("Category")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/category', auth, async (req,res)=>{
    try {
        const category = await Category.find();
        if(!category) return res.status(400).json({msg: "Category deosn\'t exists"})
        res.status(200).json({category}) 
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/category', auth, authAdmin, async (req,res)=>{
    try {
        const {c_name} = req.body
        if(!c_name) return res.status(400).json({msg: "Please Enter the category name field"})

        const category = await Category.findOne({c_name})
        if(category) return res.status(409).json({msg: "Category Already exists"})

        const newCategory = new Category({
            c_name
        })

        await newCategory.save()

        res.status(201).json({msg: "Category Created Successfully"})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.put('/category/:id', auth, authAdmin, async (req,res)=>{
    try {
        const {c_name} = req.body
        if(!c_name) return res.status(400).json({msg: "Please Enter the category name field"})
        
        const category = await Category.findOneAndUpdate({_id: req.params.id},{c_name})
        if(category){
            res.status(201).json({msg: 'Category Updated Successfully'})
        }else{
            return res.status(400).json({msg: "Category not updated"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.delete("/category/:id", auth, authAdmin, async (req,res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if(category){
            res.status(200).json({msg: "Category Deleted Successfully"})
        }else{
            return res.status(400).json({msg: "Category not deleted"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

module.exports = router