import React from 'react';
import { Link } from 'react-router-dom';
import style from './Tarjetas.module.css'
import Carta from '../cartas/Cartas.jsx'

export default function Tarjetas({ mandaPaises }) {
    return(
        <div className = {style.ulItems}>

<div className={style.Placeholder}>

	    {/*se inyectan componentes para la carta*/}
        {mandaPaises.map((idx) => {
		return (
		<Carta
		key={idx.id}
		name={idx.name}
		flag={idx.flag}
		continents={idx.continents}
		id={idx.id}
		/>
		)	    
	    })}
        </div>
</div>
);
}