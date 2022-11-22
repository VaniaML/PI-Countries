const router = require('express').Router();   // asi obtenemos metodos get y post 
const axios = require('axios');			// accesa a la api
const { Op, Sequelize } = require('sequelize'); 
const { Activity, Country } = require('../db.js'); // requerimos los modelos cargdos en db.js


router.get('/', (req, res, next) => {
    return Activity.findAll({})
    .then((createdActivities) => {
        res.json(createdActivities)
    })
    .catch((error) => {
        next(error)
    }) 
})

let idDeActivity = 1;

router.post('/post', async function (req, res) {
    const { name, difficulty, duration, season, country } = req.body
    try {
       const newActivity = await Activity.create ({
        id: idDeActivity++,
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
        country: country
    })
    newActivity.addCountries(country) // newActivity == al objeto de la actividad
	                                  // addCountries == es la add+tabla 
	                                  // country es el id del pais 
	                                  // con esto agregamos la actividad al pais correspondiente.

    res.status(200).json(newActivity);    
    } catch (error) {
        res.status(404).send(error); 
    }
});

module.exports = router;






//	- [ ] __POST /activities__:
//	- Recibe los datos recolectados desde el formulario
//	 controlado de la ruta de creación de actividad turística por body
//	- Crea una actividad turística en la base de datos, relacionada con los países correspondientes
// 
// id, name, difficulty, duration, season 
// Express www.com/index?nombredevalor1=valor1&nombredevalor2=valor2

//	cadena de prueba
// localhost:3001/activity?name="prueba"&dificulty=1&duration=20&season="invierno"
// localhost:3001/activity:name="prueba"&dificulty=1&duration=20&season="invierno"

// http://localhost:3001/countries/activity?name=prueba&dificulty=1&duration=20&season=invierno

// test post method with curl
//curl -X POST http://localhost:3001/countries/activity?name=prueba&dificulty=1&duration=20&season=invierno