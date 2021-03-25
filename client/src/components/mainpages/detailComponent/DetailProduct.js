import React,{useContext,useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

function DetailProduct() {
    const params = useParams()
    console.log(params)
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    console.log(products)
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    console.log(detailProduct)
    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="details">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#: {detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>{detailProduct.sold}</p>
                    <Link to="/cart" className="cart">Buy Now</Link>
                </div>
            </div>
            <div>
                <h2>Related Products</h2>
                <div className="products">
                    {
                        products.map(product =>{
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
