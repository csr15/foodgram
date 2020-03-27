import React from 'react'

import NotFoundErrorImg from './Images/errorImg.png';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="text-center container not-found-layout">
        <img src={NotFoundErrorImg} alt="Not Found" className="img-responsive mx-auto my-auto"/>
        <Link to="/login"><button className="btn btn-not-found mx-auto">Back to Home</button></Link>
    </div>
);

export default NotFound;
