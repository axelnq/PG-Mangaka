// createStore --> crea un store que contiene todos los estados de los componentes de la app
// applyMiddleware --> permite aplicar un middleware (canal de comunicación)
import { createStore, applyMiddleware } from 'redux';
// thunk --> middleware que permite trabajar con metodos dispatch y getState
import  thunk  from 'redux-thunk';
// reducer --> permite cambiar los estados
import rootReducer from '../Reducer';
// composeWithDevTools
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;