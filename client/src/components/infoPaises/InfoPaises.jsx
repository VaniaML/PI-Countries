import React from 'react';
import { Link } from 'react-router-dom';
import style from './InfoPaises.module.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InfoPaises() {
const detallePais = useSelector((state) => state.detailCountry);

	return (
       <div>
           <div>
            <div className={style.Placeholder}>
                    <img  className={style.Bandera} alt="bandera nacional" src={detallePais.flag}/>
                    <h1>Nombre: {detallePais.name}</h1>
                    <h1>ID: {detallePais.id}</h1>
                    <h1>Ubicado en el continente: {detallePais.continents}</h1>
                    <h1>Su capital es: {detallePais.capital} </h1>
                    <h1>Subregion: {detallePais.subregion}</h1>
                    <h1>Area: {new Intl.NumberFormat("es-MX").format(detallePais.area)} km2.{" "}</h1>	
                    <h1>Poblacion: {new Intl.NumberFormat("es-MX").format(detallePais.population)}{" "}</h1>
                    <hr></hr>
                    <h1>Actividades: {detallePais.activities ? detallePais.activities.map((idx) => idx.name) : null}</h1>
                    <h1>Realizada en: {detallePais.activities ? detallePais.activities.map((idx) => idx.season) : null}</h1>
                    <h1>Dificultad del 1 al 5 de: {detallePais.activities ? detallePais.activities.map((idx) => idx.difficulty ) : null}</h1>
                    <h1>Se recomienda realizarla durante: {detallePais.activities ? detallePais.activities.map((idx) => idx.duration) : null} minutos</h1>

                    <Link to="/home">
                    <button className={style.Cerrar}>Cerrar</button>
                    </Link>
                    </div>
                    </div>
                    </div>
                    );
                };