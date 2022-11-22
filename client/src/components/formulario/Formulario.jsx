import React from 'react';
import { Link } from 'react-router-dom';
import style from './Formulario.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postActivity, resetAllCountries } from '../../redux/actions.js';


export default function Formulario() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  let seleccionaPais = [];
  const [formularioCapturado,setForm]=useState({
    name: '',
    difficulty: 0,
    duration: '',
    season: '',
    country:'',
  })

function agregaPais(e) {
  e.preventDefault()
  seleccionaPais.push(e.target.value);	
  alert('Paises Seleccionados: ' + seleccionaPais);

  setForm({
    ...formularioCapturado,
    [e.target.name]: String(seleccionaPais),
  })
}

function returnHome() {
  dispatch(resetAllCountries());
}

function validaName(e) { // validaciones
  if (e.target.value === "") {
    alert("Ingresar actividad");
  }
  if(/^[A-Za-z\s]+$/.test(e.target.value))
	return true;
	else
	alert('No debe contener caracteres especiales ni numeros')
}

function validaDifficulty(e) {
 if(!/^[1-5]+$/.test(e.target.value)) {
	alert('Ingresar rango del 1 al 5')
}
}

function manejaSubmit(e) {
	e.preventDefault()

  setForm({
    ...formularioCapturado,
    [e.target.name]: e.target.value,
  });
}

function enviaPost(e){
  e.preventDefault()
  dispatch(postActivity(formularioCapturado));
  alert("Se agrego actividad " + formularioCapturado.name);
}

return ( 
<form name="fomulario" 
method="POST" 
onSubmit={(e) => 
enviaPost(e)}>

  <div className={style.Placeholder}>
    <div className={style.Formulario}>
         
      <label className={style.Actividad}>Actividad </label>
      <input name="name" 
      id="name" 
      type="text" 
      onChange={(e) => 
      manejaSubmit(e)}
      onBlur={(e) => 
      validaName(e)}/>
      
      <label className={style.Nombres}>Dificultad </label>
      <input name="difficulty" 
      type="number" 
      id="number" 
      min="1" max="5"
      onChange={(e) => 
      manejaSubmit(e)}
      onBlur={(e) => 
      validaDifficulty(e)}/>
          
      <label className={style.Nombres}>Duracion en mns </label>
      <input name="duration" 
      type="number" 
      id="number" 
      min="1" max="1000"
      onChange={(e) => 
      manejaSubmit(e)}/>

      <label className={style.Nombres}>Estacion </label>
      <label><input type="radio" 
      name="Estacion" 
      value="Primavera"
      onChange={(e) => 
      manejaSubmit(e)}/>Primavera </label>
        <label><input type="radio" 
        name="Estacion" 
        value="Verano"
        onChange={(e) => 
        manejaSubmit(e)}/>Verano </label>
        <label><input type="radio" 
        name="Estacion" 
        value="Otono"
        onChange={(e) => 
        manejaSubmit(e)}/>Otono </label>
        <label><input type="radio" 
        name="Estacion" 
        value="Invierno"
        onChange={(e) => 
        manejaSubmit(e)}/>Invierno </label>
        
        <label className={style.Actividad}>Selecionar Paises </label>
        <select className={style.Paises} name="Paises" onChange={(e) =>agregaPais(e) }>
        {allCountries.map((idx) => (<option key={idx.id} value={idx.id}>{idx.name}</option>))}
        </select>
        </div>
        <Link to="/home">
          <button className={style.Cerrar} onClick={(e) => returnHome()}>Cerrar</button>
          </Link>
          <button type='submit' className={style.Guardar}>Guardar</button>
          </div>    
          </form>
          );
        }