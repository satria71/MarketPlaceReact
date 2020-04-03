import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Card } from 'react-bootstrap';

const Product = props => {
    return (
        <div className="container jarak">
            <div className="card cardLeft">
                <div className="card-body">
                    <Card.Img src={props.img} />
                </div>
            </div>

            <div className="card cardUkuran">
                <Card.Body>
                    <h5 className="card-title">{props.nama}</h5>
                    <p className="card-text">
                        <h6>Harga: {props.harga}</h6>
                        <h6>Stok: {props.stok}</h6>
                    </p>
                    <button className="btn btn-success"
                        onClick={props.masukCart.bind(this, props.idProduct)}>
                        Beli
                    </button>
                </Card.Body>
            </div>
        </div>
    );
}

export default Product;