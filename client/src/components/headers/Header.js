import React, {useState,useContext} from 'react'
import {GlobalState} from '../../GlobalState';
import {FaBars, FaTimes, FaShoppingCart, FaFire} from 'react-icons/fa';
import {Link} from 'react-router-dom'

function Header() {
    const value = useContext(GlobalState)
    return (
        <header>
            <div className="menu">
                <FaBars size="30"/>
            </div>
            <div className="logo">
                <h1><Link to="/">WorthIt</Link></h1>
            </div>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login &#183; Register</Link></li>
                <li className="menu"><FaTimes size="30"/></li>
            </ul>
            <div className="cart-icon">
                <span>0</span>
                <Link to="/cart"><FaShoppingCart size="30"/></Link>
            </div>
        </header>
    )
}

export default Header
