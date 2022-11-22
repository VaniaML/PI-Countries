import React from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch, 
         filterByContinente, 
         resetAllCountries, 
         accionAlfabetica, 
         nextPage, 
         orderByPopulation,
         filterCountriesByActivity } from '../../redux/actions.js'; // Actions a usar

export default function Nav() {
    const dispatch =useDispatch();
    const buscarTexto = "";
    const todasLasActividades = useSelector((state) => state.activities);

    function buscarPorPais(e) { // a partir de aqui comienzan las funciones 
        dispatch(filterBySearch(e.target.value)); // que disparan las actions
    }

    function filtrarContinente(e) {
        dispatch(resetAllCountries()); // resetea para traer de nuevo todos los paises
        dispatch(filterByContinente(e.target.value)); // lanza el filtro
    }

    function FiltraPorActividad(e) {
        e.preventDefault()
        dispatch(resetAllCountries())
        dispatch(filterCountriesByActivity(e.target.value));
    }    

    function ordenaAlfabeticamente(e) {
        dispatch(accionAlfabetica(e.target.value));
        dispatch(nextPage());
    }

    function ordenaPoblacion(e) {
        dispatch(orderByPopulation(e.target.value));
        dispatch(nextPage());
    }
            
    return (
        <div className = {style.ulItems} id="Barra">
           
<ul className="ulItems">

	    {/* -Buscar por Pais- */}
 <li>
<input className={style.Buscar} 
name="SearchCountry"  
placeholder="Buscar por Nombre" 
onChange={(e) => buscarPorPais(e)}/>
</li>

	    {/* Buscar por continentes */}
<li>
	<select name="FilterByContinent" 
    className={style.FiltraContinente} 
    onChange={(e) => filtrarContinente(e)}>
        <option value="todos">Continentes</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        </select>
</li>

	{/* Filtrar por actividad */}
<li>
	<select name="FilterByActivity" 
    className={style.FiltraActividad}
    onChange={(e) => FiltraPorActividad(e)}>
        <option value="default">Actividades</option>
        </select>
</li>

	{/* Ordenar Alfabeticamente */}
<li> 
	<select name="OrderByAlph" 
    className={style.Filtros}
    onChange={(e) => ordenaAlfabeticamente(e)}>
        <option value="">Orden Alfabetico</option>
        <option value="az">Alfabetico A-Z</option>
        <option value="za">Alfabetico Z-A</option>
        </select>
</li>

	{/* Ordenar por poblacion */}
<li>
	<select name="OrderByPopulation" 
    className={style.Filtros}
    onChange={(e) => ordenaPoblacion(e)}>
        <option value="">Ordenar por Poblacion</option>
        <option value="Mayor">Mayor población</option>
        <option value="Menor">Menor población</option>
        </select>
</li>

    {/* Agrega Actividad */}
<li>
	<Link to='/formulario'>    
	<button className={style.Actividad}>Agrega Actividad</button>    
	</Link>
</li>
</ul>
        </div>
    );
};