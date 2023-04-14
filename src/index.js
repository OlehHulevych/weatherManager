import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Browser, HashRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore, combineReducers} from "redux"



const initialState = {
  cities:[],
  isDuplicate:false,
  added:false,
  currentCity:{
    name:"Add new City",
    id:0
  }
};

const barState = {
  open:false,
}

export function barReducer(state = barState, action){
  switch(action.type){
    case "OPEN_BAR":
      return{
        open:!state.open
      }
     default:
      return state 
  }
}

function InputReducer(state = initialState, action){
  switch(action.type){
    case 'ADD_CITY':
      const newCity = action.payload
      const isDuplicate = state.cities.some(city => city.name === newCity.name)
      if(isDuplicate){
        return{
          ...state,
          isDuplicate:true,
        }
      }
      else{
        return{
          ...state,
          cities:[...state.cities, action.payload],
          isDuplicate:false,
        } 
      }
    case 'CUR_CITY':
      return {
        ...state,
        currentCity:{
          name:action.payload.name,
          id:action.payload.id
        }
      }
    case 'REMOVE_CUR_CITY':
      return {
        ...state,
        currentCity:{
          name:"Add new City",
          id:3
        }
      }
    case 'REMOVE_CITY':
      const cityId = action.payload;
      const updated_cities = state.cities.filter(city=>city.id != action.payload)
      return {
        ...state,
        cities: updated_cities
        
       
      };
    case "CHECK_CTIY":
      return{
        ...state,
        added:action.payload
      }

      default:
        return state

   

  }
}

const rootReducer = combineReducers({
  cityBar:barReducer,
  editCity:InputReducer
})

const store = createStore(rootReducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
   <Provider store={store}>
   		 <App />
    </Provider>  
 
  
  </React.StrictMode>
);




