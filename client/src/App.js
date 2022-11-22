import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import landing from './components/landing/Landing.jsx';
import home from './components/home/Home.jsx';
import info from './components/infoPaises/InfoPaises.jsx';
import formulario from './components/formulario/Formulario.jsx';

function App() {
  return (
<BrowserRouter>
<div className="App">
<Switch>


<Route exact path='/' component={landing}></Route>
<Route exact path='/home' component={home}></Route>
<Route exact path='/info' component={info}></Route>
<Route exact path='/formulario' component={formulario}></Route>
</Switch>
</div>
</BrowserRouter>
  );
}

export default App;
