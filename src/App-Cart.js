import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Cart = props =>{
    return(
        <tr>
            <td>{props.no}</td>
            <td>{props.nama}</td>
            <td>{props.harga}</td>
            <td>{props.stok}</td>
            <td>{props.harga * props.stok}</td>
        </tr>
    );
}

export default Cart;