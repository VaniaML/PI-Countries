const router = require('express').Router();   // asi tenemos metodos get y post 
const axios = require('axios');			// accesar a la api
const { Op, Sequelize } = require('sequelize'); 
const { Country, Activity } = require('../db.js'); // requerimos los modelos cargados en db.js

// Referencia
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

const traeDeApi = async () => {
    const paises = await Country.findAll({
      attributes: ["id", "name", "flag", "continents", "capital", "subregion", "area", "population"],
    });
    if (!paises.length) {
      let allCountry = await axios.get("https://restcountries.com/v3/all");
      allCountry = allCountry.data
      allCountry = allCountry.map((trae) => { //crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos
  
        return {
              id: trae.cca3,
              name: trae.name.common,
              flag: trae.flags.find((e)=>e.includes('svg')),  
              continents: trae.region,
              capital: trae.capital,
              subregion: trae.subregion,
              area: trae.area,
              population: trae.population,
        }
      });
      await Country.bulkCreate(allCountry);
      return allCountry;
    } else {
      return paises
    }};

router.get('/', async function (req,res) { // http://localhost:3001/countries?name=mex
  await traeDeApi();
  const { name } = req.query    
    if (!name) {
    try {
        let respuesta = await Country.findAll({ // trae todos los paisese y guardarlos en BD
            attributes: ['id', 'name', 'flag', 'continents', 'population']
        })
        let namePais=[]; // array de los paises
        respuesta.map(function (index, element){ // filtra los nombre de los paises quitando "name" 
            namePais.push(index.name, index.flag, index.continents, index.population);          // dejando como tal solo el nombre ejem (Mexico)
          })
        res.status(200).json(respuesta);    
    } catch (error) {
        res.status(404).send(error); 
    }
  }
  else{	 
    try {
    const buscarPais = await Country.findAll({
          
          where: {                              // busca los paises en name
            name: { [Op.iLike]: `%${name}%` },  // que sea similar a name
          },
          include: Activity,
          });
  
    res.status(200).json(buscarPais)
    } catch (error) {
    res.status(404).send('Pais no encontrado')
    }
  }
     })

     router.get('/:idPais', async function(req, res) { // http://localhost:3001/countries/mex
        const { idPais } = req.params 
        await traeDeApi(); 
        let idMayusculas = idPais.toUpperCase();
        try {
        let paises = await Country.findByPk(idMayusculas, { // trae los paises por su id ejem (mex)
          include: Activity,                                          // incluyendo la actividad
        })
        res.status(200).json(paises)
      } catch (error) {
        res.status(400).send(error);
      }
     })


module.exports = router;