import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

export default function landing() {
    return(
        <div className = {style.Body} id="Body">
            <div className = {style.Contenedor} id="Contenedor">
                <h1 className = {style.Titulo} id="Titulo">Countries</h1>
                    <div >
                    <Link to = '/home'>
                        <button className={style.Boton} id="Boton">Inicio</button>    
                    </Link>
                    </div>
            </div>
        </div>
    );
};