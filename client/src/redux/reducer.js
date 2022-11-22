const initialState = {
    countries : [],
    allCountries : [],
    paisesFiltrados: [],
    activities : [],
    detailCountry: {},
    paginaActual: 0,
    pagina: 9,
    startIdx:0,
    endIdx:9,
	pageStep: 9, // modifique de 10 a 9
    fomData: {},
    conActividades: {},
    paisesConActividades: '',
    limpiador: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload, 
                allCountries: action.payload
            }
            default:
                return state;
                
                case "POST_ACTIVITY":
                    return {
                        ...state,
                        formData: action.paylod
                    }

                    case "GET_ACTIVITIES":
                        return {
                            ...state,
                            activities: action.payload
                        }

                case "SIGUIENTE_PAGINA":
                    if (state.paginaActual !== 0) {
                        return {
                        ...state,
                        pagina: state.pagina = 10, 
                        startIdx: state.startIdx + state.pageStep, 
                        endIdx: state.endIdx + state.pageStep
                        } 
                        } else { 
                        return {
                        ...state,
                        startIdx: state.startIdx = 0,
                        endIdx: state.endIdx = 10 // modifique de 9 a 10
                    }
                }               

                case "ANTERIOR_PAGINA":
                    if (state.paginaActual !== 1) {
                        return {
                        ...state,
		                pagina: state.pagina = 9,
		                startIdx: state.startIdx - 10,
		                endIdx: state.endIdx -10	
		                }
                        } else { 
                        return {
                        ...state
                    }
                }

                case "ACTUAL_MENOS_UNO":
                    if (state.paginaActual > 1) {
		                return {
	                    ...state,
	                    paginaActual: state.paginaActual - 1 
		                }
                        } else {
                        return {
                        ...state
                    }
                }

                case "ACTUAL_MAS_UNO":
		            return {
		            ...state,
		            paginaActual: state.paginaActual + 1
		        }
                
                case "GET_DETAIL_COUNTRY":
                    return {
                    ...state,
                    detailCountry: action.payload 
                }

                case "FILTER_BY_ACTIVITY":
                    state.countries = state.allCountries
                    state.paisesFiltrados = state.limpiador 
                    state.conActividades = {}
                    state.paisesConActividades = ""
                    state.conActividades = state.activities.filter(idx => idx.name.includes(action.payload
                        ))   // obtengo la lista de actividades con cierta actividad	
                    state.paisesConActividades = state.conActividades.map(function (index, element) {
                        return index.country // aqui se obtiene el id de 3 letras del los paises·
                    })  
                    state.paisesConActividades.map((idx) => { // se realiza el filtrado por cada uno de los paises con dicha actividad 
                    state.paisesFiltrados = [
                        ...state.paisesFiltrados,
                        ...(state.countries.filter(idx2 => idx2.id.includes(idx)) 
                        )] // se junta el resultado, este es el que renderea las tarjetas al final	
                    })
                return{
                    ...state,
                    countries: state.paisesFiltrados
                }

                case "FILTER_BY_SEARCH":
                    state.paisesFiltrados = state.countries.filter(idx => idx.name.includes(action.payload))
                    if (action.payload) {
                        return {
                        ...state,
                        countries: state.paisesFiltrados
		            }
                    } else {
                        return {
                        ...state, 
                        countries: state.allCountries
                    }
                }

                case "FILTER_BY_CONTINENTE":	
	                state.paisesFiltrados = state.countries.filter(idx => idx.continents.includes(action.payload))
                    if (action.payload ==="todos") {
                        return {
                        ...state, 
                        countries: state.allCountries
                    }
                        } else {
                        return {
	                    ...state,
	                    countries: state.paisesFiltrados,
                    }
                }

                case "RESET_ALL_COUNTRIES":
                    return {
                    ...state,
                    countries: state.allCountries
                }

                case "ORDER_ALFABETICO":
                    state.paisesFiltrados = state.countries
                    const sortAz = function (a,b) { // arr.sort((a,b)=>a-b);
                    return a.name.localeCompare(b.name)
                }
                const sortZa = function (a,b) {
                    return b.name.localeCompare(a.name)
                }
                if (action.payload === "az") {
                    return {
	                ...state,
	                countries: state.paisesFiltrados.slice().sort(sortAz) // se usa slice para que actualize el slice de las tarjetas
                }
                } else {
                    return { //if (action.payload === "za")
	                ...state,
	                countries: state.paisesFiltrados.slice().sort(sortZa) 
                }
            }

                case "ORDER_BY_POPULATION":
                    state.paisesFiltrados = state.countries
                    const ordByPop = (a, b) => {
                    return a.population - b.population
                }
                if (action.payload === "Mayor") {
                    return {
	                ...state,
	                countries: state.paisesFiltrados.slice().sort(ordByPop).reverse()
                }
            } else {
                if (action.payload === "Menor") {
                    return {
	                ...state,
	                countries: state.paisesFiltrados.slice().sort(ordByPop)
                }
            }
        }
    }   
}
export default rootReducer; 