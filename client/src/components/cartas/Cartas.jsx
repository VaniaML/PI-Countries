import React from 'react';
import { Link } from 'react-router-dom';
import style from './Cartas.module.css';
import { useDispatch } from "react-redux";
import { getDetailCountry } from '../../redux/actions.js';
import { infoComponente } from '../cartas/Cartas.jsx';

export default function Cartas({id, name, flag, continents}) {
    const dispatch =useDispatch();

    function mostrarInfo() {
        dispatch(getDetailCountry(id));
        console.log('MOSTRANDO INFO DE:  '+ id);
     } 
     return(
        <div className = {style.Cartas}>
            <div>
	<Link to="/info">
        <div className={style.placeholder} onClick={mostrarInfo } >
            <h1> { name }</h1>
            <h2> { continents } </h2>
            <img  alt="bandera nacional" src={ flag } />
            </div>
            </Link>
            </div>
            </div>
    );
};;