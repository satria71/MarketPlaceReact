import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './App-Product';
import Cart from './App-Cart';
import About from './App-About';
import { Container, Row, Nav, Table } from "react-bootstrap";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  Button,
  Navbar,
  Card
} from 'react-bootstrap';
import './App.css';

export default function Market() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Toko Mesin Cuci</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/public"> Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">List Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Keranjang</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/product">
            <Barang />
          </Route>
          <Route path="/cart">
            <Keranjang />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function PublicPage() {
  return (
    <div>
      <h3>Selamat Datang Di Toko Mesin Cuci, selamat berbelanja</h3>
    </div>
  );
}

class Barang extends Component{
  state = {
    listProduct: [],
    insertCart:{
      id: 0,
      productName: "",
      price: "",
      quantity: ""
    }
  };

  componentDidMount = () => {
    this.ambilDataProduct();
  };

  ambilDataProduct = () => {
    fetch("http://localhost:3001/product")
    .then(response => response.json())
    .then(jsonHasilAmbilDariAPI => {
      this.setState({
        listProduct: jsonHasilAmbilDariAPI
      });
    });
  };

  handleGetProduct = data => {
    fetch(`http://localhost:3001/product/${data}`, { method: "GET" })
    .then(response => response.json())
    .then(res => {
      this.handleUpdateList(data,res);
      var dataProduct = { ...this.state.insertCart };
      dataProduct["id"] = res["id"];
      dataProduct["productName"] = res["productName"];
      dataProduct["price"] = res["price"];
      dataProduct["quantity"] = 1;
      this.setState({
        insertProduct: dataProduct
      });
    })
    .then(() => {
      this.handleCekCart(data);
    })
    .then(() => {
      this.ambilDataProduct();
    });
  };

  handleCekCart = data => {
    fetch(`http://localhost:3002/product/${data}`, { method: "GET" }).then(
      response => {
        if(response.ok){
          response.json().then(res => {
            this.handleUpdateCart(data, res);
          });
        }else {
          this.handleTambahCart();
        }
      }
    );
  };

  handleUpdateCart = (data, res) => {
    fetch(`http://localhost:3002/product/${data}`,{
      method: "PUT",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: res["id"],
        productName: res["productName"],
        price: res["price"],
        quantity: res["quantity"] + 1
      })
    });
  };

  handleUpdateList = (data, res) => {
    fetch(`http://localhost:3001/product/${data}`,{
      method: "PUT",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productName: res["productName"],
        price: res["price"],
        img: res["img"],
        stock: res["stock"] - 1
      })
    });
  };

  handleTambahCart = () => {
    fetch(`http://localhost:3002/product/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.insertProduct)
    });
  };

  render(){
    return(
      <div>
        {/* <h1 className="title">
          List <span className="first">Produk</span>
        </h1> */}
        <Container>
          <h1 className="jarak">List Produk</h1>
          <Row className="justify-content-lg-center">
            {this.state.listProduct.map(product => {
              return (
                <Product
                  key={product.id}
                  nama={product.productName}
                  harga={product.price}
                  img={product.img}
                  stok={product.stock}
                  idProduct={product.id}
                  masukCart={this.handleGetProduct}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

class Keranjang extends Component {
  state = {
    listCart: []
  };

  componentDidMount = () => {
    this.ambilDataCart();
  };

  ambilDataCart = () => {
    fetch("http://localhost:3002/product")
    .then(response => response.json())
    .then(jsonHasilAmbilDariAPI => {
      this.setState({
        listCart: jsonHasilAmbilDariAPI
      });
    });
  };

  render(){
    var total = 0
    var no = 0;
    return(
      <div>
        <Container>
          <h1 className="jarak">Keranjang</h1>
          <Table className="jarak" condensed bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listCart.map(cart => {
                no += 1;
                total += Number(cart.quantity) * Number(cart.price);
                return(
                  <Cart
                    key={cart.id}
                    no={no}
                    nama={cart.productName}
                    harga={cart.price}
                    stok={cart.quantity}
                    idProduct={cart.id}
                  />
                );
              })}
              <tr>
                <td colSpan="4"></td>
                <td>{total}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}