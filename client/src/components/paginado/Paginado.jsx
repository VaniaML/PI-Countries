import React from 'react';
import { Link } from 'react-router-dom';
import style from './Paginado.module.css';
import { useDispatch } from "react-redux";
import { nextPage, masUno, antPage, menosUno } from '../../redux/actions.js';

export default function Paginado({pag}) {
    const dispatch = useDispatch();

    function siguientePagina(e) {
        e.preventDefault();
        dispatch(nextPage());
        dispatch(masUno());
    }

    function anteriorPagina(e) {
        e.preventDefault();
        dispatch(antPage());
        dispatch(menosUno());
    }
    return (
        <div className = {style.ulItems} id="Barra">
           <div>

           <button className={style.Boton} onClick={(e) => anteriorPagina(e)}>Anterior</button>
	       <button className={style.Boton} onClick={(e) => siguientePagina(e)}>Siguiente</button>
    </div>     
        </div>
    );
}