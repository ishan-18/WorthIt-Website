import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([]);

    const getProducts = async ()=>{
        const res = await axios.get('/api/product')
        setProducts(res.data.product)
    }

    useEffect(()=>{
        getProducts()
    }, [])

    return {
        products: [products, setProducts]
    }
}

export default ProductsAPI
