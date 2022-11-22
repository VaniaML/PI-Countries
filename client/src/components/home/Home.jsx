import React from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.css'        
import NavBar from '../nav/Nav.jsx'     // componentes
import Pagina from '../paginado/Paginado.jsx'
import Tarjetas from '../tarjetas/Tarjetas.jsx'
import { useState, useEffect } from 'react';   // 1.-uses
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getActivities } from '../../redux/actions.js';  // 2.-actions

export default function Home() {
    const dispatch = useDispatch(); // paso 3
    const allCountries = useSelector((state) => state.countries); // paso 4
    const pag = useSelector((state) => state.pagina); // pagina inicio 9 paises
    const paginaActual = useSelector((state) => state.paginaActual);
    const indexOfFirst = useSelector((state) => state.startIdx);
    const indexOfLast = useSelector((state) => state.endIdx);

    useEffect(() => {  // paso 5
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]) // lo realiza 1 vez

    const seleccionPais = allCountries.slice(indexOfFirst,indexOfLast);

    return(
        <div className = {style.Body} id="Body">
	  <NavBar/>
      <Pagina pag = { pag }/>
      <Tarjetas mandaPaises = { seleccionPais }/>
        </div>
    );
};