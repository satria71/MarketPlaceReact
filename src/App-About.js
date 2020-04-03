import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';
import gambar from './image/gambar.jpg';
import { Button } from 'react-bootstrap';

const About = () => {
        return(
            <div className="banner">
                <div className="container jarak-container">
                    <div class="card tinggi">
                        <div class="card-body">
                            <div className="img">
                                <img src={gambar} height="350px"/>
                            </div>
                            <div className="content">
                                <hr></hr>
                                <div className="a">
                                    <h3>Hello!</h3><br></br>
                                    <h1>My Name is Satria Putra Sabana</h1><br></br>
                                </div>
                                <h5>Saya lahir tanggal 03 Februari 1999 di Kota Magetan, saya adalah anak pertama dari
                                    3 bersaudara
                                </h5><br></br>
                                <h5>Alamat saya tinggal di Jl Al-Mustofa rt/07 rw/04 Pakiskembar Kec.Pakis Kab.Malang,
                                    saat ini saya sedang menempuh studi di Politeknik Negeri Malang jurusan Teknologi Informasi
                                    prodi D4 Teknik Informatika.
                                </h5><br></br>
                                <h5>
                                    Nomor telepon saya 085815699511 dan alamat email saya <a href ="#">satriabumiputralangit@gmail.com</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
}

export default About;